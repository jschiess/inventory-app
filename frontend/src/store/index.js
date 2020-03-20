// import packages
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)
import axios from "@/api";
export default new Vuex.Store({
	state: {
		loggedIn: false,
		token: '',
		user: {},
		darkTheme: true,
	},
	plugins: [createPersistedState()],
	mutations: {
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
		clearData: function (context) {
			context.commit('setToken', '')
			context.commit('setLoggedIn', false)
			context.commit('setUserData', {})
		},
		login: async function (context, data) {
			try {

				var response = await axios().post("/login", data);
				var token = response.data.auth.split(" ")[1];
				var userData = response.data.tokenData
			} catch (error) {
				throw new Error(error)
			}

			context.commit('setToken', token)
			context.commit('setUserData', userData)
			context.commit('setLoggedIn', true)
		}
	},
	modules: {
	},
})
