
<template>
  <article class="static-page">
    <h1>{{title}}</h1>
    <section>
      {{body}}
    </section>
  </article>
</template>

<script>
import events from '~/components/events/events'
import loadData from '~/lib/load-data'

export default {
  async asyncData (context) {
    const { title, body } = await loadData(context, context.params)
    return { title, body }
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
