<template lang='pug'>
	v-snackbar(
		top 
		v-model="active" 
		:timeout='snack.timeout' 
		:color='snack.color'
		) 
		div {{ snack.message }}
		v-btn( @click="$store.state.snack = []") close
			
</template>

<script> 

export default {
	data() {
		return {
			
		}
	},
	computed: {
		active: function() {return !!this.$store.state.snack.length},
		snack: function() {
			const [color, message, timeout] = this.$store.state.snack
			let snack = { 
				color,
				message,
				timeout,
			}
			return snack
		}
	}
}
</script> 