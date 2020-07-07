export default function getFilteredChaptersByCategory (books, category) {
  return books.length
    ? books.map(book => {
      return book.chapters.filter(chapter => {
        return chapter.availableCategories.includes(category);
      });
    })
      .filter(filteredBooks => Boolean(filteredBooks.length))
      .flat()
    : [];
}
