const axios = require('axios');
import store from './store'


export default () => {
	return axios.create({
		baseURL: `${window.location.origin}:${process.env.VUE_APP_API_PORT || 1337}/api/`,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Authorization": "Bearer " + store.state.token
		}
	})
} 