//imports
import React from 'react';


//onclick triggers patch request and dispatch to invoke reducer
//patch function to 
const Daily = props => {

  async function completeDaily() {
    const completionRequest = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({completedAt: Date.now()})
    }
    const response = await fetch('/updateDaily', completionRequest);
    return props.completedDaily(response)
  }

  async function deleteDaily() {
    const deleteRequest = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    }
    const response = await fetch('/deleteDaily', deleteRequest)
    }
  

  return (
    <article className="dailyCard">
      <div className="questNameContainer">
        <h3 className="questName">{props.questName}</h3>
      </div>
      <div className="descriptionContainer">
        <p>{props.description}</p>
        <p>Complete By: </p>
      </div>
      <button onClick={completeDaily()}>Complete Daily</button>
      <button onClick={deleteDaily()}>Abandon Daily</button>
    </article>
  )
}
//return div with quest info
//button to complete = 

//export
export default Daily;