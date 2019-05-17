import { After, Before, setDefaultTimeout } from 'cucumber'
import webdriver from 'selenium-webdriver'
setDefaultTimeout(300 * 1000)
Before(function() {
	this.driver = new webdriver.Builder()
		.forBrowser(process.env.TEST_BROWSER)
		.build()
	return this.driver
})
After(function() {
	this.driver.quit()
})
