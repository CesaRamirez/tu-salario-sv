<template>
<v-app>
	<v-card flat height="100vh">
		<navigation></navigation>
		<notification></notification>
		<v-content>
			<transition name="fade">
				<router-view></router-view>
			</transition>
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
	computed: mapGetters( {
		user: 'auth/user'
	} ),
}
</script>
