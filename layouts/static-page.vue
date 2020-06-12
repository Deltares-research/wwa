<template>
  <main class="layout layout--static-page">
    <main-menu variant="light" />
    <nuxt />
  </main>
</template>
<script>
import MainMenu from '~/components/main-menu/MainMenu'

export default {
  components: { MainMenu }
}
</script>
