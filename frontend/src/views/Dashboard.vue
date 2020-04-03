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
						v-col(v-for='page in pages' :key='pages.indexOf(page)' xs='4' v-if='page.condition')
							v-card.elevation-6(hover height="300" link :to='page.link')
								v-container(fill-height fluid)
									v-col(cols='12')
										v-row(justify='center' align='center')
											v-card-text(v-if="isMobile"  style="text-align: center") {{ page.name }}
											v-card-title(v-else ) {{ page.name }}
											v-icon(x-large :right='!isMobile') {{ page.icon }}
										v-row(justify='center')
											v-card-subtitle(v-if='!isMobile') {{ page.text }}
	
</template>

<script>
export default {
	name: 'Dashbaord',
	data() {
		return {
			pages:[
				{
					name: 'Inventar',
					text: 'Einsicht auf ausgeliehenes Material. Rückgaben machen',
					icon: 'mdi-warehouse',
					link: '/inventory',
					color: 'yellow darken-4',
					condition: true
				},
				{
					name: 'Ausleihungen',
					text: 'Einsicht auf ausgeliehenes Material. Rückgaben machen',
					icon: 'mdi-bookshelf',
					link: '/Lendings',
					color: 'purple darken-2',
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
