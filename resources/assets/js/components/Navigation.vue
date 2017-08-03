<template>
    <div>
        <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light >
          <v-list class="pa-0">
            <v-list-item>
              <v-list-tile avatar tag="div">
                <v-list-tile-content>
                  <v-list-tile-title v-if="user.authenticated">
                      {{ user.data.user.name }}
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon dark @click.native.stop="mini = !mini">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-item>
          </v-list>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-item v-for="item in items" :key="item">
                  <v-list-tile ripple :to="{ name: item.to }" router v-show="check(item.guard)">
                    <v-list-tile-action>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ item.title }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    <v-toolbar class="blue darken-2" light>
       <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
       <v-toolbar-title>García Flamenco</v-toolbar-title>
       <v-toolbar-items light>
        <v-toolbar-item v-if="user.authenticated">
            {{ user.data.user.name }}
        </v-toolbar-item>
        <v-toolbar-item @click.prevent.native="signout">
              <v-icon light>exit_to_app</v-icon>
        </v-toolbar-item>
      </v-toolbar-items>
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
              { title: 'Inicio', icon: 'dashboard', to: 'home', guard: 'all' },
              { title: 'Encuestas', icon: 'question_answer', to: 'polls', guard: 'administrador' },
              { title: 'Notificaciones', icon: 'notifications', to: 'notifications', guard: 'all' },
              { title: 'Usuarios', icon: 'recent_actors', to: 'users', guard: 'administrador' }
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
            },
            check(guard) {
                let role_user = this.user.role
                switch (guard) {
                    case 'all':
                        return true
                        break;
                    case 'administrador':
                        if ( role_user != 'administrador') {
                            return false
                        }
                        return true
                        break;
                    default:
                        return false
                }
            }
        }
    }
</script>
