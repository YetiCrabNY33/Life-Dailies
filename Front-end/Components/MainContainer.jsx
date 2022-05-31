import React from 'react';
import { connect } from 'react-redux';
import DailiesContainer from './DailiesContainer.jsx';
import Profile from './profile.jsx';
import DailiesCreator from './DailiesCreator.jsx';

const mapStateToProps = state => ({
    dailies: state.dailies,
    user: state.user,
    newDailyName: state.newDailyName,
    newDailyDescription: state.newDailyDescription
})

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
    const response = await fetch('/questList')
    const dailiesData = await response.json()
    //Logic to go through the dailies and use setState() to initialize state from database
    const dailies = dataHander(dailiesData);
    return getDailies(dailies)
  }

  render () {
    return(
      <div>
        <Profile userName={this.props.userName} userExp={this.props.userExp} />
        <DailiesCreator createDaily={this.createDaily} newDailyName={this.props.newDailyDescription} newDailyDescription={this.props.newDailyName} updateDailyDescription = {this.updateDailyName} updateDailyName = {this.updateDailyName}/>
        <DailiesContainer dailies={this.props.dailies} totalPending={this.state.totalPending} completedDaily={this.completeDaily}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);