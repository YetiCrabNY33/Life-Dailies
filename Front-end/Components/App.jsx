import React, { Component } from 'react';
import MainContainer from './MainContainer';

//Render maincontainer if logged in, else render log in modal

class App extends Component {
render() {
    return(
  <MainContainer />
    )
}
}

export default App;