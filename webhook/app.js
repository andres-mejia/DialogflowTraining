const express = require('express');
const {
  WebhookClient,
} = require('dialogflow-fulfillment');
const {
  Suggestion,
} = require('dialogflow-fulfillment');

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.send('Welcome to my Dialogflow webhook');
});

function handleWebhook(request, response) {
  const agent = new WebhookClient({
    request,
    response,
  });
  
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(response.body));
  
  function getOrder(agent) {
    const waffleQuantity = agent.parameters.waffleQuantity;
    const waffleFlavor = agent.parameters.waffleFlavors;
    
    if (waffleQuantity < 1) {
      agent.add('Hey, You need to order at least 1 waffle. Select your choice')
      agent.add(new Suggestion(1));
      agent.add(new Suggestion(2));
      agent.add(new Suggestion(3));
    } else {
      agent.add(`Sure. ${waffleQuantity} ${waffleFlavor} waffle coming right up. How would you like to pay?`);
      agent.add(new Suggestion('Cash'));
      agent.add(new Suggestion('PayNow'));
    }
  }
  
  let intentMap = new Map();
  intentMap.set('getOrder', getOrder);
  agent.handleRequest(intentMap);
}

app.post('/webhook', (request, response) => {
  handleWebhook(request, response);
});

const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
