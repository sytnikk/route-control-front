<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>Управление маршрутами</h1>
        <v-expansion-panels
          v-model="panels"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h2>Маршруты</h2>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Routes/>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <h2>Автомобили</h2>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Cars/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <Alerts/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Cars from './components/cars/Cars'
import Routes from './components/routes/Routes'
import Alerts from './components/Alerts'

export default {
  name: 'App',

  components: {
    Routes,
    Cars,
    Alerts
  },

  data: () => ({
    panels: [0, 1]
  })
}
</script>
