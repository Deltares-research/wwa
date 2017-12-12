<template>
  <div>
    <v-card>
      <h2>{{ title }} {{ id }}</h2>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'VStory',
  data () {
    return {
      title: 'Story'


    }
  },
    computed: {
      id() {
        return this.$route.params.id;
      }
    }
}

</script>
