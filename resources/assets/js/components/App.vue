<template>
    <v-app dark>
        <navigation></navigation>
        <main>
            <router-view></router-view>
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
