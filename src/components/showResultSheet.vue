<template>
  <div class="showRes">
    <h6 style="color:red;" v-if="noCourse ">Please Enter at least one Course</h6>
    <section v-if="courses.length < 1" class="add-course">
      COURSES WILL BE DISPLAYED HERE
    </section>
    <section class="title" v-else>
      <span>Course Code</span><span>Credit unit</span><span>Grade</span>
    </section>
    <section class="showCourses" v-if="courses.length > 0">
      <div v-for="course in courses" :key="course.id" class="course">
        <p>{{ course.title }}</p>
        <p>{{ course.creditUnit }}</p>
        <p>{{ course.grade }}</p>
      </div>
    </section>
    <!-- show result modal -->
    <ion-modal :is-open="isOpen">
      <ion-content>
        <section class="content">
          <ion-card>
            <ion-card-header class="header-slide">
              <ion-card-title> Result
              </ion-card-title>
             
            </ion-card-header>
            <ion-card-content>
              <p>Total Credit Unit Registered :{{ totalgrade }}</p>
              <p>Total Point Earned: {{ totalPoints }}</p>
              <p>GPA: {{ gpa.toFixed(2) }}</p>
              <ion-button @click="showPredictiveFeature"
                >Try Predictive Feature</ion-button
              >
            </ion-card-content>
          </ion-card>
        </section>
      </ion-content>
    </ion-modal>
    <!-- Prediction modal -->
    <ion-modal :is-open="openPredictive">
      <ion-content>
        <section class="content">
          <ion-card>
            <ion-buttons>
                  <ion-button @click="goHome" color="danger">Back</ion-button>
            </ion-buttons>
            <ion-card-header>
              <ion-card-title>
                Prediction
              </ion-card-title>
            </ion-card-header>

            <ion-card-content>
              <ion-input
                type="text"
                class="ion=padding"
                label="Study hours"
                label-placement="floating"
                fill="outline"
                required
                v-model="studyHours"
              ></ion-input>
              <h2 v-if="nextGpa > 0 && !hasError" class="predictedGpa">Your next GPA:{{ nextGpa }}</h2>
              <h2 style="color:red;" v-if="hasError">Invalid input</h2>
              <ion-button @click="tryPrediction" expand="full" id="loading"
                >Predict GPA</ion-button>
              
              <ion-loading
                trigger="loading"
                spinner="circles"
                :duration="3000"
                message="Predicting Your next GPA..."
              >
              </ion-loading>
            </ion-card-content>
          </ion-card>
        </section>
      </ion-content>
    </ion-modal>
    <div class="btn">
    <ion-button @click="showTotalCu" 
      >Calculate Gpa</ion-button>
      <ion-button @click=" clearStorage" color="danger"
      >Clear Data</ion-button>
    </div>
  </div>
</template>
<script>
import * as tf from "@tensorflow/tfjs";
import {
  IonButton,
  IonButtons,
  IonModal,
  IonHeader,
  IonCard,
  IonToolbar,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonContent,
  IonLoading,
  IonTitle,
} from "@ionic/vue";
export default {
  components: {
    IonButton,
    IonButtons,
    IonModal,
    IonHeader,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonLoading,
    IonCardTitle,
    IonInput,
    IonToolbar,
    IonContent,
    IonTitle,
  },
  data() {
    return {
      totalgrade: 0,
      totalPoints: 0,
      isOpen: false,
      gpa: 0,
      nextGpa: 0,
      studyHours: "",
      openPredictive: false,
      hasError:false,
      noCourse:false
    };
  },
  computed: {
    courses() {
      return this.$store.getters.courses;
    },
  }, 
   mounted() {
    this.$store.dispatch("loadStorage");
    this.train;
  },
  methods: {
    showTotalCu() {
    if(this.$store.getters.courses < 1){
     this.noCourse = true;
    }else{
     this.noCourse = false;
      this.totalgrade = 0;
      this.totalPoints = 0;
      for (let i = 0; i < this.courses.length; i++) {
        this.totalgrade += this.courses[i].creditUnit;
        let points = 0;
        console.log(this.courses[i].creditUnit);
        if (this.courses[i].grade == "A") {
          points = 5 * this.courses[i].creditUnit;
        } else if (this.courses[i].grade == "B") {
          points = 4 * this.courses[i].creditUnit;
        } else if (this.courses[i].grade == "C") {
          points = 3 * this.courses[i].creditUnit;
        } else if (this.courses[i].grade == "D") {
          points = 2 * this.courses[i].creditUnit;
        } else if (this.courses[i].grade == "F") {
          points = 0;
        } else {
          console.log("hello");
        }
        this.totalPoints += points;
    
        // console.log(this.courses);
        // console.log(this.totalgrade);
      }
      this.gpa = this.totalPoints / this.totalgrade;
      this.isOpen = true;
    }
    },
    close() {
      this.isOpen = false;
    },
    showPredictiveFeature() {
      this.openPredictive = !this.openPredictive;
    },
    goHome() {
      this.isOpen = false;
      this.openPredictive = false;
      this.studyHours = '';
    },
    clearStorage() {
      this.$store.dispatch("clearStorage");
    },
    tryPrediction(){
      setTimeout(this.predictGpa,2000)
    },
    predictGpa() {
      const regex2 = /^[1-9]{1}$/;
      if (!regex2.test(this.studyHours) || !this.studyHours) {
        this.hasError = true
      }else{
        this.hasError = false
      const xTrain = tf.tensor2d([
        [4.93, 8.0],
        [3.52, 6],
        [4.34, 6.0],
        [4.07, 5.0],
        [4.66, 6.0],
        [3.84, 8],
        [4.22, 5.0],
        [3.39, 4],
        [3.64, 4.0],
        [4.86, 5],
        [4.49, 6.0],
        [2.46, 3],
        [3.57, 2],
        [4.97, 6],
        [4.24, 5],
        [4.67, 7],
        [2.08, 6.0],
        [3.69, 4],
        [4.02, 5],
        [4.53, 6],
        [1.54, 1],
        [4.91, 7],
        [4.03, 4.2],
        [4.31, 6.3],
        [1.24, 2],
        [4.76, 6],
        [3.02, 3.0],
        [4.91, 6],
        [1.83, 3.0],
        [4.63, 6],
        [2.51, 2],
        [4.81, 6.0],
        [2.76, 2],
        [4.91, 7.0],
        [3.55, 3.0],
        [4.71, 7],
        [2.1, 4.0],
        [4.66, 7.4],
        [2.24, 2.2],
        [4.87, 7.6],
        [2.34, 2.3],
        [4.03, 6],
        [2.55, 1],
        [4.92, 7.0],
        [3.09, 4.0],
        [4.82, 7],
        [3.25, 3],
        [4.92, 7],
        [3.53, 3],
        [4.72, 6],
        [3.03, 4.0],
        [4.93, 6],
        [3.7, 8.5],
        [2.5, 4.2],
        [4.2, 7.0],
        [4.8, 9.2],
        [3.3, 6.8],
        [2.9, 8.7],
        [3.9, 5.5],
        [4.0, 9.8],
        [2.0, 4.0],
        [3.5, 9.5],
        [4.4, 6.0],
        [3.1, 8.2],
        [1.8, 3.5],
        [4.5, 8.9],
        [2.2, 5.8],
        [4.7, 7.3],
        [1.5, 2.0],
        [4.9, 7.7],
        [1.2, 4.5],
        [3.8, 6.5],
        [1.0, 1.5],
        [4.6, 7.9],
        [1.3, 4.2],
        [3.6, 6.3],
        [1.4, 1.2],
        [4.3, 6.7],
        [2.3, 3.0],
        [4.1, 6.9],
        [1.7, 1.8],
        [4.0, 6.6],
        [2.5, 2.5],
        [3.9, 6.8],
        [1.6, 2.7],
        [4.2, 7.0],
        [1.9, 3.5],
        [3.7, 7.2],
        [2.0, 2.0],
        [3.5, 7.4],
        [2.2, 2.2],
        [3.3, 7.6],
        [1.1, 2.3],
        [3.8, 7.8],
        [1.2, 2.5],
        [4.5, 8.0],
        [1.3, 3.0],
        [4.8, 8.2],
        [1.4, 3.2],
        [4.9, 8.4],
        [1.5, 3.5],
        [4.7, 8.6],
        [1.6, 4.0],
        [4.6, 8.8],
      ]);
      const yTrain = tf.tensor2d([
        [4.54],
        [3.73],
        [4.22],
        [4.24],
        [4.32],
        [3.93],
        [3.92],
        [3.63],
        [3.82],
        [4.92],
        [4.53],
        [2.61],
        [3.27],
        [5.0],
        [4.0],
        [4.7],
        [3.0],
        [3.7],
        [3.8],
        [4.3],
        [1.4],
        [4.9],
        [3.5],
        [4.3],
        [1.2],
        [4.7],
        [2.5],
        [4.9],
        [2.35],
        [4.43],
        [2.33],
        [4.58],
        [2.57],
        [4.94],
        [3.07],
        [4.74],
        [2.72],
        [4.66],
        [2.22],
        [4.86],
        [2.34],
        [4.93],
        [2.52],
        [4.91],
        [3.05],
        [4.87],
        [3.25],
        [4.92],
        [3.55],
        [4.73],
        [4.02],
        [4.94],
        [3.7],
        [2.5],
        [4.2],
        [4.8],
        [3.3],
        [2.9],
        [3.9],
        [4.0],
        [2.0],
        [3.5],
        [4.4],
        [3.1],
        [1.8],
        [4.5],
        [2.2],
        [4.7],
        [1.5],
        [4.9],
        [1.2],
        [3.8],
        [1.0],
        [4.6],
        [1.3],
        [3.6],
        [1.4],
        [4.3],
        [2.3],
        [4.1],
        [1.7],
        [4.0],
        [2.5],
        [3.9],
        [1.6],
        [4.2],
        [1.9],
        [3.7],
        [2.0],
        [3.5],
        [2.2],
        [3.3],
        [1.1],
        [3.8],
        [1.2],
        [4.5],
        [1.3],
        [4.8],
        [1.4],
        [4.9],
        [1.5],
        [4.7],
        [1.6],
        [4.6],
      ]);

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [2] }));

      // Compile the model
      model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

      // // Train the model
      // model.fit(xTrain, yTrain, { epochs: 2000, shuffle: true });
      //   // Make predictions
      const inputTensor = tf.tensor2d([[this.gpa, parseInt(this.studyHours)]]);
      const predictions = model.predict(inputTensor);

      //  Extract the predicted GPA value
      const predictedGPA = predictions.dataSync()[0];

      //   Update the Vue component state

      if (predictedGPA > 5 || predictedGPA < 1) {
        this.predictGpa();
      } else {
        this.nextGpa = predictedGPA.toFixed(2);
      }
      
      // this.nextGpa;
      console.log(this.nextGpa, inputTensor);
      console.log(tf.metrics.meanAbsoluteError)
    }
    },
    train(){
      // Create a linear regression model using Tensorflow JS
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [2] }));

      // Compile the model
      model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

      // Train the model
      model.fit(xTrain, yTrain, { epochs: 50, shuffle: true });
    }
    
  },
  
};
</script>
<style scoped>
.showRes {
  margin: 50px 16px;
}
.title {
  display: flex;
  justify-content: space-around;
}
.showCourses {
  border: 1px solid rgb(63, 62, 62);
}
.add-course {
  height: 100px;
  /* width:90%;
  margin:; */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(100, 100, 100);
}

.course {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgb(0, 0, 0);
}
ion-button {
  --padding-top: 25px;
  --padding-bottom: 25px;
  margin: 5px 0;
  --background: rgb(27, 113, 189);
}
ion-buttons > ion-button{
  margin-left: 65%;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(27, 27, 27, 0.281);
  height: 100dvh;
  width: 100%;
  /* border: 2px solid blue; */
}
.predictedGpa{
  font-size: 24px;
  color:black;
  padding:10px 0;
}
ion-card-content p {
  color: black;
  font-family: monospace;
}
ion-card {
  padding: 20px;
}
ion-loading {
  --background: rgb(218, 218, 218);
  --height: 120px;
  --width: 80%;
}
.btn{
display: flex;
justify-content: space-between;  
}
.btn > ion-button{
  margin: 20px 0;
}
</style>
