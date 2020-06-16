<template>
  <div>
    <ol
      v-for="event in [...allInternalEvents, ...allExternalEvents]"
      :key="event.id"
    >
      <li>
        Date: {{ event.startDate }}
        Location: {{ event.location }}
        <img
          :src="`${event.image.url}?auto=compress&w=400`"
          alt=""
        >
        Name: {{ event.name }}
      </li>
    </ol>
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  
  export default {
    async asyncData() {
      const query = `
        {
          allExternalEvents {
            name
            id
            startDate
            location
            image {
              url
            }
          }

          allInternalEvents {
            name
            id
            startDate
            location
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
  };
</script>

<style>
</style>
