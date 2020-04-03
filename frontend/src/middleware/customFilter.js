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
export default customFilter