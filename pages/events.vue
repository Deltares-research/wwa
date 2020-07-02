<template>
  <div>
    <main-menu variant="dark" />

    <main class="layout-section">
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
    </main>

    <app-footer />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import MainMenu from '~/components/main-menu/MainMenu';
  import AppFooter from '~/components/app-footer/AppFooter';

  export default {
    async middleware ({ store, redirect }) {
      const app = await import('~/static/data/app.json');
      store.commit('setDescription', app.default.description);
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
    components: { MainMenu, AppFooter },
  };
</script>

<style>
  .event-preview {
    margin: 2rem;
  }

  .event-preview__link {
    font-weight: bold;
  }
</style>
