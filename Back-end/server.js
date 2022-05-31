const express = require('express');
const app = express(); //indicates this is the server
const PORT = 3000;
const questHandler = require('./questHandler');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true})); // needed for POST requests which send data through the body using 'x-www-form-urlencoded' format
app.use(express.json()); // needed to parse JSON objects that are sent through the server

app.post('/addQuest/', //this quest is for 
  questHandler.addQuest,
  (req, res) => {
    res.status(200).send(); // this should send a confirmation that a quest was added
    // I'm not sure how to do this
});

app.get('/questlist/',  //get request handler to retrieve the list of quests
  questHandler.questList,
  (req, res) => {
    res.status(200).send(); 
});

//error handler in case client navigated away from used domains
app.use((req, res)=> {
  return res.status(404).send('You in the wrong place!')
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err); //when we pass any object into next in the controller, we can pass a specific message
  console.log(errorObj.log); // logs out the 'log' expression from the error object
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;