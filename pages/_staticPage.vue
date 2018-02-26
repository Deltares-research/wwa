
<template>
  <article class="static-page">
    <h1>{{title}}</h1>
    <picture v-for="image in images" v-bind:key="image.id">
      <img v-bind:src="`${image.imgixHost}${image.value.path}?w=640&q=65`"/>
    </picture>
    <section v-html="htmlBody">
    </section>
  </article>
</template>

<script>
import events from '~/lib/events'
import loadData from '~/lib/load-data'
import marked from 'marked'

const renderer = new marked.Renderer()
renderer.paragraphCount = 0 // Need to keep track of the number of paragraphs
renderer.paragraph = function (content) {
  const i = this.paragraphCount || 0
  this.paragraphCount++
  return `<p ${(!i) ? 'class="intro"' : ''}>${content}</p>`
}

export default {
  async asyncData (context) {
    const { title, body, images } = await loadData(context, context.params)
    return { title, body, images }
  },
  computed: {
    htmlBody () {
      return this.customMarked(this.body)
    }
  },
  mounted () {
    this.$events.$emit(events.disableGlobeNavigation)
  },
  methods: {
    customMarked (content) {
      let formatted
      if (content) {
        renderer.paragraphCount = 0
        formatted = marked(content, { renderer })
      }
      return formatted
    }
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
