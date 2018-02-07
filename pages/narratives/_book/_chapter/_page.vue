<template>
  <div>
    <header class="header">
      <h1 class="h2 invert"><nuxt-link v-bind:to="book.path">{{book.title}}</nuxt-link></h1>
      <h2 class="h1 invert"><nuxt-link v-bind:to="chapter.path">{{chapter.title}}</nuxt-link></h2>
    </header>
    <page-component v-for="page in pages" v-bind:key="page.slug"
      v-bind:page="page"
      v-bind:id="page.slug"
      class="page-component" />
  </div>
</template>

<script src="./page-component.js"></script>

<style>
.header {
  max-width: 960px;
  width: 100%;
  margin: auto;
  margin-top: 62.5vh;
  color: #fff;
}
.header a {
  color: inherit;
  text-decoration: none;
}
.header + .page-component {
  margin-top: 0;
}
.page-component {
  margin: 50vh auto; /* Note that these margins should collapse */
}
</style>
