const express = require('express');
const app = express(); //indicates this is the server
const PORT = 3000;

app.use(express.json());


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