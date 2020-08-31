export const Alerts = {
  namespaced: true,
  state: () => ({
    alerts: []
  }),
  mutations: {
    ADD_ALERT (state, payload) {
      state.alerts.push(payload)
      setTimeout(() => {
        const index = state.alerts.indexOf(payload)
        state.alerts.splice(index, 1)
      }, 5000)
    }
  },
  actions: {
    addAlert (context, options) {
      context.commit('ADD_ALERT', options)
    },
    showSuccess (context, message) {
      context.commit('ADD_ALERT', { type: 'success', message })
    },
    showError (context, message) {
      context.commit('ADD_ALERT', { type: 'error', message })
    }
  },
  getters: {
    alerts: state => state.alerts
  }
}
