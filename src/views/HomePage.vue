<template>
  
    <ion-content :fullscreen="true">
      <CalculateGpa />
    </ion-content>

</template>

<script>
import { IonContent} from '@ionic/vue';
import CalculateGpa from '@/components/CalculateGpa.vue';
export default{
  components:{
  IonContent, 
  CalculateGpa
}
}
</script>

