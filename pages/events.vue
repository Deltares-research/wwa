<template>
  <div>
    <main-menu variant="dark" />

    <main class="layout-section">
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
    </main>

    <app-footer />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import MainMenu from '~/components/main-menu/MainMenu';
  import AppFooter from '~/components/app-footer/AppFooter';

  export default {
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
    components: { MainMenu, AppFooter },
  };
</script>

<style>
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

  .events-highlight-title {
    margin-bottom: 0.6rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

  .event-preview {
    margin: 2rem;
  }

  .event-preview__link {
    font-weight: bold;
  }

  .event-preview__highlight {
    position: relative;
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
