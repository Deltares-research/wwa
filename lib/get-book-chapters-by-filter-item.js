export default function getBookChaptersByFilterItem (books, filterItem) {
  return books.length
    ? books.map(book => {
      return book.chapters.filter(chapter => {
        return chapter.availableCategories.includes(filterItem);
      });
    })
      .filter(filteredBooks => Boolean(filteredBooks.length))
      .flat()
    : [];
}
