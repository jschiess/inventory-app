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
							:custom-filter='customFilter'
							:items-per-page='999'
							item-key='PK_itemsClass_ID'
							:loading='loading' 
							:items='items'
							:headers='headers'
						)
							template(v-slot:top)
								v-col( md="12" lg="12" sm="12" xs='12' ) 
									v-text-field( solo v-model="search" label='Search' append-icon="mdi-layers-search-outline" )
									
							template(v-slot:item.amount='{ item}')
								td {{ item.items.filter(i => !i.user).length }}
							template(v-slot:item.totalAmount='{ item}')
								td {{ item.items.length }}
					v-dialog(v-model="!!this.$route.params.query" lg='8' md='8' flat max-width="1400" persistent  )
						ItemsTable( :item='itemList' v-on:closeDialog='closeDialog' v-on:changeItem='changeItem' v-on:deleteItem='deleteItem' v-on:lendItem='lendItem')
</template>

<script>
import axios from "@/api";
import { loadLocations, loadItems, customFilter } from '../middleware'
import router from '../router'
import ItemsTable from '../components/ItemsTable.vue'

export default {
	name: 'Inventory',
	components: {ItemsTable},
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
			search: "",
			loading: true,
			locations: ['kek'],
		};
	},
	computed: {
		isTeacher: function () {return this.$store.getters.isTeacher},
		loggedIn: function() {return this.$store.state.loggedIn},
		itemList: function () {return this.item}
	},
	async mounted() {
		// load initial items 
		this.loadItems()
		this.loadLocations()

		if(this.$route.params.query) {
			this.item = await this.getData();
		}

		
	},
	// watches url for changes
	watch: {
		'$route.params.query': async function() {
			console.log('kek');
			
			this.item = await this.getData()
			console.log(this.item);
			
		},
	},
	methods: {
		customFilter: () => customFilter,
		async getData() {
			try {
				const result = await axios().post('graphql', {
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
				console.log(result.data.data.items);
				
				return result.data.data.items
				
			} catch (error) {
				console.error(error);
			}
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
			if (await this.$root.$confirm('Delete', 'Are you sure?', { color: 'red' })) {
				try {
					await axios().delete('/teacher/inventory/'+ item.PK_items_ID);
					this.loadItems();
					this.item = await this.getData();
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
		async lendItem(item) {
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

				this.item = await this.getData();

			} catch (error) {
				console.error(error);
				this.$emit("message", { 
					type: "error",
					text: error.message,
					timeout: 0 
				});
			}
			// this.selectedItems = [];
			// router.push({params: {query: null}})
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