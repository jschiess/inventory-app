<template lang='pug'>
	v-card.mx-auto.elevation-18(  )
		v-data-table(
			:loading='loading'
			:search="search"
			:custom-filter='customFilter'
			item-key='PK_items_ID'
			:items-per-page=1000
			class="elevation-0" 
			:items='item' 
			:headers='subheaders' 
			) 
			template(v-slot:top='props'  ) 
				v-card-title(v-if="props") {{ props.items[0].itemClass.itemsClassName }}				
			template(v-slot:header.data-table-select='item')
			template(v-slot:item.action='{ item }')
				v-tooltip(left v-if='isTeacher') Material loeschen
					template(v-slot:activator='{ on }')
						v-btn( v-on='on' @click="deleteItem( item )" icon)
							v-icon mdi-delete
				v-tooltip(right) Material ausleihen
					template(v-slot:activator='{ on }')
						v-btn(icon v-on='on' @click="$emit('lendItem', item)" :disabled='!!item.user')
							v-icon mdi-book-plus
			template(v-slot:item.data-table-select='{ isSelected, select, item }') 
				v-simple-checkbox( :disabled='!!item.lentTo' :value="isSelected" )
			template( v-slot:item.serialnumber="{ item }" v-if='isTeacher')
				v-edit-dialog(@save='changeItem(item)') {{ item.serialnumber }}
					template(v-slot:input)
						v-text-field(counter label='edit' v-model='item.serialnumber') 
			template(v-if='item.location' v-slot:item.location.locationsName="{ item: {location} }")
				v-edit-dialog(@save='changeItem(item)') {{ location.locationsName }}
					template(v-slot:input)
						v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' color="primary" v-model="item.location.FK_locations_ID" :items="locations" item-value='PK_locations_ID' item-text='locationsName' label="Standort" )
		v-card-actions
			v-spacer
			v-btn(color="primary" @click="closeDialog" ) close
</template>


<script>
import axios from "@/api";
import { loadLocations, loadItems, customFilter } from '../middleware'

export default {
	name: 'ItemsTable',
	props: ['item'],
	data() {
		return {
			subheaders: [
				{ text: "ID", value: "PK_items_ID" },
				{ text: "Serialnumber", value: "serialnumber" },
				{ text: "Ablageort", value: "location.locationsName" },
				{ text: 'Ausgeliehen von', value: 'user.fullname'},
				{ text: 'Aktion', value: 'action'},
			],
			search: "",
			loading: false,
			locations: [],
		};
	},
	computed: {
		isTeacher: function () {return this.$store.getters.isTeacher},
	},
	async mounted() {
		this.loadLocations()
	},	
	methods: {
		customFilter: () => customFilter,
		async closeDialog() {
			this.$emit('closeDialog')
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
			this.$emit('deleteItem', item)
		},
		async changeItem(item) {
			this.$emit('changeItem', item)
		},
		async lendItem(item) {
			/** forms the data to:
			 * [
			 * 	PK_items_ID,
			 * ]
			 */
			// reformat data
			var idList = item.PK_items_ID;
			try {
				// html request
				await axios().post('/student/lendings/', [idList] )
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


</style>