import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import { preset } from 'vue-cli-plugin-vuetify-preset-crane/preset'
import { Ripple } from 'vuetify/lib/directives'
Vue.use(Vuetify, {
	directives: {
		Ripple,
	}
});
import store from '../store'

export default new Vuetify({

	theme: {
		dark: store.state.darkTheme,
		themes: {
			light: {
				primary: "#0082b4",
				secondary: "#ffa000",
				accent: "#9c27b0",
				error: "#f44336",
				warning: "#ff9800",
				info: "#ffc107",
				success: "#4caf50",
				kek: '#ffa31a',
			},
		}
	},
});
