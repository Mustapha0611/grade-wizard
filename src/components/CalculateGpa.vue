<template>
  <ion-content>
    <ion-card color="light">
      <ion-card-content>
        <ion-card-title>Calculate GPA</ion-card-title>
        <ion-input
          type="text"
          class="ion=padding"
          label="Course Code"
          label-placement="floating"
          v-model="title"
          required
          fill="outline"
        ></ion-input>
        <ion-input
          type="text"
          class="ion=padding"
          label="Credit Unit"
          label-placement="floating"
          fill="outline"
          required
          v-model="Credit"
        ></ion-input>
        <!-- <ion-input type="text" class="ion=padding" label="Grade" label-placement="floating" fill="outline" v-model="grade"></ion-input> -->
        <ion-select
          placeholder="Grade"
          class="ion-padding"
          v-model="grade"
          required
          fill="outline"
        >
          <ion-select-option value="A">A</ion-select-option>
          <ion-select-option value="B">B</ion-select-option>
          <ion-select-option value="C">C</ion-select-option>
          <ion-select-option value="D">D</ion-select-option>
          <ion-select-option value="F">F</ion-select-option>
        </ion-select>
        <ion-button
          class="ion-padding"
          id="open-loading"
          expand="full"
          @click="addc"
          >Add A Course <IonIcon :icon="add"></IonIcon
        ></ion-button>
        <ion-loading
                trigger="open-loading"
                spinner="circles"
                :duration="100"
                message="Adding Course"
              ></ion-loading>
      </ion-card-content>
    </ion-card>
    <ion-card>
      <showResultSheet />
    </ion-card>
    <!-- Error toast -->
    <ion-toast
      :is-open="isOpen"
      message="Wrong input entered, Fill the form again"
      :duration="2000"
      position="top"
      @didDismiss="closeToast()"
    ></ion-toast>
  </ion-content>
</template>
<script>
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonInput,
  IonLoading,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/vue";
import { IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";
import showResultSheet from "../components/showResultSheet.vue";
import { mapActions } from "vuex";
export default {
  components: {
    IonContent,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonInput,
    IonButton,
    IonLoading,
    IonIcon,
    showResultSheet,
    IonSelect,
    IonSelectOption,
    IonToast,
  },
  data() {
    return {
      add,
      title: "",
      Credit: "",
      grade: "",
      isOpen: false,
     
    };
  },
  methods: {
    ...mapActions(["pushFormData"]),
    addc(){
      setTimeout(this.addCourse, 1000);
    },
    addCourse() {
      const regex = /^[1-6]{1}$/;
      const regex1 = /^[a-z]{4}\d{3}$/
      if (!regex1.test(this.title) || !regex.test(this.Credit) || !this.grade) {
        this.isOpen = true;
      } else {
        const formData = {
          title: this.title,
          creditUnit: parseInt(this.Credit),
          grade: this.grade,
        };

        this.pushFormData(formData);
        // console.log(this.$store.state.courses);

        // Clear the input field after submitting
        (this.title = ""), (this.Credit = ""), (this.grade = "");
      }
    },
    closeToast() {
      this.isOpen = false;
    },
  },
  // computed: {
  // addCourse: {
  //   set (newCourse) {
  //     this.$store.commit('addCourse',newCourse)
  //   }
  // }
  // }
};
</script>
<style scoped>
ion-content {
  margin-top: 20px;
}

ion-input {
  background-color: rgb(255, 255, 255);
  width: 90%;
  height: 30px;
  margin: 10px auto;
  border-radius: 17px;
  padding: 6px;
  --highlight-color-focused: rgb(27, 113, 189);
}
ion-button {
  --padding-top: 25px;
  --padding-bottom: 25px;
  margin: 10px 0;
  --background:rgb(27, 113, 189);
 
  
}
ion-select {
  width: 40%;
}
ion-card:first-child {
  margin-top: 60px;
  padding-bottom: 25px;
}
ion-card-title{
  text-align: center;
  padding: 5px 0;
}
ion-toast {
  --width:100%;
  --background: rgba(248, 53, 53, 0.952);
}
</style>
