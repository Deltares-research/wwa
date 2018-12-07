<template>
  <section class="video-highlights">
    <div class="layout-section">
      <div class="layout-section__container">
        <h2 class="video-highlights__title">Video highlights</h2>
        <div class="video-list">
          <ul
            class="video-list__list"
          >
            <li
              v-for="video in videos"
              :key="video.id"
              class="video-list__item"
            >
              <vimeo-embed
                :id="video.id"
                :title="video.title"
                :description="video.description"
                :vimeoId="video.vimeoId"
                :cover="video.cover"
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
      videos: [
        { id: 1, title: 'Urban resilience in Rotterdam', description: 'Description video', vimeoId: 186083977, cover: '/4410/1519643886-himalayan-mountains-1389998675rrz.jpg' },
        { id: 2, title: 'Supporting resillient', description: 'Description video', vimeoId: 186083977, cover: '/4410/1519643886-himalayan-mountains-1389998675rrz.jpg' }
      ]
    }
  }
}
</script>

<style>
.video-highlights {
  background-color: rgba(255,255,255, 0.19);
  padding: 1.5rem 0;
  margin-bottom: 1.5rem;
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
    margin-bottom: 2.5rem;
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
