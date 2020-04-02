<template lang='pug'>
	v-app()
		MainMenu(v-on:logout='logout' v-if=' loggedIn')
		confirm(ref="confirm")
		v-content()
			router-view
		snack(ref='snack')

</template>

<script>
import snack from './components/Snackbar'
import Confirm from './components/Confirm'
import MainMenu from './components/Menu.vue'

export default {
	name: "Home",
	components: {
		MainMenu,
		Confirm,
		snack
	},
	data() {
		return {
			
		};
	},
	created() {  
		/**
		 * with the persisted state the store is stored in the localstorage of the browser.
		 * the snackbar is also stored there and will display the last message if not cleared on creation
		 */
		this.$store.state.snack = []

	},
	mounted() {
		this.$root.$snack = this.$refs.snack.open
		this.$root.$confirm = this.$refs.confirm.open

	},
	computed: { 
		loggedIn: function() {return this.$store.state.loggedIn},
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
		}
	}
};
</script> 
<style>
*{
	font: 'Roboto 18pt'
}
</style>