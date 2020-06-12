<template>
  <div class="invert">
    <div class="layout-section">
      <div class="layout-section__container">
        <book-header :title="title" />
      </div>
    </div>
  </div>
</template>

<script>
import BookHeader from '~/components/book-header/BookHeader';

export default {
  layout: 'globe',
  components: { BookHeader },
  data () {
    return {
      title: 'Methodologies',
    };
  },
};
</script>
