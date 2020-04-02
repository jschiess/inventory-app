<template lang='pug'>
		v-sheet( tile :color="(darkTheme) ? 'secondary': 'primary'" class="fill-height" )
			v-container
				v-content
					v-row()
						v-col(cols='12')
							v-card(tile  )
								v-container
									v-row(
										align="center"
									)
										v-col( cols="4" sm="2" md="1")
											v-avatar(size="60" )
												v-img(contain src="https://picsum.photos/200/200", alt="alt" name="image")
										v-card-title Willkommen {{ user.username }}
					v-row(align='end')
						v-col(v-for='page in pages' xs='4' v-if='page.condition')
							v-card.elevation-6(hover height="300" link :to='page.link')
								//- v-img( contain :src="'https://picsum.photos/300/500?blur?random='+n", alt="alt")
								v-container(fill-height fluid)
									v-col(cols='12')
										v-row(justify='center' align='center')
											v-card-text(v-if="isMobile"  style="text-align: center") {{ page.name }}
											v-card-title(v-else ) {{ page.name }}
											v-icon(x-large :right='!isMobile') {{ page.icon }}
										v-row(justify='center')
											v-card-subtitle(v-if='!isMobile') {{ page.text }}
			//- v-row(justify='center' align='center')
				v-card(flat tile)
					v-card-text
						v-row(md='12')
							v-card(md='12' tile flat )
								v-row
									v-col(cols='12')
										v-avatar( class="ma-6" size="280" tile)
											v-img(v-if='!darkTheme' contain height="auto"  :src="require('../assets/tflogo.jpg')")
											v-img(v-else contain height="auto"  :src="require('../assets/tflogoDarkTheme.jpg')")
									v-card-title(color="lighten-2" )
										h1.grey--text Hallo {{ user.username }}
						v-divider
						v-row
							v-col
								v-card.white--text.py-12(link to='/inventory' color="purple darken-2" shaped hover)
									v-card-title 
										v-icon(left x-large dark) mdi-warehouse
										h1 Lager
									v-spacer
									v-card-subtitle.white--text(v-if='isTeacher') Einsicht auf alle Items. Materialen bearbeiten, löschen, Ausleihungen machen
									v-card-subtitle.white--text(v-else) Einsicht auf alle Items
							v-col(v-if='user.role == "teacher"')
								v-card.white--text.py-12( link to='/newMaterial' color="green darken-2" shaped hover )
									v-card-title 
										v-icon(left x-large dark) mdi-tray-full
										h1 Erfassen
									v-spacer
									v-card-text.white--text Material oder klassen erfassen
							v-col
								v-card.white--text.py-12(link to="/Lendings" color="yellow darken-4 " shaped hohover)
									v-card-title
										v-icon(left x-large dark) mdi-bookshelf
										h1 Ausleihliste
									v-spacer
									v-card-text.white--text Einsicht auf ausgeliehenes Material. Rückgaben machen
</template>

<script>
export default {
	name: 'Dashbaord',
	data() {
		return {
			pages:[
				{
					name: 'Ausleihungen',
					text: 'Einsicht auf ausgeliehenes Material. Rückgaben machen',
					icon: 'mdi-bookshelf',
					link: '/inventory',
					color: 'purple darken-2',
					condition: true
				},
				{
					name: 'Inventar',
					text: 'Einsicht auf ausgeliehenes Material. Rückgaben machen',
					icon: 'mdi-warehouse',
					link: '/Lendings',
					color: 'yellow darken-4',
					condition: true
				},
				{
					name: 'Material Erfassen',
					text: 'Material oder klassen erfassen',
					icon: 'mdi-tray-full',
					link: '/newMaterial',
					color: 'yellow darken-4',
					condition: () => this.isTeacher
				},
			]
		}
	},
	computed: {
		isMobile() {return this.$vuetify.breakpoint.xs},
		loggedIn() {return this.$store.state.loggedIn},
		user() {return this.$store.state.user},
		isTeacher() {return this.$store.state.isTeacher},
		darkTheme() {return this.$store.state.darkTheme}
	},
}
</script>
