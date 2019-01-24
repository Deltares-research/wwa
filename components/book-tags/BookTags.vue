<template>
  <div class="books-tags">
    <button
      class="books-tags__button"
      :class="{ 'books-tags__button--active': showMobileTags }"
      @click="showMobileTags = !showMobileTags"
    >
      <span class="sr-only">Go to</span>
      <span class="books-tags__button__title">Themes</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="books-tags__button__icon"
        :class="{ 'books-tags__button__icon--active': showMobileTags }"
      >
        <path d="M7 10l5 5 5-5z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
    <ul
      class="book-tags__list"
      :class="{ 'books-tags__list--show': showMobileTags }"
    >
      <li
        class="book-tags__list-item"
        v-for="book in books"
        :key="book.slug"
      >
        <button class="tag tag--book" @click="$emit('selectLink', book.slug)" >{{ book.title }}</button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['books'],
  data: () => ({
    bookLimitMap: {},
    showMobileTags: false
  })
}
</script>

<style>
  .book-tags__list {
    margin: 0.5rem 0 1rem 0;
    padding: 0;
    float: left;
  }
  .book-tags__list-item {
    float: left;
    padding: 0;
    list-style: none;
    margin: 0 0.5rem 0.5rem 0;
  }
  .tag--book {
    background: var(--ui--white);
    margin: 0;
    cursor: pointer;
    text-transform: none;
  }
  .books-tags__button {
    margin-bottom: 1rem;
    background: #467388;


    border: 1px solid transparent;
    /* background: none; */
    font-size: 1em;
    line-height: 30px;
    letter-spacing: 0.6px;
    font-weight: bold;
    color: var(--ui--white);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .books-tags__button:hover,
  .books-tags__button--active {
    background-color: rgba(255, 255, 255, 0.2);
    transition: background-color 200ms ease-in-out;
  }
  .books-tags__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .books-tags__button__icon {
    display: inline-block;
    fill: var(--ui--white);
    margin: 3px 0 3px 0.5em;
    transition: transform 200ms ease-in-out;
  }
  .books-tags__button__icon--active {
    transform: rotate(180deg);
  }

  @media (max-width: 600px) {
    .book-tags__list {
      height: 0;
      overflow: hidden;
      opacity: 0;
      transition: opacity 300ms ease-in-out;
    }
    .books-tags__list--show {
      height: auto;
      opacity: 1;
    }
  }

  @media (min-width: 600px) {
    .books-tags__button {
      display: none;
    }
  }
</style>
