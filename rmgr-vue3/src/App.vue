<template>
  <v-app>
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125" />
      <v-navigation-drawer class="nav-drawer" app>
        <v-list-item class="v-list-item" link title="Upcoming Events"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="About Us"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="G-Scale Model Railroading"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="Image Gallery"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="Contact Us"></v-list-item>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </header>
    <main>
      <AnimatedTrain />
    </main>
  </v-app>
</template>

<script setup lang="ts">
import AnimatedTrain from './components/AnimatedTrain.vue'
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.nav-drawer {
  background-color: transparent;
}

.v-list-item {
  color: var(--color-navigation);
}
</style>
