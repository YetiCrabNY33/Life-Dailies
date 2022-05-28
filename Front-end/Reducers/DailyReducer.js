import * as types from '../constants/actionConstants';

const initialState = {
    dailies : [],
    user : {}
}

const dailiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DAILIES: {
      return {
        ...state,
        dailies: dailies
      }
    }

    case types.COMPLETE_DAILY: {
        const updatedDailies = state.dailies.slice();
        for (let i = 0 ; i < updatedDailies.length ; i++){
            if (updatedDailies[i].primaryKey === completed.primaryKey){
                updatedDailies[i].completionDate = completed.completionDate
            }
        };
        return {
            ...state,
            dailies: updatedDailies
        };
    }

    case types.CREATE_DAILY: {
        const updatedDailies = state.dailies.slice();
        updatedDailies.push(newDaily);
        return {
            ...state,
            dailies: updatedDailies
        }
    }
  }
}