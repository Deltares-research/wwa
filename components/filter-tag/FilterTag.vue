<template>
  <nuxt-link
    :to="resetUrl"
    class="filter-tag"
    :class="{ 'filter-tag--selected': isSelected, 'filter-tag--removable': isRemovable }"
  >
    <img
      v-if="icon"
      :src="`${icon.imgixHost}${icon.value.path}`"
      alt=""
      class="filter-tag__icon"
      height="21px"
      :width="icon.value.width / (icon.value.height / 21)"
    >
    {{ title }}
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      title: String,
      slug: String,
      url: String,
      icon: Object,
      activeKeywordSlugs: Array,
      isSelected: Boolean,
      isRemovable: Boolean,
    },
    computed: {
      resetUrl() {
        if (this.url) {
          return this.url;
        } else {
          const base = this.$route.path.replace(/(\+?[^/])*(\/?)$/, ''); // remove all tags
          const excludingSelf = this.activeKeywordSlugs.filter(slug => slug !== this.slug).join('+');
          return `${base}${excludingSelf}`;
        }
      },
    },
  };
</script>

<style>
  .filter-tag {
    display: flex;
    align-items: center;
    padding: .3rem 1rem;
    min-height: 2rem;
    background: var(--black-secondary);
    font-size: .825rem;
    font-weight: bold;
    text-decoration: none;
    color: var(--white);
    border-radius: 5px;
  }

  .filter-tag:hover {
    color: var(--white);
  }

  .filter-tag--selected {
    background: var(--blue-tertiary);
    color: var(--blue-primary);
  }

  .filter-tag--selected:hover,
  .filter-tag--selected:focus {
    color: var(--blue-primary);
  }

  .filter-tag--removable {
    padding-right: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23ffffff' stroke-width='7' d='M25 25L7.3 42.7 25 25 7.3 7.3 25 25 42.7 7.3 25 25l17.7 17.7z' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: .8rem;
    background-position: center right .5rem;
  }

  .filter-tag__icon {
    display: block;
    margin-right: .5rem;
  }
</style>
