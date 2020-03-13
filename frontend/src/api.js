const axios = require('axios');
import store from './store'
console.log(process.env.API_PORT);

export default () => {
	return axios.create({
		baseURL: `http://localhost:${process.env.API_PORT || 9000}/api/`,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Authorization": "Bearer " + store.state.token
		}
	})
} 