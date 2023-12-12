const generateQueryString = (selectFilter) => {
	const { text, selectedOption } = selectFilter;

	const queryStringParts = [];

	if (text) {
		queryStringParts.push(`location=${text}`);
	}

	if (selectedOption) {
		queryStringParts.push(`category=${selectedOption}`);
	}

	if (queryStringParts.length > 0) {
		return `?${queryStringParts.join("&")}`;
	} else {
		return "";
	}
}

export default generateQueryString;