export default function (to, from, savedPosition) {
  if (
    (to.name !== 'themes-theme') &&
    (from.name !== 'themes-theme' || from.name !== 'index')
  ) {
    return { x: 0, y: 0 };
  }
}
