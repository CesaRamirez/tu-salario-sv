<template>
<v-app id="main">
	<v-card flat height="100vh">
		<navigation-component></navigation-component>
		<notification-component></notification-component>
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
	mapGetters
}
from 'vuex'
import NotificationComponent from './NotificationComponent'

export default {
	components: {
		NotificationComponent
	},
	computed: mapGetters({
		user: 'auth/user'
	}),
}
</script>
