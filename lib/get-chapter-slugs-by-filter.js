export default function getChapterSlugsByFilter (chapters, filter) {
  return chapters
    .filter(chapter => chapter.availableCategories.includes(filter))
    .map(chapter => chapter.slug);
}
