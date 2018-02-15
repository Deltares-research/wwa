<template>
  <div>
    <h1 class="title">World Water Atlas</h1>
  </div>
</template>

<script>
import events from '~/components/events/events'

export default {
  mounted () {
    this.$events.$emit(events.enableGlobeNavigation)
  }
}
</script>
