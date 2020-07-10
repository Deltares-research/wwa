export default function getBookChapterSlugsByFilterItem (books, filterItem) {
  return books.length
    ? books.map(book => {
      return book.chapters.filter(chapter => {
        return chapter.filters.includes(filterItem);
      }).map(chapter => chapter.slug);
    })
      .filter(filteredBooks => Boolean(filteredBooks.length))
      .flat()
    : [];
}
