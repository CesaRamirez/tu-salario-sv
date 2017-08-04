<template>
    <div v-if="user.authenticated">
        <v-navigation-drawer temporary
          v-model="drawer"
          :mini-variant.sync="mini"
          dark
          overflow
          absolute>
            <v-list class="pa-0">
                <v-list-tile avatar tag="div">
                  <v-list-tile-avatar>
                    <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ user.data.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon dark @click.native.stop="mini = !mini">
                      <v-icon>chevron_left</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
             </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-navigation-drawer>
        <v-toolbar dark fixed>
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">Tu Salario SV</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="user.authenticated" flat>
                {{ user.data.name }}
            </v-btn>
            <v-btn icon @click.prevent.native="signout">
                <v-icon light>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
         return {
           drawer: null,
           items: [
             { title: 'Home', icon: 'dashboard' },
             { title: 'About', icon: 'question_answer' }
           ],
           mini: false,
           right: null
         }
       },
        computed: mapGetters({
            user: 'auth/user'
        }),
        methods: {
            ...mapActions({
                logout: 'auth/logout'
            }),
            signout () {
                this.logout().then( () => {
                    this.$router.replace({ name: 'login' })
                })
            }
        }
    }
</script>
