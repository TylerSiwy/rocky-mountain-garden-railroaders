<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({ name: 'ImageGallery' })

// CENTRALIZED DATA ARRAY: Add new images and captions here!
const galleryData = ref([
  {
    src: 'https://picsum.photos/id/1015/800/600', // Replace with local paths like "/images/gallery/tour1.jpg"
    alt: 'Garden railway layout with suspension bridge',
    caption:
      'Steam locomotive traversing a custom-built timber trestle bridge over an alpine rock garden stream.',
  },
  {
    src: 'https://picsum.photos/id/1016/800/600',
    alt: 'Steam engine locomotive detail close-up',
    caption:
      'A detailed G-Scale replica locomotive puffing real smoke during our summer layout operations.',
  },
  {
    src: 'https://picsum.photos/id/1025/800/600',
    alt: 'Miniature station building surrounded by living moss',
    caption:
      'Whimsical passenger station integrated directly with living dwarf conifers and ground cover.',
  },
  {
    src: 'https://picsum.photos/id/1043/800/600',
    alt: 'Club display track layout at public exhibition',
    caption: 'Our modular public display system set up for families at the annual Supertrain show.',
  },
  {
    src: 'https://picsum.photos/id/1050/800/600',
    alt: 'Night operations layout featuring track lighting',
    caption:
      'Stunning night operations running trains lit with scale LED street lanterns and coach lights.',
  },
  {
    src: 'https://picsum.photos/id/1062/800/600',
    alt: 'Children watching a G-Scale freight train pull cargo',
    caption: 'Bringing smiles to multi-generational crowds during our community open house tour.',
  },
])

// Lightbox state for expanding images when clicked
const isLightboxOpen = ref(false)
const activeImageIndex = ref(0)

const openLightbox = (index: number) => {
  activeImageIndex.value = index
  isLightboxOpen.value = true
}
</script>

<template>
  <v-container class="py-12 px-4 bg-background" fluid>
    <v-row justify="center" no-gutters>
      <v-col class="bg-surface pa-6 pa-sm-12 rounded-t-lg" cols="12">
        <v-card class="w-100 bg-surface" flat>
          <v-card-item class="pa-0">
            <v-card-title class="text-h4 font-weight-black text-primary pa-0">
              Our Railway Gallery
            </v-card-title>
            <v-card-subtitle class="text-body-1 pa-0 mt-3 text-medium-emphasis text-wrap">
              Explore snapshots of our member layouts, garden landscapes, creative model
              craftsmanship, and public exhibitions around the Calgary area. Click any image to view
              it full size.
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col class="bg-primary pa-6 pa-sm-12 rounded-b-lg" cols="12">
        <v-card class="w-100" color="transparent" flat>
          <v-row>
            <v-col
              v-for="(image, index) in galleryData"
              :key="index"
              class="d-flex"
              cols="12"
              md="4"
              sm="6"
            >
              <v-card
                class="overflow-hidden bg-surface rounded-lg elevation-3 w-100 d-flex flex-column"
                flat
                hover
                @click="openLightbox(index)"
              >
                <v-img
                  :alt="image.alt"
                  :aspect-ratio="4 / 3"
                  :src="image.src"
                  class="bg-grey-lighten-2"
                  cover
                >
                  <template v-slot:placeholder>
                    <v-row align="center" class="fill-height ma-0" justify="center">
                      <v-progress-circular color="primary" indeterminate></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <v-card-text
                  v-if="image.caption"
                  class="text-body-2 font-weight-light text-on-surface pt-3 pb-4 px-4 flex-grow-1 card-lh-fix"
                >
                  {{ image.caption }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="isLightboxOpen" max-width="1000" scrollable>
      <v-card class="text-right" color="transparent" flat>
        <v-btn
          class="mb-2 ms-auto"
          color="white"
          icon="mdi-close"
          variant="text"
          @click="isLightboxOpen = false"
        ></v-btn>

        <v-card class="bg-surface rounded-lg overflow-hidden" flat>
          <v-img
            :alt="galleryData[activeImageIndex].alt"
            :src="galleryData[activeImageIndex].src"
            class="bg-black"
            contain
            max-height="75vh"
          ></v-img>

          <v-card-text
            v-if="galleryData[activeImageIndex].caption"
            class="text-body-1 bg-surface py-4 px-6 text-left text-on-surface border-t"
          >
            {{ galleryData[activeImageIndex].caption }}
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* Smoothly limits multi-line heights inside card parameters cleanly */
.card-lh-fix {
  line-height: 1.5 !important;
  opacity: 0.85;
}
.border-t {
  border-top: 1px solid rgba(var(--v-theme-primary), 0.1) !important;
}
</style>
