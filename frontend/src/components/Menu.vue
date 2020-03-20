<template lang='pug'>
	div
		v-navigation-drawer.text--white( v-model="drawer" app temporary  )
			v-list(  )
				v-list-item(link @click="drawer = !drawer"  )
					v-list-item-action()
						v-icon(large ) mdi-menu
					v-list-item-content 
						v-list-item-title Logged in as {{user.username }} 
				v-divider
				v-list-item(link to="/" )
					v-list-item-action()
						v-icon(large ) mdi-view-dashboard-outline
					v-list-item-content 
						v-list-item-title Startseite
				v-list-item(link to="/inventory" )
					v-list-item-action()
						v-icon( large ) mdi-warehouse
					v-list-item-content 
						v-list-item-title Lager
				v-list-item(link to="/lendings" )
					v-list-item-action()
						v-icon(large ) mdi-bookshelf
					v-list-item-content 
						v-list-item-title Ausleihliste
				v-list-item(link to="/newMaterial" v-if='isTeacher')
					v-list-item-action()
						v-icon(large ) mdi-tray-full
					v-list-item-content 
						v-list-item-title Material erfassen
			template(v-slot:append)
				v-divider
				v-list( subheader align-baseline )
					v-list-item
						v-list-item-action(@click="logout")
							v-icon mdi-logout
						v-list-item-content
							v-list-item-title Logout
						v-list-item-action()
							v-btn(icon @click="toggleDarkTheme")
								v-icon mdi-weather-sunny
		v-app-bar(color="primary darken-1" dark app clipped-left)
			v-app-bar-nav-icon(@click="drawer = !drawer")
			span Logged in as {{ user.username }}
			v-spacer
			v-btn(@click="logout" text) logout
				v-icon(right) mdi-logout
</template>
<script>

export default {
	name: "MainMenu",
	data() {
		return {
			drawer: false
		}
	},
	computed: {
		loggedIn() {return this.$store.state.loggedIn},
		user() {return this.$store.state.user},
		isTeacher() {return this.$store.getters.isTeacher},
		darkTheme() {return this.$store.state.darkTheme}
	},
	methods: {
		toggleDarkTheme() {this.$vuetify.theme.dark = !this.$vuetify.theme.dark ;this.$store.dispatch('toggleDarkTheme')},
		logout() {this.$emit('logout')},
	}
};
</script> 
