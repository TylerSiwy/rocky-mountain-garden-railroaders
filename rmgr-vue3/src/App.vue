<template>
  <v-app>
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125" />
      <v-navigation-drawer class="nav-drawer" app>
        <v-list-item
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
    <main>
      <router-view>

      </router-view>
      <!-- Main content goes here -->
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
