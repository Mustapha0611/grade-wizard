<template>
    <ion-footer>
  <ion-toolbar class="ion-padding">
    <ion-icon :icon="home" size="large" ></ion-icon>
    <ion-icon :icon="settings" size="large" slot="end" ></ion-icon>
  </ion-toolbar>
  </ion-footer>
</template>
<script>
import { IonFooter, IonToolbar, IonTitle } from "@ionic/vue";
import { IonIcon } from '@ionic/vue';
import { home, settings } from 'ionicons/icons';
export default {
    components:{
        IonFooter, IonToolbar, IonTitle, IonIcon
    },
    data(){
        return{
            home,
            settings
        }
    }
}
</script>
<style scoped>
 ion-icon{
   color: rgb(48, 110, 190);
 }
</style>