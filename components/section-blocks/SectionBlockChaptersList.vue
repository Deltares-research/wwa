<template>
  <div>
    <h4
      class="animator__slide-up section-block-chapters-list__title"
    >
      {{ title }}
    </h4>

    <ul class="list--inline section-block-chapters-list__list">
      <li
        v-for="chapter in chapters"
        :key="chapter.id"
        class="animator__slide-up section-block-chapters-list__list-item"
        animator-stagger
      >
        <nuxt-link
          :to="chapter.slug"
          append
          class="section-block-chapters-list__link"
        >
          <div class="section-block-chapters-list__chapter-title">
            {{ chapter.title }}
          </div>

          <img
            :src="chapter.coverUrl"
            alt=""
            class="section-block-chapters-list__image"
          >
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      chapters: Array,
    },
  };
</script>

<style>
  .section-block-chapters-list__title {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 900;
  }

  @media (--md-viewport) {
    .section-block-chapters-list__title {
      font-size: 1.5rem;
    }
  }

  .section-block-chapters-list__list {
    display: flex;
    flex-wrap: wrap;
  }

  @media (--md-viewport) {
    .section-block-chapters-list__list {
      flex-wrap: nowrap;
      margin: 0 0 0 -.5rem;
    }
  }

  .section-block-chapters-list__list-item {
    flex: 1 1 40%;
    margin-bottom: 1rem;
  }

  .section-block-chapters-list__list-item:nth-child(odd) {
    margin-left: 0;
    margin-right: .5rem;
  }

  .section-block-chapters-list__list-item:nth-child(even) {
    margin-left: .5rem;
    margin-right: 0;
  }

  @media (--md-viewport) {
    .section-block-chapters-list__list-item:nth-child(odd),
    .section-block-chapters-list__list-item:nth-child(even) {
      flex: 1 1 auto;
      margin-left: .5rem;
      margin-right: .5rem;
      margin-bottom: 0;
    }
  }

  .section-block-chapters-list__link {
    position: relative;
    display: block;
    height: 240px;
  }

  @media (--md-viewport) {
    .section-block-chapters-list__link {
      height: 380px;
    }
  }

  .section-block-chapters-list__link:before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, .8));
  }

  .section-block-chapters-list__chapter-title {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    right: 1rem;
    z-index: 1;
    font-size: 1rem;
    font-weight: bold;
    text-shadow: 1px 1px 1px var(--primary-blue);
  }

  @media (--md-viewport) {
    .section-block-chapters-list__chapter-title {
      font-size: 1.5rem;
    }
  }

  .section-block-chapters-list__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
