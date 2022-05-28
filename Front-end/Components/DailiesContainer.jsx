//imports
import React from 'react';
import Daily from './Daily'


//promise to dispatch retrieved data to reducer
const DailiesContainer = props => {
  const dailiesArray = [];
  for (let i = 0; i < this.props.dailies.length; i++) {
    dailiesArray.push(<Daily 
        id={i} 
        questName = {this.props.dailies[i].questName}
        description = {this.props.dailies[i].description}
        
        />)
  }
}
//render dailies


//exports
export default DailiesContainer;
