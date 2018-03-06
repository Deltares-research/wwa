<template>
  <svg v-bind:class="classObj" xmlns:xlink="http://www.w3.org/1999/xlink">
    <use v-bind:xlink:href="`#${this.icon}`" />
  </svg>
</template>
<script>
import '~/components/colors/colors.css'

export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: false
    }
  },
  computed: {
    classObj () {
      return {
        'svg-icon': true,
        [this.icon]: true,
        [`${this.icon}--${this.variant}`]: (this.variant)
      }
    }
  }
}
</script>
