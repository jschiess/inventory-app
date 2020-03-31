// import packages
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import router from '../router/index.js'
Vue.use(Vuex)
import axios from "@/api";
export default new Vuex.Store({
	state: {
		loggedIn: false,
		token: '',
		user: {},
		darkTheme: true,
		snack: [],
	},
	plugins: [createPersistedState({
		Storage: {
			toke: '123'
		}
	})],
	mutations: {
		setSnack(state, payload) {
			state.snack = payload
		},
		setToken(state, payload) {
			state.token = payload;
		},
		setLoggedIn(state, payload) {
			state.loggedIn = payload;
		},
		setUserData(state, payload) {
			state.user = payload;
		},
		setDarkTheme(state, payload) {
			state.darkTheme = payload
		}
	},
	getters: {
		isTeacher: state => {
			return (state.user.role === 'teacher') ? true : false;
		}
	},
	actions: {
		toggleDarkTheme(context) {
			if (!context.state.darkTheme) {
				context.commit('setDarkTheme', true)
			} else {
				context.commit('setDarkTheme', false)
			}
		},
		logout: function (context) {
			context.commit('setToken', '')
			context.commit('setLoggedIn', false)
			context.commit('setUserData', {})

			router.push('/login')
		},
		login: async function (context, data) {

			axios().post("/login", data).then((response) => {

				context.commit('setSnack', ['green', 'Eingeloggt', 2000])
				var token = response.data.auth.split(" ")[1];
				var userData = response.data.tokenData


				context.commit('setToken', token)
				context.commit('setUserData', userData)
				context.commit('setLoggedIn', true)

				router.push('/')
			}).catch((err) => {
				console.error(err);
				context.commit('setSnack', ['red', err.message, 0])
			});
		}
	},
	modules: {
	},
})
