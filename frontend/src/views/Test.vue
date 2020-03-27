<template lang='pug'>
	//- basic layout
	v-content()
		v-container(fill-height)
			v-row( justify='center' wrap align='center')
				v-col( cols='12' md='12' sm='12' )
				
					v-card.elevation-3()
						v-data-table.clickable(
							@click:row="openDialog" 
							:search="search"
							:custom-filter='filter'
							:items-per-page='999'
							item-key='PK_itemsClass_ID'
							:expanded.sync="expanded" 
							show-expand 
							:loading='loading' 
							:items='items'
							:headers='headers'
						)
							
							template(v-slot:top)
								v-col( md="12" lg="12" sm="12" xs='12' ) 
									v-text-field( solo v-model="search" label='Search' append-icon="mdi-layers-search-outline" )
									v-card-text {{ item }}
							template(v-slot:item.amount='{ item}')
								td {{ item.items.filter(i => !i.user).length }}
							template(v-slot:item.totalAmount='{ item}')
								td {{ item.items.length }}
					v-dialog(v-model="!!this.$route.params.query" lg='8' md='8' flat max-width="1400" persistent  )
						v-card.mx-auto.elevation-18(  )
							//- v-card-title {{ item }}
							v-data-table(
								:loading='loading'
								:search="search"
								item-key='PK_items_ID'
								:items-per-page=1000
								class="elevation-0" 
								:items='item' 
								:headers='subheaders' 
								v-model="selectedItems" 
								) 
								//- template(v-slot:top='props') 
									v-card-title {{ item.itemsClassName }} 
								template(v-slot:header.data-table-select='item')
								template(
									v-slot:item.action='{ item }' 
									v-if='isTeacher'
								)
									v-tooltip(left) Material loeschen
										template(v-slot:activator='{ on }')
											v-btn( v-on='on' @click="deleteItem( item )" icon)
												v-icon mdi-delete
									v-tooltip(right) Material ausleihen
										template(v-slot:activator='{ on }')
											v-btn(icon v-on='on' @click="lendItems(item)" :disabled='item.user')
												v-icon mdi-book-plus
								template(v-slot:item.data-table-select='{ isSelected, select, item }') 
									v-simple-checkbox( :disabled='!!item.lentTo' :value="isSelected" )
								template( v-slot:item.serialnumber="{ item }" v-if='isTeacher')
									v-edit-dialog(@save='changeItem(item)') {{ item.serialnumber}}
										template(v-slot:input)
											v-text-field(counter label='edit' v-model='item.serialnumber') 
								template(v-if='item.location' v-slot:item.location.locationsName="{ item }")
									v-edit-dialog(@save='changeItem(item)') {{ item.location.locationsName}}
										template(v-slot:input)
											v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' color="primary" v-model="item.location.FK_locations_ID" :items="locations" item-value='PK_locations_ID' item-text='locationsName' label="Standort" )
							v-card-actions
								v-btn(color="primary" @click="closeDialog" ) close
</template>

<script>
import axios from "@/api";
import { loadLocations, loadItems } from '../middleware'
import router from '../router'
export default {
	name: 'Inventory',
	data() {
		return {
			dialog: true,
			query: this.$route.params.query,
			item: [{
				types: {},
				manufacturers: {},
				location: {
					locationsName: ''
				}

			}],
			expanded: [],
			selectedItems: [],
			items: [],
			headers: [
				{ text: "ID", value: "PK_itemsClass_ID" },
				{ text: "Name", value: "itemsClassName" },
				{ text: 'Typ', value: 'types.typesName'},
				{ text: 'Hersteller', value: 'manufacturers.manufacturersName'},
				{ text: 'Beschreibung', value: 'description'},
				{ text: 'Verfügbare Menge', value: 'amount'},
				{ text: 'Totale Menge', value: 'totalAmount'},
				{ text: "", value: "data-table-expand" }
			],
			subheaders: [
				{ text: "ID", value: "PK_items_ID" },
				{ text: "Serialnumber", value: "serialnumber" },
				{ text: "Ablageort", value: "location.locationsName" },
				{ text: 'Ausgeliehen von', value: 'user.fullname'},
				{ text: 'Aktion', value: 'action'},
			],
			search: "",
			loading: true,
			locations: ['kek'],
		};
	},
	computed: {
		isTeacher: function () {return this.$store.getters.isTeacher},
		loggedIn: function() {return this.$store.state.loggedIn},
		user: function() {return this.$store.state.user},
	},
	async mounted() {
		this.loadItems()
		this.loadLocations()

		// if(this.$route.params.query) {
		var kek = await this.getData();
		this.item = kek
		// }

		
	},

	watch: {
		'$route.params.query': async function() {
				
			this.item = await this.getData()
		},
	},
	methods: {
		filter(value, search, item) {
			

			function findInObject(items) {
				// console.log(Object.values(items));
				var result = false;
				Object.values(items).forEach(el => {
					if (el === null) {
						return false
					}
					if (typeof el === 'string' || el === 'number') {
						if (el.toUpperCase().includes(search.toUpperCase())) {
							result = true;
						}
					} else {
						if (findInObject(el)) {
							result = true
						}
					}
				});
				return result

			}

			return findInObject(item)
			
			
			
			// return value != null &&
			// 	search != null &&
			// 	value.toString().toLocaleLowerCase().indexOf(search) !== -1
			
		},
		async getData() {
			console.log(this.$route);
			
			let result = await axios().post('graphql', {
				query: `
					query {
						items(FK_itemsClass_IDLike: ${this.$route.params.query}) {
							itemClass{
							itemsClassName
							}
							PK_items_ID
							uuid
							serialnumber
							lentTo
							location {
								locationsName
							}
							user{
								fullname
							}
						}
					}`
			});
			return result.data.data.items
		},
		async closeDialog() {
			router.push({params: {query: null}})
		},
		async openDialog(item) {
			router.push({params: {query: item.PK_itemsClass_ID}})

			
			
		},

		async loadLocations() {
			let response = await loadLocations();
			this.locations = response.locations;
		},
		async loadItems() {
			let data = await loadItems()
			this.items = [];
			this.items = data.filter(el => el.items.length>0)
			this.loading = false
		},
		async deleteItem(item){
			if(confirm('sind sie sicher?')) {
				try {
					await axios().delete('/teacher/inventory/'+ item.PK_items_ID);
					this.loadItems();
					this.dialog = false;
					this.selectedItems = '';
				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
			}
		},
		async changeItem(item) {
			if(confirm('sind sie sicher?')) {
				try {
					await axios().put('/teacher/inventory/'+ item.PK_items_ID, item)
				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
				this.loadItems()
			}
		},
		async lendItems(item) {
			/** forms the data to:
			 * [
			 * 	PK_items_ID,
			 * ]
			 */
			// reformat data
			var idList = [item.PK_items_ID]
			
			try {
				// html request
				await axios().post('/student/lendings/', idList )
				// send message
				this.$emit("message", { 
					type: "success", 
					text: 'Material ausgeliehen', 
					timeout: 1000
				});
			} catch (error) {
				console.error(error);
				this.$emit("message", { 
					type: "error",
					text: error.message,
					timeout: 0 
				});
			}
			this.selectedItems = [];
			router.push({params: {query: null}})
			this.loadItems()
		},
	}
}
</script>

<style>

.clickable .v-data-table__wrapper tbody{
	cursor: pointer!important
}
</style>