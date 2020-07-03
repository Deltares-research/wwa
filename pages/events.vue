<template>
  <main class="layout-section layout-section--events">
    <div class="layout-section__container">
      <h2 class="events-title">
        Events
      </h2>

      <p class="events-highlight-title">
        Highlight
      </p>

      <section class="event-preview__highlight">
        <img
          class="event-preview__highlight-image"
          :src="app.highlightedEvent.image.responsiveImage.src"
          :srcset="app.highlightedEvent.image.responsiveImage.srcSet"
          :sizes="app.highlightedEvent.image.responsiveImage.sizes"
        >
        <div class="event-preview__highlight-copy">
          <h3
            class="event-preview__highlight-title"
            v-html="app.highlightedEvent.name"
          />
          <p class="event-preview__highlight-summary">
            {{ app.highlightedEvent.summary }}
          </p>
          <nuxt-link
            class="event-preview__highlight-link"
            :to="`/en/events/${app.highlightedEvent.slug}`"
          >
            Go to event page
          </nuxt-link>
        </div>
      </section>

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
          app {
            highlightedEvent {
              slug
              name
              displayDate
              summary
              image {
                responsiveImage(imgixParams: {auto: compress, w: 950, h: 410}) {
                  src
                  srcSet
                  sizes
                }
              }
            }
          }

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
  .events-highlight-title {
    margin-bottom: 0.6rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

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

  .events-title {
    font-style: normal;
    font-weight: 900;
    font-size: 2rem;
    line-height: 1.2;
    color: var(--blue-tertiary);
  }

  @media(--sm-viewport) {
    .events-title {
      font-size: 3.8rem;
    }
  }

  .event-preview {
    margin: 2rem;
  }

  .event-preview__highlight {
    position: relative;
    margin-bottom: 3rem;
    width: 100%;
    height: 18rem;
    z-index: 1;
  }

  .event-preview__highlight-image {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
  }

  .event-preview__highlight::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(280deg, rgba(0, 1, 40, 0) 7%, var(--blue-primary) 90%);
    z-index: -1;
  }

  .event-preview__highlight-copy {
    padding: 1rem;
  }

  .event-preview__highlight-title {
    margin-bottom: 0.4rem;
    font-weight: bold;
    font-size: 1.4rem;
  }

  .event-preview__highlight-title em {
    font-style: normal;
  }

  .event-preview__highlight-summary {
    line-height: 24px;
    font-size: 1.2rem;
    line-height: 1.1;
  }
</style>
