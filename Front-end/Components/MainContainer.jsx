import React, { Component } from 'react';
import { connect } from 'react-redux';
import DailiesContainer from './DailiesContainer.jsx';
import Profile from './Profile.jsx';
import DailiesCreator from './DailyCreator.jsx';
import * as action from '../ActionCreator/Actions';

const mapStateToProps = (state) => {
  return {
    dailies: state.dailies,
    user: state.user,
    newDailyName: state.newDailyName,
    newDailyDescription: state.newDailyDescription
  }
}
const mapDispatchToProps = dispatch => ({
    //Functions to dispatch
    createDaily: ( dailyObj ) => dispatch(action.addDailyActionCreator(dailyObj)),
    completeDaily: ( completed ) => dispatch(action.completeDailyActionCreator( completed )),
    getDailies: ( dailies )=> dispatch(action.getDailiesActionCreator(dailies)),
    updateDailyName: ( newDailyName ) => dispatch(action.updateDailyNameActionCreator(newDailyName)),
    updateDailyDescription: ( newDailyDescription ) => dispatch(action.updateDailyDescriptionActionCreator(newDailyDescription))
})

class MainContainer extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const response = await fetch('localhost:3000/questList')
    const dailiesData = await response.json()
    //Logic to go through the dailies and use setState() to initialize state from database
    return getDailies(dailiesData)
  }

  render () {
    return(
      <div>
        <Profile />
        <DailiesCreator
          createDaily={this.props.createDaily}
          newDailyName={this.props.newDailyDescription}
          newDailyDescription={this.props.newDailyName}
          updateDailyDescription = {this.props.updateDailyName} 
          updateDailyName = {this.props.updateDailyName}
        />
        <DailiesContainer
          dailies={this.props.dailies}
          completedDaily={this.completeDaily}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);