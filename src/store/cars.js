import axios from 'axios'

export const Cars = {
  namespaced: true,
  state: () => ({
    cars: [],
    carStatuses: [],
    transportTypes: []
  }),
  mutations: {
    SET_CAR_STATUSES (state, payload) {
      state.carStatuses = payload
    },
    SET_TRANSPORT_TYPES (state, payload) {
      state.transportTypes = payload
    },
    SET_CARS (state, payload) {
      state.cars = payload
    },
    DELETE_CAR (state, payload) {
      const index = state.cars.indexOf(payload)
      state.cars.splice(index, 1)
    },
    UPDATE_CAR (state, payload) {
      const car = state.cars.find(car => car.id === payload.id)
      Object.assign(car, payload)
    }
  },
  actions: {
    async getCarStatuses (context) {
      const { data } = await axios.get('/api/car-statuses')
      context.commit('SET_CAR_STATUSES', data)
    },
    async getTransportTypes (context) {
      const { data } = await axios.get('/api/transport-types')
      context.commit('SET_TRANSPORT_TYPES', data)
    },
    async getAll (context) {
      const { data } = await axios.get('/api/cars')
      context.commit('SET_CARS', data)
    },
    async create (context, car) {
      const { data } = await axios.post('/api/cars', car)
      context.commit('SET_CARS', [data, ...context.state.cars])
    },
    async delete (context, car) {
      await axios.delete(`/api/cars/${car.id}`)
      context.commit('DELETE_CAR', car)
    },
    async update (context, car) {
      const { data } = await axios.put(`/api/cars/${car.id}`, car)
      context.commit('UPDATE_CAR', data)
    }
  },
  getters: {
    cars: state => state.cars,
    carStatuses: state => state.carStatuses,
    transportTypes: state => state.transportTypes
  }
}
