import habitMocks from "./habitMocks";

export const habitActionTypes = {
  LIST_HABITS: "LIST_HABITS",
  LIST_RATINGS_BY_DAY: "LIST_RATINGS_BY_DAY",
  HABIT_VOTE: "HABIT_VOTE"
};

export const listHabits = () => async (dispatch, getState, api) => {
  return dispatch({
    type: habitActionTypes.LIST_HABITS,
    // payload: res
    promise: habitMocks.getHabits()
  });
};

export const getRatingByDay = () => async (dispatch, getState, api) => {
  return dispatch({
    type: habitActionTypes.LIST_RATINGS_BY_DAY,
    // payload: res
    promise: habitMocks.getRatingByDay()
  });
};

export const habitVote = (habitId, rate) => async (dispatch, getState, api) => {
  return dispatch({
    type: habitActionTypes.HABIT_VOTE,
    // payload: { habitId, rate }
    promise: habitMocks.habitVote(habitId, rate)
  });
};
