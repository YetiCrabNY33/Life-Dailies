import React from 'react';

const DailyCreator = props => {

    async function createNewDaily(){
        try{
            const dailyInfo = {questName: getState().newDailyName, qDescription: getState().newDailyDescription};
            const response = await fetch('localhost:3000/addQuest', {
                method: POST,
                body: JSON.stringify(dailyInfo),
                headers: {'Content-Type' : 'application/json'}
            });
            const newDaily = response.json();
            return props.createDaily(newDaily)
        }
        catch(err){
            return console.log(err)
        }
    }

    return (
            <div>
                <form onSubmit= { createNewDaily }>
                    <label>Quest Name:</label>
                    <input 
                    id = 'dailyNameInput'
                    type='text' 
                    placeholder='Name Of Your Quest' 
                    value={props.newDailyName}
                    onChange={ (event) => props.updateDailyName(event.target.value)}
                    required />
                    <label>Description:</label>
                    <input 
                    id = 'dailyDescriptionInput'
                    type='text' 
                    placeholder='Describe Your Quest' 
                    value={props.newDailyDescription}
                    onChange={ (event) => props.updateDailyDescription(event.target.value)}
                    required />
                    <button type = 'submit'>Create!</button>
                </form>
            </div>
    )
}



export default DailyCreator;