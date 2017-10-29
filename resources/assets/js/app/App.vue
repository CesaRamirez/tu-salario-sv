<template>

<v-app>
    <!-- <v-tabs class="h100" dark fixed centered v-if="this.$route.name == 'browse-rent'">
        <navigation></navigation>
        <notification></notification>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-tabs> -->
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
