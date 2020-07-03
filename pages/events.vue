<template>
  <main class="layout-section layout-section--events">
    <div class="layout-section__container">
      <event-overview-list
        :internal-events="allInternalEvents"
        :external-events="allExternalEvents"
      />
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex';
  import fetchContent from '~/lib/fetch-content';
  import EventOverviewList from '~/components/event-overview-list/EventOverviewList';

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
            id
            name
            startDate
            endDate
            displayDate
            summary
            location
            url
            urlLabel
            geolocation {
              latitude
              longitude
            }
            image {
              url
              width
              height
            }
          }

          allInternalEvents {
            id
            name
            slug
            startDate
            endDate
            displayDate
            summary
            location
            geolocation {
              latitude
              longitude
            }
            image {
              url
              width
              height
            }
          }
        }
      `;

      return {
        ...await fetchContent(query),
      };
    },
    components: { EventOverviewList },
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
