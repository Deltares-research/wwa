import fetch from 'isomorphic-unfetch';

const fetchContent = (query) => {
	return fetch('https://graphql.datocms.com/', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
      'Authorization': process.env.DATO_API_TOKEN,
		},
		body: JSON.stringify({ query }),
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.errors) throw Error(JSON.stringify(response, null, 4));

			return response.data;
		});
};

export default fetchContent;
