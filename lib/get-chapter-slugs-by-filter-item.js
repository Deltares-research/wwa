export default function getChapterSlugsByFilterItem (chapters, filterItem) {
  return chapters
    .filter(chapter => chapter.filters.includes(filterItem))
    .map(chapter => chapter.slug);
}
