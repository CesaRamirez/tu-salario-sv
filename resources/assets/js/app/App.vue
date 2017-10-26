<template>
<v-app dark>
  <navigation></navigation>
  <main>
    <notification></notification>
    <v-content>
      <router-view></router-view>
    </v-content>
  </main>
</v-app>
</template>

<script>
import {
  mapGetters,
  mapActions
}
from 'vuex'
import notification from './Notification'

export default {
  components: {
    notification
  },
  computed: mapGetters({
    user: 'auth/user'
  }),
}
</script>
