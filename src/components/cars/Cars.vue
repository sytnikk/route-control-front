<template>
  <v-data-table
    :headers="headers"
    :items="cars"
    :loading="loading"
    loading-text="Загрузка... Пожалуйста, подождите"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >Добавить новый</v-btn>
        </template>
        <v-card
          :disabled="saving"
          :loading="saving"
        >
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="editedItem.licensePlate"
                  :rules="validation.licensePlateRules"
                  :counter="8"
                  label="Номерной знак"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.model"
                  :rules="validation.modelRules"
                  label="Модель"
                  required
                ></v-text-field>
                <v-select
                  v-model="editedItem.transportTypeId"
                  :rules="validation.transportTypeIdRules"
                  :items="transportTypes"
                  :item-text="'text'"
                  :item-value="'id'"
                  label="Тип транспорта"
                  required
                ></v-select>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="editedItem.purchaseDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.purchaseDate"
                      :rules="validation.purchaseDateRules"
                      label="Дата приобретения"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.purchaseDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Закрыть</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(editedItem.purchaseDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-text-field
                  v-model="editedItem.mileage"
                  :rules="validation.mileageRules"
                  label="Пробег"
                  required
                ></v-text-field>
                <v-select
                  v-model="editedItem.carStatusId"
                  :rules="validation.carStatusIdRules"
                  :items="carStatuses"
                  :item-text="'text'"
                  :item-value="'id'"
                  label="Статус"
                  required
                ></v-select>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Отменить</v-btn>
            <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.transportType="{ item }">
      <span>{{item.transportType.text}}</span>
    </template>
    <template v-slot:item.carStatus="{ item }">
      <span>{{item.carStatus.text}}</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="edit(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="remove(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import { CarFormValidation } from './validation'
import { CarTableHeaders } from './headers'
import CrudTableMixin from '../CrudTableMixin'

const car = {
  licensePlate: '',
  model: '',
  transportTypeId: '',
  purchaseDate: '',
  mileage: '',
  carStatusId: 1
}

export default {
  name: 'Cars',
  mixins: [CrudTableMixin],
  data: () => ({
    menu: false,
    headers: CarTableHeaders,
    editedIndex: -1,
    editedItem: { ...car },
    defaultItem: { ...car },
    validation: CarFormValidation
  }),
  computed: {
    ...mapGetters({
      cars: 'Cars/cars',
      transportTypes: 'Cars/transportTypes',
      carStatuses: 'Cars/carStatuses'
    }),
    formTitle () {
      return this.editedIndex === -1
        ? 'Новый автомобиль'
        : 'Редактирование'
    }
  },
  mounted () {
    this.$store.dispatch('Cars/getAll')
    this.$store.dispatch('Cars/getCarStatuses')
    this.$store.dispatch('Cars/getTransportTypes')
    this.loading = false
  },
  methods: {
    edit (item) {
      this.editedIndex = this.cars.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async save () {
      try {
        this.$refs.form.validate()
        if (this.valid) {
          this.saving = true
          if (this.editedIndex > -1) {
            await this.$store.dispatch('Cars/update', this.editedItem)
            this.$store.dispatch(
              'Alerts/showSuccess',
              `${this.editedItem.model} ${this.editedItem.licensePlate} обновлен`
            )
          } else {
            await this.$store.dispatch('Cars/create', this.editedItem)
            this.$store.dispatch('Alerts/showSuccess',
              `${this.editedItem.model} ${this.editedItem.licensePlate} создан`)
          }
          this.close()
        }
      } catch (e) {
        this.$store.dispatch('Alerts/showError', e.response.data.message)
      }
      this.saving = false
    },
    async remove (car) {
      this.loading = true
      try {
        await this.$store.dispatch('Cars/delete', car)
        this.$store.dispatch('Alerts/showSuccess',
          `${car.model} ${car.licensePlate} удален`)
      } catch (e) {
        this.$store.dispatch('Alerts/showError', e.response.data.message)
      }
      this.loading = false
    }
  }
}
</script>
