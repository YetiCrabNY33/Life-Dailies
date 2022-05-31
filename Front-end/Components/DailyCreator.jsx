import React, { Component } from 'react';

class DailyCreator extends Component {
    constructor (props) {
        super(props)
    }

    async createNewDaily(){
        try{
            const dailyInfo = {questName: getState().newDailyName, qDescription: getState().newDailyDescription};
            const response = await fetch('/addQuest', {
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

    render(){
        return(
            <div>
                <form onSubmit= { createNewDaily }>
                    <label>Quest Name:</label><input 
                    type='text' 
                    placeholder='Name Of Your Quest' 
                    value={this.props.newDailyName}
                    onChange={ event => updateDailyName(event.target.value)}
                    required />
                    <label>Description:</label><input 
                    type='text' 
                    placeholder='Describe Your Quest' 
                    value={this.props.newDailyDescription}
                    onChange={ event => updateDailyDescription(event.target.value)}
                    required />
                    <button type = 'submit'>Create!</button>
                </form>
            </div>
        )
    }
}



export default DailyCreator;