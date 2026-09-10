import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/AboutPage.vue'
import GScale from '@/views/GScale.vue'
import UpcomingEvents from '@/views/UpcomingEvents.vue'
import Gallery from '@/views/ImageGallery.vue'
import ContactUs from '@/views/ContactUs.vue'

const routes = [
  { path: '/', redirect: '/aboutUs' },
  { path: '/aboutUs', name: 'About Us', component: About },
  { path: '/g-scale', name: 'G-Scale Model Railroading', component: GScale },
  { path: '/events', name: 'Events', component: UpcomingEvents },
  { path: '/gallery', name: 'Image Gallery', component: Gallery },
  { path: '/contactUs', name: 'Contact Us', component: ContactUs },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
