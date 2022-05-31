//imports
import React from 'react';


//componentdidmount - fetch to server at route ???
const Profile = props => {
  return (
    <div className='profile'>
      <h5>{props.username}</h5>
      <p>Current Quests: {props}</p>
      <p>XP: {props.userExp}</p>
      <p>Your adventure started: {props.signUpDate}</p>
    </div>
  )
}
//render user info

//exports
export default Profile;