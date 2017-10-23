<template>

<v-app dark>
    <navigation></navigation>
    <main>
        <v-content>
            <notification></notification>
            <v-container fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>
    </main>
</v-app>

</template>

<script>

import {
    mapGetters, mapActions
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
