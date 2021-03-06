export const CarFormValidation = {
  licensePlateRules: [
    v => !!v || 'Пожалуйста, заполните это поле',
    v => /^[А-Я]{2}\d{4}[А-Я]{2}$/.test(v) || 'Пожалуйста, заполните поле в формате АА1111АА'
  ],
  modelRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  transportTypeIdRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  purchaseDateRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ],
  mileageRules: [
    v => !!v || 'Пожалуйста, заполните это поле',
    v => /^[0-9]*$/.test(v) || 'Только цифры'
  ],
  carStatusIdRules: [
    v => !!v || 'Пожалуйста, заполните это поле'
  ]
}
