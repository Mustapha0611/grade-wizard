<template>
  <div v-if="show" class="loading">
    <section>
      <ion-img src="../src/assets/logo.png"></ion-img>
    </section>
  </div>
  <ion-app v-else>
    <headerComponent />
    <ion-router-outlet />
    <!-- <footerComponent /> -->
  </ion-app>
</template>
<script>
import { IonApp, IonRouterOutlet, IonImg } from "@ionic/vue";
import headerComponent from '@/components/headerComponent.vue'
import footerComponent from '@/components/footerComponent.vue'
export default {
  components: {
    IonApp,
    IonRouterOutlet,
    IonImg,
    headerComponent,
    footerComponent
  },
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 2000 + Math.random() * 2000);
    console.log(2000 + Math.random() * 2000);
  },
};
</script>
<style>
*{
  font-family: monospace;
}
.loading {
  width: 100%;
  height: 100vh;
  background-color: rgb(192, 214, 243);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading section {
  width: 200px;
  border-radius: 20px;
}

</style>
