import {Given, When, Then} from 'cucumber'

When(/^user navigates to ([\w-_\/?=:#]+)$/, function (location) {
	console.log(`http://${process.env.SERVER_HOST_TEST}:${process.env.SERVER_PORT_TEST}${location}`)
	return this.driver.get(`http://${process.env.SERVER_HOST_TEST}:${process.env.SERVER_PORT_TEST}${location}`)

})
