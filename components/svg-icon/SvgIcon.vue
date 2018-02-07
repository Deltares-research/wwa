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
      const classes = {
        'svg-icon': true
      }
      classes[this.icon] = true
      if (this.variant) {
        classes[`${this.icon}--${this.variant}`] = true
      }
    }
  }
}
</script>
