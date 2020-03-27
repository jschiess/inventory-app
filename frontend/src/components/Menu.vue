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
						v-list-item-action(@click="logout" )
							v-tooltip(top) Ausloggen
								template( v-slot:activator='{on}' )
									
									v-btn(icon v-on='on')
										v-icon mdi-logout
						v-list-item-content
							v-list-item-title Logout
						v-list-item-action()
							v-tooltip(right) {{ !$vuetify.theme.dark ? 'Dunkel Modus': 'Hell Modus' }}
								template(v-slot:activator='{on}')
									v-btn(icon @click="toggleDarkTheme" v-on='on')
										v-icon mdi-weather-sunny
		v-app-bar(color="primary darken-1" dark app clipped-left)
			v-app-bar-nav-icon(@click="drawer = !drawer")
			span Logged in as {{ user.username }}
			v-spacer
			v-tooltip(left) Ausloggen
				template( v-slot:activator='{on}' )
					v-btn(large @click="logout" icon v-on='on')
						v-icon() mdi-logout
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
