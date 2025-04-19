import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import GScale from '@/views/GScale.vue';
import UpcomingEvents from '@/views/UpcomingEvents.vue';
import Gallery from '@/views/ImageGallery.vue';
import ContactUs from '@/views/ContactUs.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About Us', component: About },
  { path: '/g-scale', name: 'G-Scale Model Railroading', component: GScale },
  { path: '/events', name: 'Events', component: UpcomingEvents },
  { path: '/gallery', name: 'Image Gallery', component: Gallery },
  { path: '/contact', name: 'Contact Us', component: ContactUs },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
