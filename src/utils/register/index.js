function register (email, digest) {

	// Send the credentials to the server
	const payload = { email, digest }
	const request = new Request('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})
	return fetch(request)
		.then(response => {
			if (response.status === 201) {
				return response.text()
			} else {
				throw new Error('Error creating new user')
			}
		})
}

export default register
