<template>
  <svg v-bind:class="`svg-icon ${icon} ${iconVariant}`" xmlns:xlink="http://www.w3.org/1999/xlink">
    <use v-bind:xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
import '~/components/colors/colors.css'

const icon = this.icon
const variant = this.variant

export default {
  computed: {
    iconVariant: () => (this.variant) ? `${icon}--${variant}` : ''
  },
  props: [ 'icon', 'variant' ]
}
</script>
