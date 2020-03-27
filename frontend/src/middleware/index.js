import { lendings } from './lendings'
import { submitNewItem } from './submitNewItem'
import { loadTypes } from './loadTypes'
import { loadLocations } from './loadLocations'
import { loadManufacturers } from './loadManufacturers'
import { loadItemsClass } from './loadItemsClass'
import { submitNewClass } from './submitNewClass'
import { loadItems } from './loadItems'

function customFilter(value, search, item) {
	function findInObject(items) {
		var result = false;
		Object.values(items).forEach(el => {
			if (el === null) {
				return false
			}
			if (typeof el === 'string' || el === 'number') {
				if (el.toUpperCase().includes(search.toUpperCase())) {
					result = true;
				}
			} else {
				if (findInObject(el)) {
					result = true
				}
			}
		});
		return result
	}
	return findInObject(item)
}

export { customFilter, lendings, submitNewItem, loadTypes, loadLocations, loadManufacturers, loadItemsClass, loadItems, submitNewClass };
