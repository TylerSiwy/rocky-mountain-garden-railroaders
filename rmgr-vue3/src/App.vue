<template>
  <v-app>
    <header>
      <v-navigation-drawer class="nav-drawer" border="md" app>
        <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125" />
        <v-list-item
          border="sm"
          color="white"
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          link
          class="v-list-item"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-navigation-drawer>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </v-app>
</template>

<script setup lang="ts">
const navItems = [
  { title: 'Home', to: '/' },
  { title: 'About Us', to: '/about' },
  { title: 'G-Scale Model Railroading', to: '/g-scale' },
  { title: 'Upcoming Events', to: '/events' },
  { title: 'Image Gallery', to: '/gallery' },
  { title: 'Contact Us', to: '/contact' },
];
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: inline-block;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
.nav-drawer {
  background-color: #1B1A0E;
  text-align: center;
}

.v-list-item {
  color: white;
}

.main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
