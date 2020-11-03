<template>
  <main class="layout-section layout-section--background-black layout-section--events">
    <div class="layout-section__container">
      <h1 class="events-title">
        Events
      </h1>


      <p
        v-if="highlightedEvent"
        class="events-highlight-title"
      >
        Highlight
      </p>

      <section
        v-if="highlightedEvent"
        class="event-preview__highlight"
      >
        <img
          class="event-preview__highlight-image"
          :src="`${highlightedEvent.imageUrl}?auto=compress,format&w=1080&h=400&fit=crop`"
          alt=""
        >
        <div class="event-preview__highlight-copy">
          <h2
            class="event-preview__highlight-title"
            v-html="highlightedEvent.name"
          />
          <p class="event-preview__highlight-date">
            {{ highlightedEvent.displayDate }}
          </p>
          <p class="event-preview__highlight-summary">
            {{ highlightedEvent.summary }}
          </p>
          <a
            class="event-preview__highlight-link"
            :href="`/events/${highlightedEvent.slug}/`"
          >
            Go to event page
          </a>
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
  import seoHead from '~/lib/seo-head';
  import { mapState } from 'vuex';
  import EventOverviewList from '~/components/event-overview-list/EventOverviewList';

  export default {
    layout: 'globe',
    async middleware ({ store, redirect }) {
      const app = await import('~/static/data/app.json');
      store.commit('setDescription', app.default.description);
      store.commit('setHighlightedEvent', app.default.highlightedEvent);
      store.commit('setNavigationLinks', app.default.navigationLinks);
    },
    async asyncData({ params }) {
      const data = await import(`~/static/data/events/index.json`);
      return data.default;
    },
    head() {
      return seoHead(this.seo, this.$route.path);
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
      this.$store.commit('disableGlobePositionRight');
      this.$store.commit('resetTheme');
      this.$store.commit('setMarkerTypes', ['event']);
      this.$store.commit('enableInteraction');
      this.$store.commit('enableGlobeAutoRotation');
    },
  };
</script>

<style>
  .events-title {
    margin-bottom: 1rem;
  }

  @media (--md-viewport) {
    .events-title {
      margin-bottom: 2rem;
    }
  }

  .events-highlight-title {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  @media (--md-viewport) {
    .events-highlight-title {
      font-size: 1.25rem;
    }
  }

  .layout-section--events {
    position: relative;
    margin-top: calc(var(--globe-spacing-default) + 50px);
    padding-top: 1rem;
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

  @media(--md-viewport) {
    .events-title {
      font-size: 3.75rem;
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

  @media(--md-viewport) {
    .event-preview__highlight {
      height: 25rem;
    }
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
    padding: 2rem 1rem;
  }

  .event-preview__highlight-title {
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1.5rem;
  }

  @media(--md-viewport) {
    .event-preview__highlight-title {
      margin-bottom: 0;
      font-size: 3.75rem;
      line-height: 1;
    }
  }

  .event-preview__highlight-title em {
    font-style: normal;
  }

  .event-preview__highlight-date {
    display: none;
  }

  @media(--md-viewport) {
    .event-preview__highlight-date {
      display: block;
      font-size: 2rem;
      font-weight: bold;
    }
  }

  .event-preview__highlight-summary {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: 500;
    text-shadow: 0px 0px 1px black;
    line-height: 1.3;
  }

  @media(--md-viewport) {
    .event-preview__highlight-summary {
      max-width: 50%;
    }
  }

  .event-preview__highlight-link {
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    color: var(--blue-tertiary);
  }

  .event-preview__highlight-link:hover,
  .event-preview__highlight-link:focus {
    color: var(--blue-tertiary);
  }

  .event-preview__highlight-link:after {
    content: '';
    display: block;
    margin-left: .5rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--white);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.7 5h6.6M5 1.7L8.3 5 5 8.3' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
