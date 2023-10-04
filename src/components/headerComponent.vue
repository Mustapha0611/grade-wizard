<template>
  
      <ion-header >
        <ion-toolbar>
          <ion-title class="ion-padding">
           <div style=" width:25px;display:flex; align-items: center;">
                <img src="../assets/logomini.png" >
           </div>
          </ion-title>
        </ion-toolbar>
      </ion-header>
    
  </template>
  
  <script>
  import { IonImg, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  export default{
    components:{
    IonImg, IonHeader, IonPage, IonTitle, IonToolbar 
  }
  }
  
  </script>
  
  <style scoped>
   ion-toolbar{
    --background:rgb(27, 113, 189);
   }
  </style>
  