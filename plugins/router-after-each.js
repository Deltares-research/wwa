export default function ({ store, app }) {
  app.router.afterEach((to, from) => {
    if (from.name && !store.state.historyAvailable) {
      store.commit('setHistoryAvailable');
    }
  });
}
