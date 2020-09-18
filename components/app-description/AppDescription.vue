<template>
  <div class="app-description">
    <nuxt-link
      to="/about/"
      class="app-description__link"
      :class="{ 'app-description__link--dark': variant === 'dark' }"
    >
      {{ description }}
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    variant: {
      type: String,
      validator (val) {
        return (val === 'dark' || val === 'light');
      },
      default () {
        return 'dark';
      },
    },
  },
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
  height: 12px;
  background-image: url('~assets/arrow-right.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border-bottom: 1px solid transparent;
}

.app-description__link--dark:after {
  background-image: url('~assets/arrow-right--white.svg');
}

.app-description__link:hover:after,
.app-description__link:focus:after {
  border-bottom: 1px solid var(--blue-secondary);
}

.app-description__link--dark:hover:after,
.app-description__link--dark:focus:after {
  border-bottom: 1px solid var(--white);
}
</style>
