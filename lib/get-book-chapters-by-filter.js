export default function getBookChaptersByFilter (books, filter) {
  return books.length
    ? books.map(book => {
      return book.chapters.filter(chapter => {
        return chapter.filters.includes(filter);
      });
    })
      .filter(filteredBooks => Boolean(filteredBooks.length))
      .flat()
    : [];
}
