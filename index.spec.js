const mock = require('mock-require')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const should = chai.should()
const expect = chai.expect
chai.use(sinonChai)

describe('Republish', function() {

	const republish = require('./index')

	it('should initialize', () => {
		republish.prepare()
		republish.load()
		republish.getCapabilities()
		republish.start()
	})

	it('should deinitialize', () => {
		republish.stop()
		republish.unload()
		republish.cleanup()
	})

	it('should handle lifecycle methods', () => {
		republish.start()
		republish.suspend()
	})

	it('should process message', async () => {
		const contextStub = {
			topic: 'republish',
			message: {},
			appId: 'abc', 
			gatewayId: 'def',
			arguments: {
				destinationTopicTemplate: ':appId/:gatewayId/new/topic'
			},
		}
		let output = await republish.process(contextStub)
		output.should.be.an('object')
	})

})
