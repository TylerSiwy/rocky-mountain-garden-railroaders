<script lang="ts" setup>
import { computed, ref } from 'vue'

defineOptions({ name: 'UpcomingEvents' })

const eventData = ref([
  {
    title: 'Annual Club Garden Tour & Open House',
    date: 'July 19, 2026',
    time: '10:00 AM - 4:30 PM',
    location: 'Various Member Layouts, Calgary Area',
    description:
      'Our hallmark summer event! Hop between multiple breathtaking backyard garden layouts to see large-scale trains winding through real rock waterfalls, bridges, and living miniature alpine flora. The tour wraps up with an evening family social.',
    highlight: true,
  },
  {
    title: 'Supertrain Exhibition Preparation Layout',
    date: 'August 15, 2026',
    time: '9:00 AM - 3:00 PM',
    location: 'Club Workshop, Calgary',
    description:
      'Work party session focused on electrical testing, modular base wiring, and scenery tuning for our upcoming public convention tracks. Bring your troubleshooting eyes and any rolling stock you want track-tested.',
  },
  {
    title: 'Fall General Kickoff Meeting',
    date: 'September 17, 2026',
    time: '7:15 PM - 9:00 PM',
    location: '2715 Dovely Park SE, Calgary',
    description:
      'Welcome back meeting for the fall modeling season. We will be sharing layout construction logs from over the summer, discussing new 3D printing design techniques, and scheduling our holiday display workshops.',
    highlight: false,
  },
  {
    title: 'Holiday ZooLights Setup Workshop',
    date: 'November 07, 2026',
    time: '10:00 AM - 2:00 PM',
    location: 'Calgary Zoo, AB',
    description:
      'Initial construction and track-laying session for our famous winter display at ZooLights. Volunteers are needed to assemble weather-resistant town layouts and run power conduits.',
  },
])

const upcomingEvents = computed(() => {
  return eventData.value
})

defineExpose({
  eventData,
  upcomingEvents,
})
</script>

<template>
  <v-container class="py-12 px-4 bg-background" fluid>
    <v-row justify="center" no-gutters>
      <v-col class="bg-surface pa-6 rounded-t-lg" cols="12">
        <v-card class="w-100 bg-surface" flat>
          <v-card-item class="pa-0">
            <v-card-title class="text-h4 font-weight-black text-primary pa-0">
              Upcoming Club Events.
            </v-card-title>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col class="bg-primary pa-6 pa-sm-12 rounded-b-lg" cols="12">
        <v-card class="w-100 text-surface" color="transparent" flat>
          <div v-if="upcomingEvents.length === 0" class="text-center py-12 opacity-70">
            <v-icon class="mb-2 d-block mx-auto" icon="mdi-calendar-blank" size="large"></v-icon>
            <div class="text-h6 font-weight-light">No upcoming events scheduled right now.</div>
            <div class="text-body-2 opacity-80 mt-1">
              Check back soon or send us a message via our contact page!
            </div>
          </div>

          <div v-else class="events-scroll">
            <div v-for="(event, index) in upcomingEvents" :key="index">
              <v-row align="start" class="py-4">
                <v-col cols="12" md="3" sm="4">
                  <div class="text-h5 font-weight-bold text-secondary mb-1">
                    {{ event.date }}
                  </div>
                  <div class="text-body-2 font-weight-light opacity-70">
                    {{ event.time }}
                  </div>
                </v-col>

                <v-col class="pt-2 pt-sm-0" cols="12" md="8" sm="8">
                  <div class="d-flex align-center flex-wrap gap-2 mb-2">
                    <h3 class="text-h5 font-weight-bold tracking-tight">{{ event.title }}</h3>

                    <v-chip
                      v-if="event.highlight"
                      class="font-weight-bold ms-sm-3 px-2 rounded-sm"
                      color="secondary"
                      size="x-small"
                      variant="flat"
                    >
                      FEATURED
                    </v-chip>
                  </div>

                  <div class="d-flex align-center text-body-2 opacity-70 mb-4 font-weight-light">
                    {{ event.location }}
                  </div>

                  <p class="body-copy text-body-1 font-weight-light opacity-90">
                    {{ event.description }}
                  </p>
                </v-col>
              </v-row>

              <v-divider
                v-if="index < upcomingEvents.length - 1"
                class="my-6 opacity-10"
                color="surface"
              ></v-divider>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.body-copy {
  line-height: 1.6 !important;
}
.tracking-tight {
  letter-spacing: -0.01em !important;
}
.gap-2 {
  gap: 8px;
}
.events-scroll {
  max-height: 900px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--v-theme-secondary), 0) transparent;
  transition: scrollbar-color 0.25s ease;
}
.events-scroll::-webkit-scrollbar {
  width: 8px;
  height: 0;
}
.events-scroll::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-secondary), 0);
  border-radius: 999px;
}
.events-scroll:hover {
  scrollbar-color: rgba(var(--v-theme-secondary), 0.35) transparent;
}
.events-scroll:hover::-webkit-scrollbar {
  width: 8px;
  height: 0;
}
.events-scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-secondary), 0.35);
  border-radius: 999px;
}
.events-scroll:hover::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-secondary), 0.5);
}
</style>
