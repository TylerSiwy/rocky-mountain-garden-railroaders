<template>
  <v-container width="100%">
    <v-row justify="center">
      <v-col cols="12">
        <v-card elevation="2" class="pa-6">
          <v-card-title class="text-h4 font-weight-bold mb-4">
            About Us
          </v-card-title>

          <v-card-text>
            <p>
              Welcome to the Rocky Mountain Garden Railroaders (RMGRR)! We are a passionate community of G-Scale model railroaders based in Calgary, Alberta, Canada. What started as a group of friends in the late 1980s has grown into a vibrant, family-focused club of approximately 35 member families who build, operate, and display large-scale railways—both indoors and out.
            </p>
            <p>
              Our mission is to promote the hobby of large-scale model railroading, support one another's creative efforts, and share the joy of trains with the broader community.
            </p>

            <v-divider class="my-6" />

            <h2 class="text-h5 font-weight-bold mb-3">What We Do</h2>
            <p>Garden railroading is a multidisciplinary hobby that blends:</p>
            <v-list density="compact" lines="one">
              <v-list-item v-for="(item, index) in whatWeDoList" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>

            <p class="mt-2">
              Whether you're creating a lush garden layout, building whimsical scenes with bright colours, or engineering a detailed replica complete with smoke, sound, and lighting, there’s no single “right way” to build a railway. Each layout is as unique as the person or family behind it.
            </p>

            <v-divider class="my-6" />

            <h2 class="text-h5 font-weight-bold mb-3">A Family-Friendly Hobby</h2>
            <p>
              RMGRR is built around the idea that model railroading should be accessible and enjoyable for all ages. Our club includes parents, children, and even grandparents, working side-by-side. G-Scale trains are ideal for outdoor use and easier for small hands (and aging eyes) to appreciate.
            </p>
            <p>
              There’s something for everyone—laying track, planting gardens, designing models, running trains, or just enjoying the ride.
            </p>

            <v-divider class="my-6" />

            <h2 class="text-h5 font-weight-bold mb-3">Community Engagement</h2>
            <p>We're proud to share our love of trains with the wider community through:</p>
            <v-list density="compact" lines="one">
              <v-list-item v-for="(item, index) in communityEngagementList" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>

            <p class="mt-2">
              We believe in giving back and bringing smiles to the public through interactive, eye-catching model railway experiences.
            </p>

            <v-divider class="my-6" />

            <h2 class="text-h5 font-weight-bold mb-3">Annual Highlights</h2>
            <p>
              One of the most anticipated events is our club Garden Tour, which is open to anyone interested. It’s usually held in July. Members visit a series of club members' layouts, offering a chance to exchange ideas, showcase progress, and enjoy a shared passion. The day often wraps up with a friendly BBQ.
            </p>

            <v-divider class="my-6" />

            <h2 class="text-h5 font-weight-bold mb-3">Our Club</h2>
            <p>
              We keep things fun, welcoming, and affordable. Annual dues are just $40 per family, which includes access to:
            </p>
            <v-list density="compact" lines="one">
              <v-list-item v-for="(item, index) in clubList" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-divider class="my-6" />

            <h2 class="text-h5 font-weight-bold mb-3">Our Aims and Objectives</h2>
            <v-list density="compact" lines="one">
              <v-list-item v-for="(item, index) in aimsObjectivesList" :key="index">
                 <span class="text-h6">
                  {{ item }}
                  </span>
              </v-list-item>
            </v-list>

            <v-divider class="my-6" />

            <h2 class="text-h5 font-weight-bold mb-3">Join Us!</h2>
            <p>
              Whether you're a lifelong railroader or just getting curious about G-Scale trains, RMGRR welcomes all. Come to a meeting, talk to us at Supertrain, or join us on a Garden Tour. We’d love to meet you.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "About.vue",
  setup() {
    const whatWeDoList = ref([
      "Landscaping & gardening",
      "Model building & painting",
      "Electronics & automation",
      "3D printing",
      "Storytelling & design"
    ]);

    const communityEngagementList = ref([
      "Public exhibits at Supertrain (The largest model train convention in Canada)",
      "Displays at Aspen Crossing on Father’s Day",
      "Seasonal events at Heritage Park",
      "Special displays at hospitals, retirement homes, and fundraisers"
    ]);

    const clubList = ref([
      "Our video library",
      "Expert guidance from experienced modellers",
      "Club events, tours, and layout visits",
      "Invitations to collaborative “work parties”"
    ]);

    const aimsObjectivesList = ref([
      "Promote the hobby of Large Scale Model Railroading",
      "Encourage and assist new members entering the hobby",
      "Have fun and enjoy good fellowship through modelling and operations",
      "Support each other with technical and physical assistance",
      "Serve the public by operating layouts at train shows, hospitals, and retirement homes"
    ]);

    return {
      whatWeDoList,
      communityEngagementList,
      clubList,
      aimsObjectivesList
    };
  }
}
</script>

<style scoped>
  .v-list-item {
    color: #333;
  }

</style>
