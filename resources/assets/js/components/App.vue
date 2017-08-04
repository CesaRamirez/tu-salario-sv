<template>
    <v-app dark>
        <navigation></navigation>
        <main>
            <v-container>
                <router-view></router-view>
            </v-container>
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
