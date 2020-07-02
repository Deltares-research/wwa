<template>
  <div>
    <main-menu variant="dark" />

    <main class="layout-section event-layout-section">
      <div class="layout-section__container">
        <event-overview-list
          :internal-events="allInternalEvents"
          :external-events="allExternalEvents"
        />
      </div>
    </main>

    <app-footer />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import MainMenu from '~/components/main-menu/MainMenu';
  import EventOverviewList from '~/components/event-overview-list/EventOverviewList';
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
            id
            name
            startDate
            endDate
            displayDate
            summary
            location
            url
            urlLabel
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
    components: { MainMenu, EventOverviewList, AppFooter },
  };
</script>

<style>
  .event-layout-section {
    padding-top: 200px;
  }
</style>
