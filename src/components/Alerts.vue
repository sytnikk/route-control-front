<template>
  <div class="alerts">
    <transition-group name="list" tag="p">
      <v-alert
        v-for="(alert, index) in alerts"
        :key="index"
        :type="alert.type"
        class="alerts__item"
        dense
        dismissible
      >
        {{alert.message}}
      </v-alert>
    </transition-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Alerts',
  computed: {
    ...mapGetters({
      alerts: 'Alerts/alerts'
    })
  }
}
</script>
<style lang="scss">
.alerts {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;

  &__item {
    margin: 10px auto;
    max-width: 600px;
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
