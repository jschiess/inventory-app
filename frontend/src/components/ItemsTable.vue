<template lang='pug'>
	v-card.mx-auto.elevation-18(  ) 
		v-card-text {{ locations }}
		v-data-table(
			:loading='loading'
			:custom-filter='customFilter'
			:options.sync="pagination"
			item-key='PK_items_ID'
			class="elevation-0" 
			:items='items' 
			:headers='subheaders' 
			) 
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
			template( v-slot:item.serialnumber="{ item }" v-if='isTeacher')
				v-edit-dialog(
					large
					@save="changeSerialnumber(item)" ) {{ item.serialnumber }}
					template(v-slot:input)
						v-text-field(counter label='edit' v-model='item.serialnumber') 
			template( v-slot:item.location.locationsName="{ item }")
				v-edit-dialog(
				large 
				@save="changeLocation(item)" 
				@cancel="item.location.FK_locations_ID = 0 "
				) 
					div {{ item.location.locationsName }}
					template(v-slot:input)
						v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' color="primary" v-model="item.location.PK_locations_ID" :items="locations" item-value='PK_locations_ID' item-text='locationsName' label="Standort" )
		v-card-actions
			v-spacer
			v-btn(color="primary" @click="$emit('closeDialog')" ) close
</template>


<script>

import { loadLocations, customFilter } from '../middleware'

export default {
	name: 'ItemsTable',
	props: ['items'],
	data() {
		return {
			pagination: {},
			item: [],
			subheaders: [
				{ text: "ID", value: "PK_items_ID" },
				{ text: "Serialnumber", value: "serialnumber" },
				{ text: "Ablageort", value: "location.locationsName" },
				{ text: 'Ausgeliehen von', value: 'user.fullname'},
				{ text: 'Aktion', value: 'action'},
			],
			locations: [],
		};
	},
	computed: {
		loading: function () {return !this.items.length},
		isTeacher: function () {return this.$store.getters.isTeacher},
	},
	async mounted() {
		this.loadLocations()
	},	
	methods: {
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
		customFilter: () => customFilter,
		async loadLocations() {
			this.locations = await loadLocations();
		},
	}
}
</script>

<style>


</style>