import './assets/main.css'

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Components
import App from './App.vue'
import { router } from '../router/routes'

const clubTheme = {
  dark: false,
  colors: {
    primary: '#4d6961', // Club Green
    secondary: '#b78c29', // Goldenrod
    background: '#d1bd8b', // New Beautiful Beige!
    surface: '#faf8f5', // Warmer White
    error: '#B00020',
    'on-surface': '#1e1c0f', // Charcoal
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'clubTheme',
    themes: {
      clubTheme,
    },
  },
})

createApp(App).use(vuetify).use(router).mount('#app')
