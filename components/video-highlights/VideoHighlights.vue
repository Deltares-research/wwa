<template>
  <section
    v-if="videoHighlights.length > 0"
    class="video-highlights"
  >
    <div class="layout-section">
      <div class="layout-section__container">
        <h2 class="video-highlights__title">Video highlights</h2>
        <div class="video-list">
          <ul
            class="video-list__list"
          >
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
    </div>
  </section>
</template>

<script>
import VimeoEmbed from '~/components/vimeo-embed/VimeoEmbed'

export default {
  components: { VimeoEmbed },
  data () {
    return {
      videoHighlights: []
    }
  },
  props: {
    videoHighlights: Array
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
  margin: 0 -25px;
}

.video-list__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.video-list__item {
  flex-basis: calc(50% -50px);
  margin: 0 25px 1rem 25px;
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

  .video-list__list {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

/*
** Temp page margin styles to be removed after merge
*/

.layout-section {
  width: calc(100vw - 40px);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20px;
}

@media (min-width: 600px) {
  .layout-section {
      width: calc(100vw - 80px);
      padding: 0 40px;
  }
}

.layout-section__container {
  max-width: 950px;
  width: 100%;
}
</style>
