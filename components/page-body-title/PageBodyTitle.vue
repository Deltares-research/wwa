<template>
  <section class="page-body-title">
    <img
      v-if="theme && theme.slug"
      class="theme-icon page-body-title__theme-icon"
      :src="`/${theme.slug}.png`"
      width="30"
      height="30"
      alt=""
    >

    <h2 class="page-body-title__title">
      {{ pageTitle }}
    </h2>

    <div
      v-if="storyteller && storyteller.name"
      class="page-body-title__storyteller"
    >
      {{ storyteller.name }}
    </div>

    <ul
      v-if="influences && influences.length || methodologies && methodologies.length"
      class="page-body-title__tags list--inline"
    >
      <li
        v-for="link in methodologies"
        :key="`methodology-${link.slug}`"
        class="page-body-title__tag"
      >
        <filter-tag
          :title="link.title"
          :url="link.path"
          :icon="link.icon"
        />
      </li>
      <li
        v-for="link in influences"
        :key="`influence-${link.slug}`"
        class="page-body-title__tag"
      >
        <filter-tag
          :title="link.title"
          :url="link.path"
          :icon="link.icon"
        />
      </li>
    </ul>

    <div
      class="page-body-title__goals"
      v-if="goals && goals.length"
    >
      <ul class="list--inline">
        <li
          v-for="link in goals"
          :key="link.slug"
        >
          <nuxt-link
            :to="link.path"
          >
            <img
              :src="`${link.icon.imgixHost}${link.icon.value.path}?auto=compress,format&w=100`"
              :alt="link.title"
              class="page-body-title__goal-icon"
            >
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import FilterTag from '~/components/filter-tag/FilterTag';

export default {
  components: {
    FilterTag,
  },
  props: {
    pageTitle: String,
    influences: Array,
    goals: Array,
    methodologies: Array,
    storyteller: Object,
    partner: Object,
    theme: Object,
  },
};
</script>

<style>
  .page-body-title__theme-icon {
    margin-bottom: .5rem;
  }

  .page-body-title__title {
    margin-bottom: .5rem;
    font-size: 1.5rem;
    line-height: 1.2;
  }

  @media (--md-viewport) {
    .page-body-title__title {
      font-size: 2rem;
    }
  }

  .page-body-title__storyteller {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .page-body-title__tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: .5rem;
  }

  .page-body-title__tag {
    margin-bottom: .5rem;
  }

  .page-body-title__goals {
    margin-bottom: .75rem;
  }

  @media (--md-viewport) {
    .page-body-title__goals {
      margin-bottom: 1.5rem;
    }
  }

  .page-body-title__goal-icon {
    width: 50px;
  }
</style>
