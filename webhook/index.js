const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;

app.post('/', (req, res) => {
  const dialogResult = req.body.queryResult;

  // print user query
  console.log(`User ask: ${dialogResult.queryText}`);

  // print intent
  console.log(`Intent: ${dialogResult.intent.displayName}`);

  // print all parameters
  console.log(`${Object.keys(dialogResult.parameters).length} Parameters`);
  Object.keys(dialogResult.parameters).forEach((key) => {
    console.log('---------');
    console.log(`Parameter: ${key}`);
    console.log(`Value: ${dialogResult.parameters[key]}`);
    console.log('---------');
  });

  // return success to dialogflow
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Webhook listening on port ${port}`));
