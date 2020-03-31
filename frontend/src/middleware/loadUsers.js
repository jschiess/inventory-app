import axios from "@/api";
async function loadUsers() {
	try {
		let response = await axios().post('graphql', {
			query: `
				query {
					users{
						PK_users_ID
						fullname
					}
				}`
		});
		console.log(response);

		return response.data.data.users;
	}
	catch (error) {
		throw new Error(error);
	}
}

export { loadUsers }