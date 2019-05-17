import assert from 'assert'
import {Given, When, Then} from 'cucumber'
import {By} from 'selenium-webdriver'

Then(/^the ["']([\w#-.]+)["'] element should( not)? have a ["']([\w_-]+)["'] attribute$/, async function(selector, negation, attributeName){
	const element = this.driver.findElement(By.css(selector))
	const attributeValue = await element.getAttribute(attributeName)
	const expectedValue = negation? null: attributeValue
	assert.equal(attributeValue, expectedValue)
})
