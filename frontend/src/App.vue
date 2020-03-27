<template lang='pug'>
	v-app(dark)
		MainMenu(v-on:logout='logout' v-if='loggedIn')
		confirm(ref="confirm")
		v-content()
			router-view( v-on:message="message")
		v-snackbar( 
			top 
			v-for="snack in snacks" 
			:key='snacks.indexOf(snack)' 
			v-model="snacks" 
			:timeout='snack.timeout' 
			:color='snack.type' 
		) {{ snack.text }}
			v-btn( @click="snacks.splice(snacks.indexOf(n)), 1" dark text) close
</template>

<script>

import MainMenu from './components/Menu.vue'
import Confirm from './components/Confirm'
export default {
	name: "Home",
	components: {
		MainMenu,
		Confirm
	},
	data() {
		return {
			snacks: [],
		};
	},
	mounted() {this.$root.$confirm = this.$refs.confirm.open},
	computed: { 
		// checks if the user is logged in or not
		loggedIn: function() {return this.$store.state.loggedIn},
		// gets global user information username, role etc..
		user: function() {return this.$store.state.user},
	},
	methods: {
		message(message) {
			this.snacks = (!this.snacks) ? [] : this.snacks
			this.snacks.push(message);
		},
		logout() {
			this.$store.dispatch('clearData')
			this.message({
				type: "success",
				text: "logged out",
				timeout: 2000
			});
			this.$router.push("/login");

		}
	}
};
</script> 
<style>

*{
	font: 'Roboto 18pt'

}
</style>