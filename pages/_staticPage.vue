
<template>
  <article class="static-page">
    <h1>{{title}}</h1>
    <picture v-for="image in images" v-bind:key="image.id">
      <img v-bind:src="`${image.imgixHost}${image.value.path}?w=640&q=65`"/>
    </picture>
    <section>
      {{body}}
    </section>
  </article>
</template>

<script>
import events from '~/lib/events'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { title, body, images } = await loadData(context, context.params)
    return { title, body, images }
  },
  mounted () {
    this.$events.$emit(events.disableGlobeNavigation)
  }
}
</script>
<style>
  @import '../components/colors/colors.css';

  .static-page {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 4rem;
    background-color: var(--ui--white);
    box-sizing: border-box;
  }
</style>
