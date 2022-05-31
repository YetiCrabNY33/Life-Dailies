//imports
import React from 'react';
import { render } from 'react-dom';
import Daily from './Daily'


//promise to dispatch retrieved data to reducer
const DailiesContainer = props => {
  const dailiesArray = [];
  for (let i = 0; i < props.dailies.length; i++) {
    dailiesArray.push(<Daily 
        id={i}
        questName = {props.dailies[i].questName}
        description = {props.dailies[i].description}
        completedDaily = {props.completeDaily}
        />)
  }

//render dailies
  return (
    <div>
      <h4>Your Current Quests:</h4>
      {dailiesArray}
    </div>
  )
};
//exports
export default DailiesContainer;
