<template>
  <div>
    <h3
      v-if="title"
      class="event-block-credits__title"
    >
      {{ title }}
    </h3>

    <div
      v-if="body"
      v-html="body"
      class="event-block-credits__body"
    />

    <ul
      v-if="logos"
      class="event-block-credits__icons list--inline"
    >
      <li
        v-for="(logo, index) in logos"
        :key="index"
        class="event-block-credits__icons-item"
      >
        <img
          :src="`${logo.url}?auto=compress,format&h=75`"
          :alt="logo.alt"
        >
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      body: String,
      logos: Array,
    },
  };
</script>

<style>
  .event-block-credits__title {
    margin-bottom: .25rem;
    max-width: 30rem;
    font-weight: bold;
    color: var(--blue-tertiary);
  }

  .event-block-credits__body {
    margin-bottom: 1rem;
    max-width: 30rem;
    font-size: 0.875rem;
    font-style: italic;
  }

  .event-block-credits__icons {
    margin-right: .5rem;
  }

  .event-block-credits__icons-item img {
    height: 75px;
  }
</style>
