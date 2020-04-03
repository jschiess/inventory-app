import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Ripple } from 'vuetify/lib/directives'
import Vuetify from 'vuetify/lib';

Vue.config.productionTip = false

Vue.use(Vuetify, {
	directives: {
		Ripple,
	}
});

new Vue({
	vuetify: new Vuetify({
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
	}),
	router,
	store,
	render: h => h(App)
}).$mount('#app')
