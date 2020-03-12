const axios = require('axios');
import store from './store'

export default () => {
	return axios.create({
		baseURL: `http://localhost:9000/api/`,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Authorization": "Bearer " + store.state.token
		}
	})
} 