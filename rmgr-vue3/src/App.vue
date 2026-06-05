<template>
  <v-app>
    <header>
      <v-navigation-drawer border="md" class="nav-drawer">
        <img alt="Vue logo" height="125" src="./assets/logo.png" width="125" />
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          border="sm"
          class="v-list-item"
          color="white"
          link
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-navigation-drawer>
    </header>

    <v-main>
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="page-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const navItems = [
  { title: 'Home', to: '/' },
  { title: 'About Us', to: '/aboutUs' },
  { title: 'G-Scale Model Railroading', to: '/g-scale' },
  { title: 'Upcoming Events', to: '/events' },
  { title: 'Image Gallery', to: '/gallery' },
  { title: 'Contact Us', to: '/contactUs' },
]
</script>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}

.nav-drawer {
  background-color: rgb(var(--v-theme-on-surface));
  text-align: center;
}

.v-list-item {
  color: white;
}

body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
