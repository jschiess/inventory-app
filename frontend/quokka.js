let items = {
	"data": {
		"itemsClasses": [
			{
				"itemsClassName": "Raspberry PI model 3s 16gb ram",
				"PK_itemsClass_ID": 1,
				"description": "micro computer",
				"types": {
					"typesName": "Raspberry Pi"
				},
				"manufacturers": {
					"manufacturersName": "Raspberry Pi"
				},
				"items": [
					{
						"PK_items_ID": 1,
						"uuid": "f7953733-1db7-4dd7-b36b-a628daddba7d",
						"serialnumber": "12312353453463456567567823324",
						"lentTo": null,
						"location": {
							"locationsName": "LOA03"
						},
						"user": null
					}
				]
			},
			{
				"itemsClassName": "amazon vibrator",
				"PK_itemsClass_ID": 2,
				"description": "this is so sad",
				"types": {
					"typesName": "Bildschirm"
				},
				"manufacturers": {
					"manufacturersName": "Logitech"
				},
				"items": [
					{
						"PK_items_ID": 2,
						"uuid": "f7953733-1db7-4dd7-b36b-a628daddba7d",
						"serialnumber": "9912351235",
						"lentTo": null,
						"location": null,
						"user": null
					},
					{
						"PK_items_ID": 3,
						"uuid": "f7953733-1db7-4dd7-b36b-a628daddba7d",
						"serialnumber": "1236747",
						"lentTo": null,
						"location": null,
						"user": null
					}
				]
			}
		]
	}
}

const search = ''


function findInObject(items) {
	// console.log(Object.values(items));
	var result = false;
	Object.values(items).forEach(el => {
		if (el === null) {
			return false
		}
		if (typeof el === 'string' || el === 'number') {
			if (el.includes(search)) {
				result = true;
			}
		} else {
			if (kek(el)) {
				result = true
			}
		}
	});
	return result

}


function kek() {
	var items = [];

	for (var i = 0; i < 11; i++) {
		items.push(
			{
				serialnumber: Math.floor(Math.random() * 10000),
				FK_locations_ID: Math.floor(Math.random() * 3) + 1,
				FK_itemsClass_ID: 1,
			}
		);
	}
	console.log(items);

}

kek()




