<template>
    <v-app dark>
      <navigation></navigation>
      <main>
        <v-content>
          <v-container>
              <router-view></router-view>
          </v-container>
        </v-content>
      </main>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: mapGetters({
            user: 'auth/user'
        }),
    }
    </script>
