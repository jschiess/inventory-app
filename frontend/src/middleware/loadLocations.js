import axios from "@/api";
async function loadLocations() {
	try {
		// var response = await axios().get('/teacher/locations');
		// return response.data;

		let response = await axios().post('graphql', {
			query: `
				query {
					locations{
						PK_locations_ID
						locationsName
					}
				}
			`
		})
		return response.data.data.locations
	}
	catch (error) {
		throw new Error(error);
	}
}

export { loadLocations }