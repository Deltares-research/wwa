export default function getBookChapterSlugsByFilter (books, filter) {
  return books.length
    ? books.map(book => {
      return book.chapters.filter(chapter => {
        return chapter.availableCategories.includes(filter);
      }).map(chapter => chapter.slug);
    })
      .filter(filteredBooks => Boolean(filteredBooks.length))
      .flat()
    : [];
}
