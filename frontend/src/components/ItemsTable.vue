<template lang='pug'>
	v-card.mx-auto.elevation-18(tile)
		v-data-table(
			dense
			:loading='loading'
			item-key='PK_items_ID'
			:items='items'
			:headers='subheaders'
			hide-default-footer
			:page.sync="page"
			@page-count="pageCount = $event"
		)
			template(v-slot:top="props")
				v-app-bar(color="primary" dark :fixed='isMobile' mb-4)
					v-card-title {{ itemsClassName }}
					v-spacer
					v-btn(rounded @click="$emit('closeDialog')" icon )
						v-icon mdi-close
				v-expansion-panels()
					v-expansion-panel(dense v-for="(item, i) in 1" :key="i")
						v-expansion-panel-header
							h2 Filters
						v-expansion-panel-content
							v-row(wrap align='center')
								v-col(cols='12' xs='12' md='2')
									v-autocomplete(
										v-model="filteredserialnumber"
										:items="serialnumbers"
										prepend-icon="mdi-card-account-details"
										label='Serialnumber'
									)
								v-col(cols='12' xs='12' md='2')
									v-autocomplete(
										v-model="filteredLocations"
										:items="locations"
										item-value='PK_locations_ID'
										item-text='locationsName'
										prepend-icon="mdi-office-building"
										label='Ablageort'
									)
								v-col(cols='12' xs='12' md='2')
									v-autocomplete(
										v-model="filteredUsers"
										:items="users"
										prepend-icon="mdi-file-send" 
										label='Ausgeliehen von'
										item-value="PK_users_ID"
										item-text="fullname"
									)
								v-col
									v-tooltip(right ) 
										div clear Filter
										template( v-slot:activator="{ on }" )
											v-btn(:icon='!$vuetify.breakpoint.xs' rounded color="warning"  v-on="on" @click="clearFilter") 
												v-icon mdi-filter-outline
			template(v-slot:item.action='{ item }')
				v-tooltip(left v-if='isTeacher') Material loeschen
					template(v-slot:activator='{ on }')
						v-btn( v-on='on' @click="$emit('deleteItem', item)" icon)
							v-icon mdi-delete
				v-tooltip(right) Material ausleihen
					template(v-slot:activator='{ on }')
						v-btn(icon v-on='on' @click="$emit('lendItem', item)" :disabled='!!item.user')
							v-icon mdi-book-plus
			template(v-slot:item.data-table-select='{ isSelected, select, item }') 
				v-simple-checkbox( :disabled='!!item.lentTo' :value="isSelected" )
			template(v-slot:item.serialnumber="{ item }" v-if='isTeacher')
				v-edit-dialog(
					large
					@save="changeSerialnumber(item)" ) {{ item.serialnumber }}
					template(v-slot:input)
						v-text-field(counter label='edit' v-model='item.serialnumber') 
			template(v-slot:item.location.locationsName="{ item }" v-if='isTeacher')
				v-edit-dialog(
					large 
					@save="changeLocation(item)" 
					@cancel="item.location.FK_locations_ID = 0"
				) 
					div {{ item.location.locationsName }}
					template(v-slot:input)
						v-autocomplete(
							color="primary"
							v-model="item.location.PK_locations_ID"
							:items="locations"
							item-value='PK_locations_ID'
							item-text='locationsName'
							label="Standort"
						)
		v-card-text
			v-container
				v-pagination( v-model="page" :length="totalEntries")

</template>


<script>
// import router from '../router'
import { loadLocations, loadUsers } from '../middleware'
import axios from '../api'
export default {
	name: 'ItemsTable',
	props: ['items','itemsClassName'],
	data() {
		return {
			serialnumbers: [],
			totalEntries: 0,
			item: [],
			subheaders: [
				{ text: "ID", value: "PK_items_ID" },
				{ text: "Serialnumber", value: "serialnumber" },
				{ text: "Ablageort", value: "location.locationsName" },
				{ text: 'Ausgeliehen von', value: 'user.fullname'},
				{ text: 'Action', value: 'action'},
			],
			locations: [],
			users: [],
		};
	},
	computed: {
		isMobile: function() {return this.$vuetify.breakpoint.xs},
		serialNumbers: function () { return this.items.map(el => el.serialnumber)},
		loading: function () {return !this.items.length},
		isTeacher: function () {return this.$store.getters.isTeacher},
		filteredLocations: {
			get: function () {return this.$route.query.location},
			set: function (location) {
				// eslint-disable-next-line
				this.$router.replace({ query: { ...this.$route.query, location: location }})
			}
		},

		filteredserialnumber: {
			get: function() {return this.$route.query.serialnumber},
			set: function(serialnumber) {
				this.$router.replace({query: {...this.$route.query, serialnumber: serialnumber}})
			}
		},
		filteredUsers: {
			get: function() {return this.$route.query.user},
			set: function(user) {
				this.$router.replace({query: {...this.$route.query, user: user}})
			}
		},
		page: {
			get: function () {return parseInt(this.$route.query.page)},
			set: function(pageNumber) {
				// eslint-disable-next-line
				this.$router.replace({ query: {...this.$route.query, page: pageNumber } }).catch(err => {})
			}
		}
	},
	async mounted() {
		this.loadLocations()
		this.getTotal()
		this.loadSerialnumber()
		this.loadUsers()
	},
	watch: {
		'$route.query.location': async function() {
			await this.getTotal()
		},
		'$route.query.user': async function() {
			await this.getTotal()
		},
		'$route.query.serialnumber': async function() {
			await this.getTotal()
		},
	},
	methods: {
		async clearFilter() {
			// eslint-disable-next-line
			this.$router.replace({query: {}}).catch(err => {})
			await this.getTotal()
		},
		// function to determin the maximal number of items with filtering and without
		async getTotal() {
			this.page = 1;
			let items = await axios().post('graphql', {
				query: `
					query {
						items(
								${(this.$route.query.location)? 'FK_locations_IDEq:' + parseInt(this.$route.query.location) +',' : ''} 
								${(this.$route.query.user)? 'lentToEq:' + parseInt(this.$route.query.user) +',' : ''} 
								${(this.$route.query.serialnumber)? 'serialnumberEq:' + '"'+ this.$route.query.serialnumber +'"' + ',' : ''} 
								FK_itemsClass_IDLike: ${this.$route.params.itemsClass},
								offset: ${(parseInt(this.$route.query.page) - 1) * 10}
							){
							PK_items_ID
						}
					}`
			});
			

			this.totalEntries = Math.floor(items.data.data.items.length/10)+1

		},
		async changeSerialnumber(item) {
			let data = {
				id: item.PK_items_ID,
				field: 'serialnumber',
				value: item.serialnumber
			}
			this.$emit('changeItem', data)
		}, 
		async changeLocation(item) {
			let data = {
				id: item.PK_items_ID,
				field: 'FK_locations_ID',
				value: item.location.PK_locations_ID
			}
			this.$emit('changeItem', data)
		},
		async loadSerialnumber() {
			let serialnumbers = await axios().post('graphql', {query: `query {items{serialnumber}}`});

			this.serialnumbers = serialnumbers.data.data.items.map(el => el.serialnumber)
		},
		async loadUsers() {this.users = await loadUsers();},
		async loadLocations() {this.locations = await loadLocations();},
	}
}
</script>

<style>


</style>