<template>
  <section
    v-if="videoHighlights.length > 0"
    class="video-highlights"
  >
    <div class="layout-section">
      <div class="layout-section__container">
        <h2 class="video-highlights__title">Video highlights</h2>
        <ul class="video-list">
          <li
            v-for="videoHighlight in videoHighlights"
            :key="videoHighlight.providerUid"
            class="video-list__item"
          >
            <vimeo-embed
              :title="videoHighlight.title"
              :description="videoHighlight.body"
              :vimeoId="videoHighlight.video.providerUid"
              :url="videoHighlight.url"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import VimeoEmbed from '~/components/vimeo-embed/VimeoEmbed'

export default {
  components: { VimeoEmbed },
  props: {
    videoHighlights: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.video-highlights {
  background-color: rgba(67, 67, 109, 0.75);
  padding: 1.5rem 0;
  width: 100vw;
}

.video-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.video-list__item {

  margin-bottom: 1rem;
  display: block;
  position: relative;
}

.video-highlights__title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  line-height: 2.1875rem;
  font-weight: 500;
}

@media (min-width: 600px) {
  .video-highlights {
    padding: 2.5rem 0;
  }

  .video-highlights__title {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }

  .video-list {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .video-list__item {
    flex-basis: calc(50% -25px);
  }

  .video-list__item:first-child {
    margin-right: 50px;
  }
}
</style>
