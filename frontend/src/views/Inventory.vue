<template lang='pug'>
	//- basic layout
	v-content()
		v-container(fill-height)
			v-row( justify='center' wrap align='center')
				v-col( cols='12' md='12' sm='12' )
					v-card.elevation-3()
						v-data-table( 
							:search="search"
							:items-per-page='999'
							item-key='PK_itemsClass_ID'
							:expanded.sync="expanded" 
							show-expand 
							:loading='loading' 
							:items='items'
							:headers='headers'
						)
							template(v-slot:item.amount='{ item}')
								td {{ item.items.filter(i => !i.user).length }}
							template(v-slot:item.totalAmount='{ item}')
								td {{ item.items.length }}
							template( v-slot:expanded-item="{ headers, item }" )
								td(  style="padding:5px 10px;" :colspan='headers.length' )
									v-data-table(
										dense 
										:search="search"
										show-select
										item-key='PK_items_ID'
										:items-per-page=1000
										class="elevation-0" 
										:items='item.items' 
										:headers='subheaders' 
										hide-default-footers
										v-model="selectedItems" 
										) 
										//- custom changes to defualt template
										template(v-slot:header.data-table-select='item')
										template(
											v-slot:item.action='{ item }' 
											v-if='isTeacher'
										) 
											v-btn.elevation-0( 
												@click="deleteItem( item )" 
												small 
												tile 
												color="red" 
												dark 
											) x
										template(v-slot:item.data-table-select='{  isSelected, select, item }') 
											v-simple-checkbox( :disabled='!!item.lentTo' :value="isSelected" @input="select($event)")
										template( v-slot:item.serialnumber="{ item }" v-if='isTeacher')
											v-edit-dialog(@save='changeItem(item)') {{ item.serialnumber}}
												template(v-slot:input)
													v-text-field(counter label='edit' v-model='item.serialnumber') 
										template( v-slot:item.locationsName="{ item }" v-if='isTeacher')
											v-edit-dialog(@save='changeItem(item)') {{ item.location.locationsName}}
												template(v-slot:input)
													v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' color="primary" v-model="item.location.FK_locations_ID" :items="locations" item-value='PK_locations_ID' item-text='locationsName' label="Standort" )
							template(v-slot:top)
								v-col( md="12" lg="12" sm="12" xs='12' )
									v-text-field( solo v-model="search" label='Search' append-icon="mdi-layers-search-outline" )
									v-btn( @click="lendItems" color="secondary" :disabled='!selectedItems.length' ) Ausleihen
</template>

<script>

import axios from "@/api";
import { loadLocations, loadItems } from '../middleware'

export default {
	name: 'Inventory',
	data() {
		return {
			expanded: [],
			selectedItems: [],
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
			locations: [],
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
	},
	methods: {
		async loadLocations() {
			let response = await loadLocations()
			this.locations = response.locations 
		},
		async loadItems() {
			let data = await loadItems()
			this.items = data.filter(el => el.items.length>0)
			this.loading = false
		},
		async deleteItem(item){
			if(confirm('sind sie sicher?')) {
				try {
					await axios().delete('/teacher/inventory/'+ item.PK_items_ID);
					this.loadItems();
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
		async lendItems() {
			/** forms the data to:
			 * [
			 * 	PK_items_ID,
			 * ]
			 */
			// reformat data
			var idList = this.selectedItems.map(item => item['PK_items_ID']) 
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
			this.loadItems()
		},
	}
}
</script>
