<template lang="html">
  <div>
    <v-container>
      <v-layout align-content-start>
        Home
      </v-layout>
    </v-container>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: mapGetters({
            user: 'auth/user'
        }),
    }
</script>
