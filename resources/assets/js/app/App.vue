<template>
<v-app>
  <v-card flat height="100vh">
    <navigation></navigation>
    <notification></notification>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-card>
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
