<template>
  <main class="layout layout--static-page">
    <main-menu variant="light" />
    <nuxt/>
  </main>
</template>
<script>
import MainMenu from '~/components/main-menu/MainMenu'

export default {
  components: { MainMenu }
}
</script>

<style>
@import '../components/colors/colors.css';

html {
  padding: 0;
  margin: 0;
}

.layout--static-page {
  width: 100%;
  overflow: visible;
  background-color: var(--ui--white);
}

</style>
