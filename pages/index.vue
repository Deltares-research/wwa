<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md6 offset-md3>
          <v-globe></v-globe>
        </v-flex>
        <v-flex>
          <h1 class="title">
            wwa
          </h1>
          <h2 class="subtitle">
            World Water Atlas
          </h2>
          <div class="links">
            <nuxt-link to="/narratives/slug">Narrative</nuxt-link>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <div>

    </div>
  </section>
  </v-app>

</template>
<script>
import Vue from 'vue'
import Vuetify from 'vuetify'

import VGlobe from '~/components/VGlobe.vue'

// this makes sure the css is included in the html
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
export default {
  components: {
    VGlobe
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
