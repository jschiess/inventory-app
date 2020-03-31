<template lang='pug'>
	//- basic layout
	v-content()
		v-container(fill-height)
			v-row(
					justify='center'
					wrap
					align='center'
				)
				v-col(
						cols='12'
						md='12'
						sm='12'
					)
					v-card.elevation-3
						v-data-table.clickable(
							@click:row="openDialog" 
							:search="search"
							:custom-filter='customFilter'
							item-key='PK_itemsClass_ID'
							:loading='loading' 
							:items='itemClasses'
							:headers='headers'
						)
							template(v-slot:top)
								v-col(
									md="12"
									lg="12"
									sm="12"
									xs='12'
								) 
									v-text-field(
										solo
										v-model="search"
										label='Search'
										append-icon="mdi-layers-search-outline"
									)
							template(v-slot:item.amount='{item}')
								td {{ item.items.filter(i => !i.user).length }}
							template(v-slot:item.totalAmount='{item}')
								td {{ item.items.length }}
					v-dialog(
						v-model="!!this.$route.params.itemsClass"
						lg='8'
						md='8'
						flat
						max-width="1400"
						persistent
					)
						ItemsTable(
							:items='itemsList'
							v-on:closeDialog='closeDialog'
							v-on:changeItem='changeItem'
							v-on:deleteItem='deleteItem'
							v-on:lendItem='lendItem'
							v-on:loadItems='loadItems'
						)
</template>

<script>
import axios from "@/api";
import { loadItems } from '../middleware'
import router from '../router'
import ItemsTable from '../components/ItemsTable.vue'

export default {
	name: 'Inventory',
	components: {ItemsTable},
	data() {
		return {
			dialog: true,
			itemsClass: this.$route.params.itemsClass,
			items: [{
				types: {},
				manufacturers: {},
				location: {
					locationsName: ''
				}
			}],
			expanded: [],
			selectedItems: [],
			itemClasses: [],
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
		};
	},
	computed: {
		isTeacher: function () {return this.$store.getters.isTeacher},
		loggedIn: function() {return this.$store.state.loggedIn},
		itemsList: function () {return this.items}
	},
	async mounted() {
		// load initial items 
		this.loaditemClasses()
		if(this.$route.params.itemsClass) {
			await this.loadItems()
		}
	},
	// watches url for changes
	watch: {
		'$route': async function() {
			if(this.$route.params.itemsClass)
				await this.loadItems()
		},
	},
	methods: {
		// customFilter: () => customFilter,
		customFilter(value, search, items) {
			console.log(value);
			console.log(search);
			console.log(items);
			return true
		},
		async closeDialog() {
			router.push({query: null, params: {itemsClass: null}})
		},
		async openDialog(item) {
			// changes the url, triggering the watcher function
			// and enabling the dialog component
			router.push({query: { page: 1}, params: {itemsClass: item.PK_itemsClass_ID}})
			
		},
		async loadItems() {
			try {
				let items = await axios().post('graphql', {
					query: `
						query {
							items(
								${(this.$route.query.location)? 'FK_locations_IDEq:' + parseInt(this.$route.query.location) +',' : ''} 
								${(this.$route.query.user)? 'lentToEq:' + parseInt(this.$route.query.user) +',' : ''} 
								${(this.$route.query.serialnumber)? 'serialnumberEq:' + '"'+ this.$route.query.serialnumber +'"' + ',' : ''} 
								FK_itemsClass_IDLike: ${this.$route.params.itemsClass},
									limit: 10,
									offset: ${(parseInt(this.$route.query.page) - 1) * 10}){
								PK_items_ID
								uuid
								serialnumber
								lentTo
								location {
									PK_locations_ID
									locationsName
								}
								user{
									fullname
								}
							}
						}`
				});
				
				this.items = items.data.data.items;
				return true;
			} catch (error) {
				console.error(error);
				return false
			}
		},
		async loaditemClasses() {
			let itemClasses = await loadItems()

			// filters empty classes
			this.itemClasses = itemClasses.filter(itemClass => itemClass.items.length>0)
			this.loading = false
		},
		async deleteItem(item){
			// triggers confirm component
			if (await this.$root.$confirm('Delete', 'Are you sure?', { color: 'red' })) {
				try {
					await axios().delete('/teacher/inventory/'+ item.PK_items_ID);
					// reloads items
					this.loaditemClasses();
					this.loadItems()
				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
			} 
		},
		async changeItem(item) {
			
			if (await this.$root.$confirm('ändern?', 'sind sie sicher?', { color: 'orange' })) {
				try {
					let id = item.id
					let data = {}
					data[item.field] = item.value;

					await axios().put('/teacher/inventory/'+ id, data)

					this.$emit("message", { type: "success", text: 'eintrag geändert', timeout: 2000 });

				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
				this.loadItems()
				this.loaditemClasses()
			}
		},
		async lendItem(item) {
			/** forms the data to:
			 * [
			 * 	PK_items_ID,
			 * ]
			 */
			// reformat data
			item 
			var idList = [item.PK_items_ID]
			
			try {
				// html request
				await axios().post('/student/lendings/', idList )
				// send message
				this.$emit("message", { 
					type: "success", 
					text: 'Material ausgeliehen', 
					timeout: 2000
				});
				this.loadItems()
				this.loaditemClasses()
			} catch (error) {
				console.error(error);
				this.$emit("message", { 
					type: "error",
					text: error.message,
					timeout: 0 
				});
				this.loadItems()
				this.loaditemClasses()

			}
		},
	}
}
</script>

<style>

.clickable .v-data-table__wrapper tbody{
	cursor: pointer!important
}
</style>