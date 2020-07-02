<template>
  <div>
    <globe-component
      :is="GlobeComponent"
      class="globe-component"
      :class="{
        'globe-component--tall': highlightedEvent,
      }"
    />

    <main-menu variant="dark" />

    <main>
      <globe-header />

      <div
        :class="{ 'globe-spacing--tall': highlightedEvent }"
        class="layout-section globe-spacing--events"
      >
        <div class="layout-section__container">
          <ol
            v-for="event in [...allInternalEvents, ...allExternalEvents]"
            :key="event.id"
          >
            <li class="event-preview">
              {{ event.startDate }}
              <img
                :src="`${event.image.url}?auto=compress&w=400`"
                alt=""
              >
              {{ event.name }}

              <div class="event-preview__link">
                <a
                  v-if="event.url"
                  :href="event.url"
                >{{ event.url }}</a>
                <nuxt-link
                  v-else
                  :to="`/en/events/${event.slug}`"
                >
                  Go to event page
                </nuxt-link>
              </div>
            </li>
          </ol>
          <app-footer />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import fetchContent from '~/lib/fetch-content';
  import GlobeHeader from '~/components/globe-header/GlobeHeader';
  import MainMenu from '~/components/main-menu/MainMenu';
  import AppFooter from '~/components/app-footer/AppFooter';

  export default {
    async middleware ({ store, redirect }) {
      const app = await import('~/static/data/app.json');
      store.commit('setDescription', app.default.description);
      store.commit('setHighlightedEvent', app.default.highlightedEvent);
      store.commit('setNavigationLinks', app.default.navigationLinks);
    },
    async asyncData() {
      const query = `
        {
          allExternalEvents {
            name
            id
            startDate
            url
            image {
              url
            }
          }

          allInternalEvents {
            name
            id
            slug
            startDate
            image {
              url
            }
          }
        }
      `;

      return {
        ...await fetchContent(query),
      };
    },
    components: { MainMenu, GlobeHeader, AppFooter },
    computed: {
      ...mapState(['highlightedEvent']),
    },
    beforeCreate () {
      this.GlobeComponent = () => ({
        component: import(/* webpackChunkName: "globe-component" */'~/components/globe-component/GlobeComponent.vue'),
      });
    },
  };
</script>

<style>
  .globe-component {
    position: fixed;
    z-index: -10;
    top: 4rem;
  }

  .globe-component--tall {
    top: 9rem;
  }

  @media (--sm-viewport) {
    .globe-component {
      top: 0rem;
    }

    .globe-component--tall {
      top: 5rem;
    }
  }

  .globe-spacing--events {
    position: relative;
    margin-top: calc(var(--globe-spacing-default) + 50px);
  }

  .globe-spacing--events:before {
    content: '';
    display: block;
    position: absolute;
    margin-top: -100px;
    width: 100%;
    height: 100px;
    background: linear-gradient(0deg, #080808 0%, rgba(8, 8, 8, 0) 100%);
  }

  .globe-spacing--events--tall {
    margin-top: calc(var(--globe-spacing-tall) + 50px);
  }

  @media (--sm-viewport) {
    .globe-spacing {
      margin-top: calc(var(--globe-spacing-default--desktop) + 50px);
    }

    .globe-spacing--tall {
      margin-top: calc(var(--globe-spacing-tall--desktop) + 50px);
    }
  }
</style>
