<template>
  <div class="event-header">
    <img
      :src="`${event.image.url}?auto=compress&fit=crop&w=80&h=80`"
      alt=""
      class="event-header__image"
    >
    <h1 class="event-header__name">
      <span class="event-header__location">{{ event.location }}</span>
      {{ event.name }}
    </h1>
    <nav class="language-switch">
      <ul class="language-switch__list">
        <li
          v-for="{ locale } in event._allNameLocales"
          :key="locale"
          class="language-switch__item"
        >
          <nuxt-link
            class="language-switch__link"
            :class="{ 'language-switch__link--active': route.params.language === locale }"
            rel="alternate"
            :hreflang="locale"
            :lang="locale"
            :to="{ name: route.name, params: { ...route.params, language: locale } }"
          >
            {{ getNativeName(locale) }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import ISO6391 from 'iso-639-1';

  export default {
    methods: {
      getNativeName: ISO6391.getNativeName,
    },
    props: {
      event: Object,
    },
    data({ $route }) {
      return { route: $route };
    },
  };
</script>

<style>
  .event-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .5rem 0;
    background-color: var(--primary-blue);
  }

  @media (min-width: 600px) {
    .event-header {
      padding: 1rem 0;
    }
  }

  .event-header__image {
    margin-right: .5rem;
    width: 40px;
    border-radius: 50%;
  }

  @media (min-width: 600px) {
    .event-header__image {
      margin-right: 1rem;
    }
  }

  .event-header__name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 1rem;
  }

  @media (min-width: 600px) {
    .event-header__name {
      flex-direction: row;
    }
  }

  .event-header__location {
    display: block;
    color: var(--tertiary-blue);
  }

  @media (min-width: 600px) {
    .event-header__location {
      margin-right: 0.4rem;
    }
  }

  .language-switch {
    margin-left: auto;
  }

  .language-switch__list {
    display: flex;
    align-items: center;
    list-style-type: none;
  }

  .language-switch__item {
    flex-shrink: 0;
  }

  .language-switch__link {
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }

  .language-switch__link--active {
    background-color: var(--grey);
    font-weight: bold;
  }
</style>
