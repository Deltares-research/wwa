<template>
  <div class="layout-section layout-section--events">
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
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import fetchContent from '~/lib/fetch-content';

  export default {
    layout: 'globe',
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
            geolocation {
              latitude
              longitude
            }
            image {
              url
            }
          }

          allInternalEvents {
            name
            id
            slug
            startDate
            geolocation {
              latitude
              longitude
            }
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
    computed: {
      ...mapState(['highlightedEvent']),
    },
    data() {
      return {
        markers: [],
      };
    },
    mounted () {
      const allEvents = [...this.allInternalEvents, ...this.allExternalEvents];
      this.markers = allEvents.map(event => {
        return {
          location: {
            lat: event.geolocation.latitude,
            lon: event.geolocation.longitude,
          },
          theme: {
            slug: 'event',
          },
        };
      });
      this.$store.commit('replaceTheme', 'too-much');
      this.$store.commit('replaceFeatures', this.markers);
      this.$store.commit('enableInteraction');
      this.$store.commit('enableGlobeAutoRotation');
    },
  };
</script>

<style>
  .layout-section--events {
    position: relative;
    margin-top: calc(var(--globe-spacing-default) + 50px);
  }

  .layout-section--events:before {
    content: '';
    display: block;
    position: absolute;
    margin-top: -100px;
    width: 100%;
    height: 100px;
    background: linear-gradient(0deg, #080808 0%, rgba(8, 8, 8, 0) 100%);
  }
</style>
