const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')
const {
  SLACK_SIGNING_SECRET,
  SLACK_TOKEN,
  PORT = 3000
} = process.env

console.log(`SLACK_SIGNING_SECRET set? ${!!SLACK_SIGNING_SECRET}`)
console.log(`SLACK_TOKEN set? ${!!SLACK_TOKEN}`)
console.log(`PORT set? ${!!PORT}`)

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET)
const webClient = new WebClient(SLACK_TOKEN)

slackEvents.on('team_join', event => {
  webClient.chat.postMessage({
    text: `User ${event.user.name} signed up`,
    channel: 'UG691UQA1'
  })
});

slackEvents.start(PORT).then(server => {
  console.log(`Listening for events on ${server.address().port}`)
})
