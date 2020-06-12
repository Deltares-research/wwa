<template>
  <div class="event-header">
    <h1 class="event-header__name">
      <span class="event-header__location">{{ location }}</span>
      {{ name }}
    </h1>
    <nav class="language-switch">
      <ul class="language-switch__list">
        <li v-for="{ locale } in _allNameLocales" :key="locale">
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
      name: String,
      location: String,
      _allNameLocales: Array,
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
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--ui--black);
  }

  .event-header__name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 1rem;
  }

  .event-header__location {
    display: block;
    color: var(--yl-gn-bu--2-5);
  }

  .language-switch__list {
    display: flex;
    list-style-type: none;
  }

  .language-switch__link {
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }

  .language-switch__link--active {
    background-color: var(--ui--blue--bg);
    font-weight: bold;
  }
</style>
