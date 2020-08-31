<template>
  <v-data-table
    :headers="headers"
    :items="routes"
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
                  v-model="editedItem.cityStart"
                  :rules="validation.cityStartRules"
                  label="Город начала маршрута"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.cityEnd"
                  :rules="validation.cityEndRules"
                  label="Город конца маршрута"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.number="editedItem.distanceBetweenCities"
                  :rules="validation.distanceBetweenCitiesRules"
                  label="Расстояние между городами в километрах"
                  type="number"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.number="editedItem.revenue"
                  :rules="validation.revenueRules"
                  label="Ожидаемая выручка в долларах"
                  type="number"
                  required
                ></v-text-field>
                <v-row

                  justify="space-between"
                >
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-menu
                      ref="sendingDateMenu"
                      v-model="sendingDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.sendingDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.sendingDate"
                          :rules="validation.sendingDateRules"
                          label="Дата отправки"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.sendingDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="sendingDateMenu = false">Закрыть</v-btn>
                        <v-btn text color="primary" @click="$refs.sendingDateMenu.save(editedItem.sendingDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-menu
                      ref="deliveryDateMenu"
                      v-model="deliveryDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.deliveryDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.deliveryDate"
                          :rules="validation.deliveryDateRules"
                          label="Дата выполнения"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.deliveryDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="deliveryDateMenu = false">Закрыть</v-btn>
                        <v-btn text color="primary" @click="$refs.deliveryDateMenu.save(editedItem.deliveryDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-select
                  v-model="editedItem.transportTypeId"
                  :rules="validation.transportTypeIdRules"
                  :items="transportTypes"
                  :item-text="'text'"
                  :item-value="'id'"
                  label="Тип транспорта"
                  required
                ></v-select>
                <v-select
                  v-model="editedItem.carId"
                  :rules="validation.carIdRules"
                  :items="availableCars"
                  :item-value="'id'"
                  label="Тип транспорта"
                  required
                >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.model }} - {{ data.item.licensePlate }}
                  </template>
                  <template slot="item" slot-scope="data">
                    {{ data.item.model }} - {{ data.item.licensePlate }}
                  </template>
                </v-select>
                <v-select
                  v-model="editedItem.routeStatusId"
                  :rules="validation.routeStatusIdRules"
                  :items="routeStatuses"
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
    <template v-slot:item.routeStatus="{ item }">
      <span>{{item.routeStatus.text}}</span>
    </template>
    <template v-slot:item.car="{ item }">
      <span>{{item.car.model}} {{item.car.licensePlate}}</span>
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
import { RoueFormValidation } from './validation'
import { RouteTableHeaders } from './headers'
import CrudTableMixin from '../CrudTableMixin'

const route = {
  cityStart: '',
  cityEnd: '',
  distanceBetweenCities: '',
  revenue: '',
  sendingDate: '',
  transportTypeId: '',
  carId: '',
  routeStatusId: '',
  deliveryDate: ''
}

export default {
  name: 'Routes',
  mixins: [CrudTableMixin],
  data: () => ({
    sendingDateMenu: false,
    deliveryDateMenu: false,
    headers: RouteTableHeaders,
    editedIndex: -1,
    editedItem: { ...route },
    defaultItem: { ...route },
    validation: RoueFormValidation
  }),
  computed: {
    ...mapGetters({
      routes: 'Routes/routes',
      routeStatuses: 'Routes/routeStatuses',
      cars: 'Cars/cars',
      transportTypes: 'Cars/transportTypes'
    }),
    formTitle () {
      return this.editedIndex === -1
        ? 'Новый маршрут'
        : 'Редактирование'
    },
    availableCars () {
      return this.cars.filter((car) => {
        return car.transportTypeId === this.editedItem.transportTypeId
      })
    }
  },
  mounted () {
    this.$store.dispatch('Routes/getAll')
    this.$store.dispatch('Routes/getRouteStatuses')
    this.loading = false
  },
  methods: {
    edit (item) {
      this.editedIndex = this.routes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async save () {
      try {
        this.$refs.form.validate()
        if (this.valid) {
          this.saving = true
          if (this.editedIndex > -1) {
            await this.$store.dispatch('Routes/update', this.editedItem)
            this.$store.dispatch(
              'Alerts/showSuccess',
              `Маршрут ${this.editedItem.cityStart} - ${this.editedItem.cityEnd} обновлен`
            )
          } else {
            await this.$store.dispatch('Routes/create', this.editedItem)
            this.$store.dispatch('Alerts/showSuccess',
              `Маршрут ${this.editedItem.cityStart} - ${this.editedItem.cityEnd} создан`)
          }
          this.close()
        }
      } catch (e) {
        this.$store.dispatch('Alerts/showError', e.response.data.message)
      }
      this.saving = false
    },
    async remove (route) {
      this.loading = true
      try {
        await this.$store.dispatch('Routes/delete', route)
        this.$store.dispatch('Alerts/showSuccess',
          `Маршрут ${route.cityStart} - ${route.cityEnd} удален`)
      } catch (e) {
        this.$store.dispatch('Alerts/showError', e.response.data.message)
      }
      this.loading = false
    }
  }
}
</script>
