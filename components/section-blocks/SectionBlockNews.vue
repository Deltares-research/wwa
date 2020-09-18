<template>
  <div>
    <img
      v-if="showWaveMarker"
      src="~/assets/event-title-wave.svg"
      width="111"
      height="35"
      alt=""
      class="animator__slide-up event-block-text__icon"
    >
    <h3
      class="animator__slide-up event-block-text__title"
      :class="{
        'event-block-text__title--orange': titleColor === 'orange',
        'event-block-text__title--blue': titleColor === 'blue',
      }"
      animator-stagger
    >
      {{ title }}
    </h3>

    <news-list class="animator__slide-up" animator-stagger :news-articles="newsArticles" />
  </div>
</template>

<script>
  import NewsList from '@/components/news-list/NewsList'
  export default {
    components: {NewsList},
    props: {
      title: String,
      showWaveMarker: Boolean,
      titleColor: String,
      newsArticles: {
        type: Array,
        required: true
      }
    },
  };
</script>

<style>
</style>
