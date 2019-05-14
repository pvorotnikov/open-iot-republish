/*
 * Module name: net.vorotnikov.republish
 * Module author: Petar Vorotnikov 
 */

const MODULE_NAME = 'net.vorotnikov.republish'

const _ = require('lodash')

async function prepare() {
    console.log(`${MODULE_NAME}.prepare() called`)
}

async function load() {
    console.log(`${MODULE_NAME}.load() called`)
}

async function getCapabilities() {
    console.log(`${MODULE_NAME}.getCapabilities() called`)
}

async function start() {
    console.log(`${MODULE_NAME}.start() called`)
}

async function suspend() {
    console.log(`${MODULE_NAME}.suspend() called`)
}

async function resume() {
    console.log(`${MODULE_NAME}.resume() called`)
}

async function stop() {
    console.log(`${MODULE_NAME}.stop() called`)
}

async function unload() {
    console.log(`${MODULE_NAME}.unload() called`)
}

async function cleanup() {
    console.log(`${MODULE_NAME}.cleanup() called`)
}

/**
 * Process incoming message
 * @param {Object} context 
 * @param {Object} context.arguments
 * @param {Object} context.arguments.destinationTopicTemplate - destination template
 *      The following template strings are supported:
 *      :appId - the application id segment of the source topic
 *      :gatewayId - the gateway id segment of the source topic
 */
async function _process(context) {
    
    console.log(`${MODULE_NAME}.process() called`)
    const { topic, message, appId, gatewayId, arguments } = context

    try {
        const { destinationTopicTemplate } = arguments
        const destinationTopic = processTemplateString(destinationTopicTemplate, { ':appId': appId, ':gatewayId': gatewayId })
        console.log(`Republishing message from ${appId}/${gatewayId}/${topic} to ${destinationTopic}`)
        process.emit('mqtt.publish.message', {
            topic: destinationTopic,
            payload: message,
        })
    } catch (err) {
        console.error(err.message)
    }
    
    return message
}

function processTemplateString(template, replacements) {
    if (!_.isString(template)) return template
    let result = template
    for (let i in replacements) {
        result = result.replace(i, replacements[i])
    }
    return result
}

// mandatory interface
module.exports = {
    prepare,
    load,
    getCapabilities,
    start,
    suspend,
    resume,
    stop,
    unload,
    cleanup,
    process: _process,
}
