<template lang="html">
        <v-layout align-center justify-center style="height: 100vh">
            <v-flex xs12 md4>
                <v-card>
                    <v-card-title class="blue darken-4">
                        <span class="white--text headline">Iniciar Sesión</span>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <form @submit.prevent="submit">
                        <v-card-text>
                            <v-text-field label="Correo Electronico"
                                          v-model="email"
                                          @keyup.native="cleanFields('email')"
                                          :errors="errors.email"
                                          prepend-icon="mail">
                            </v-text-field>
                            <v-text-field label="Contraseña"
                                          v-model="password"
                                          @keyup.native="cleanFields('password')"
                                          :errors="errors.password"
                                          type="password"
                                          prepend-icon="vpn_key">
                            </v-text-field>
                       </v-card-text>
                       <v-card-actions>
                           <v-btn type="submit" flat>
                               Iniciar
                               <v-icon right >cloud_upload</v-icon>
                           </v-btn>
                       </v-card-actions>
                       <v-snackbar
                       :timeout="10000"
                       error
                       multi-line
                       v-model="errors.root">
                       Credenciales Invalidas
                     </v-snackbar>
                   </form>
               </v-card>
           </v-flex>
       </v-layout>
</template>

<script>
import {
    mapActions
} from 'vuex'
import localforage from 'localforage'
import {
    isEmpty
} from 'lodash'

export default {
    data() {
        return {
            email: null,
            password: null,
            errors: [],
            snackbar: false
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        submit() {
            this.login({
                payload: {
                    email: this.email,
                    password: this.password
                },
                context: this
            }).then(() => {
                localforage.getItem('intended').then((name) => {
                    if (isEmpty(name)) {
                        this.$router.replace({
                            name: 'home'
                        })
                        return
                    }
                    this.$router.replace({
                        name: name
                    })
                })
            }).catch((err) => {})
        },
        cleanFields(field) {
            return this.errors[field] = []
        }
    }
}
</script>
<style lang="css" scoped>
.login-card {
    max-width: 400px;
    position: absolute !important;
    margin: auto !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
