import axios from 'axios'

export const Routes = {
  namespaced: true,
  state: () => ({
    routes: [],
    routeStatuses: []
  }),
  mutations: {
    SET_ROUTE_STATUSES (state, payload) {
      state.routeStatuses = payload
    },
    SET_ROUTES (state, payload) {
      state.routes = payload
    },
    DELETE_ROUTE (state, payload) {
      const index = state.routes.indexOf(payload)
      state.routes.splice(index, 1)
    },
    UPDATE_ROUTE (state, payload) {
      const route = state.routes.find(route => route.id === payload.id)
      Object.assign(route, payload)
    }
  },
  actions: {
    async getRouteStatuses (context) {
      const { data } = await axios.get('/api/route-statuses')
      context.commit('SET_ROUTE_STATUSES', data)
    },
    async getAll (context) {
      const { data } = await axios.get('/api/routes')
      context.commit('SET_ROUTES', data)
    },
    async create (context, route) {
      const { data } = await axios.post('/api/routes', route)
      context.commit('Cars/UPDATE_CAR', data.car, { root: true })
      context.commit('SET_ROUTES', [data, ...context.state.routes])
    },
    async delete (context, route) {
      const { data } = await axios.delete(`/api/routes/${route.id}`)
      context.commit('Cars/UPDATE_CAR', data.car, { root: true })
      context.commit('DELETE_ROUTE', route)
    },
    async update (context, route) {
      const { data } = await axios.put(`/api/routes/${route.id}`, route)
      context.commit('Cars/UPDATE_CAR', data.car, { root: true })
      context.commit('UPDATE_ROUTE', data)
    }
  },
  getters: {
    routes: state => state.routes,
    routeStatuses: state => state.routeStatuses
  }
}
