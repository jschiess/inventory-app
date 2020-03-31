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

// kek()




let fuck = {
	"data": {
		"items": [
			{
				"PK_items_ID": 207,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "3116",
				"lentTo": 3,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": {
					"fullname": "josiah schiess"
				}
			},
			{
				"PK_items_ID": 212,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "9569",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 213,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "455",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 215,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "5196",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 217,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "4409",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 219,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "9479",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 225,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "7064",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 228,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "1280",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 232,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "3414",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 236,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "7449",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 238,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "5074",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 241,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "2927",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 245,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "2920",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 248,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "3508",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 249,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "7626",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 250,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "2106",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 253,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "961",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 257,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "7266",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 258,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "4810",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 259,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "2321",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 260,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "6253",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 262,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "8336",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 272,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "6558",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 273,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "7148",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 275,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "8334",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 290,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "6133",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 292,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "7503",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 295,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "5008",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			},
			{
				"PK_items_ID": 297,
				"uuid": "64b984db-c2e6-4bef-ac83-f3ce0545e0fb",
				"serialnumber": "9409",
				"lentTo": null,
				"location": {
					"PK_locations_ID": 1,
					"locationsName": "LOA03"
				},
				"user": null
			}
		]
	}
}

console.log(fuck.data.items.length);
