<template>
  <chapter-list
    :chapters="filteredChapters"
    sorted="newest"
    :limit="20"
  />
</template>

<script>
  import { mapGetters } from 'vuex';
  import ChapterList from '~/components/chapter-list/ChapterList';

  export default {
    layout: 'globe',
    computed: {
      ...mapGetters(['filteredChapters']),
    },
    components: { ChapterList },
  };
</script>
