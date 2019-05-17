import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Given, When, Then } from 'cucumber'
import { By, until } from 'selenium-webdriver'
chai.use(chaiAsPromised)
When(/^user clicks on the ["']([#\w-]+)["'] element$/, async function (selector) {
	const element = await this.driver.findElement(By.css(selector))
	return element.click()
})


Then(/^the ["']([#\w-]+)["'] element should appear within (\d+) milliseconds$/, function (selector, timeout) {
	return expect(this.driver.wait(until.elementLocated(By.css(selector)),timeout)).to.be.fulfilled
})
