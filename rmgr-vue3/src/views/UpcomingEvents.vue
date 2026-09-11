<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { type CalendarEvent, parseGoogleCalendarIcs } from '@/lib/googleCalendar'

defineOptions({ name: 'UpcomingEvents' })

const eventData = ref<CalendarEvent[]>([])

const upcomingEvents = computed(() => {
  return eventData.value
})

const calendarFeedUrl = '/calendar-ics'

const loadCalendarEvents = async () => {
  if (!calendarFeedUrl) {
    return
  }

  const response = await fetch(calendarFeedUrl)
  const ics = await response.text()
  eventData.value = parseGoogleCalendarIcs(ics)
}

onMounted(() => {
  void loadCalendarEvents()
})

defineExpose({
  eventData,
  upcomingEvents,
})
</script>

<template>
  <v-container class="py-8 px-4 bg-background" fluid>
    <v-row no-gutters>
      <v-col class="bg-surface pa-6 rounded-t-lg" cols="12">
        <v-card class="w-100 bg-surface" flat>
          <v-card-item class="pa-0">
            <v-card-title class="text-h4 font-weight-black text-primary pa-0">
              Upcoming Club Events
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

          <div v-else>
            <div v-for="(event, index) in upcomingEvents" :key="index">
              <v-row align="start" class="py-4">
                <v-col cols="12" md="2" sm="3">
                  <div class="text-h5 font-weight-bold text-secondary mb-1">
                    {{ event.date }}
                  </div>
                  <div class="text-body-2 font-weight-light opacity-70">
                    {{ event.time }}
                  </div>
                </v-col>

                <v-col class="pt-1 pt-sm-0" cols="12" md="10" sm="9">
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
</style>
