import React from 'react';
import { connect } from 'react-redux';
import DailiesContainer from './DailiesContainer.jsx';
import Profile from './profile.jsx';
import DailiesCreator from './DailiesCreator.jsx';

const mapStateToProps = state => ({
    dailies: state.dailies,
    userName: state.userName,
    userExp: state.userExp,
    questName: state.questName,
})

const mapDispatchToProps = dispatch => ({
    //Functions to dispatch
    createDaily: ( dailyObj ) => dispatch(action.addDailyActionCreator(dailyObj)),
    completeDaily: ( completed ) => dispatch(action.completeDailyActionCreator( completed )),
    getDailies: ( dailies )=> dispatch(action.getDailiesActionCreator(dailies))
})

class MainContainer extends Component {
  constructor(props) {
  super(props)
  }

  async componentDidMount() {
    const response = await fetch("")
    const dailiesData = await response.json()
    //Logic to go through the dailies and use setState() to initialize state from database
    const dailies = dataHander(dailiesData);
    return getDailies(dailies)
  }

  render () {
    return(
      <div>
        <Profile userName={this.props.userName} userExp={this.props.userExp} />
        <DailiesCreator createDaily={this.createDaily} dailies={this.dailies}/>
        <DailiesContainer dalies={this.props.dailies} totalPending={this.state.totalPending} completedDaily={this.completeDaily}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);