export const RoueFormValidation = {
  cityStartRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  cityEndRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  distanceBetweenCitiesRules: [
    v => !!v || 'Пожалуйста, заполните это поле',
    v => /^\d+$/.test(v) || 'Только цифры'
  ],
  sendingDateRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  transportTypeIdRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  carIdRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  deliveryDateRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  routeStatusIdRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  revenueRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ]
}
