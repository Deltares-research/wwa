<template>
  <div class="app-description">
    <nuxt-link to="/about/" class="app-description__link">
      {{ description }}
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['description']),
  },
};
</script>

<style>
.app-description {
  padding-left: .5rem;
  border-left: 2px solid var(--orange);
  font-weight: 500;
}

@media (--sm-viewport) {
  .app-description {
    font-weight: normal;
  }
}

.app-description__link {
  text-decoration: none;
}

.app-description__link:hover,
.app-description__link:focus {
  text-decoration: underline;
}

.app-description__link:after {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  background-image: url('~assets/arrow-right--white.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
