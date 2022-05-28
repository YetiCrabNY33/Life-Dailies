import * as types from '../Constants/actionConstants';

export const CREATE_DAILY = dailyObj => ({
  type: types.CREATE_DAILY,
  payload: dailyObj
})

export const GET_DAILIES = dailies => ({
    type: types.GET_DAILIES,
    //Array of objects
    payload: dailies
})

export const COMPLETE_DAILIES = completed => ({
    type: types.COMPLETE_DAILIES,
    payload: completed
})