import * as types from '../Constants/actionConstants';

export const addDailyActionCreator = newDaily => ({
    type: types.CREATE_DAILY,
    payload: newDaily
})

export const getDailiesActionCreator = dailies => ({
    type: types.GET_DAILIES,
    //Array of objects
    payload: dailies
})

export const completeDailyActionCreator = completed => ({
    type: types.COMPLETE_DAILIES,
    payload: completed
})

export const updateDailyDescriptionActionCreator = newDailyDescription => ({
  type: types.UPDATE_DAILYDESCRIPTION,
  payload: newDailyDescription
})

export const updateDailyNameActionCreator = newDailyName => ({
  type: types.UPDATE_DAILYNAME,
  payload: newDailyName
})