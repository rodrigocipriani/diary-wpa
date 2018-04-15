import { habitActionTypes } from "./habitActions";
import HabitsMock from "./habitMocks";

const initialState = {
  habits: HabitsMock.HABITS,
  ratings: null,
  loadings: {
    habits: false,
    ratings: false,
    HabitVote: false
  }
};
console.log("3333333333 initialState", initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case habitActionTypes.LIST_HABITS:
      if (!action.ready) {
        return {
          ...state,
          loadings: { ...state.loadings, habits: true }
        };
      }
      return {
        ...state,
        habits: action.payload,
        loadings: { ...state.loadings, habits: false }
      };

    case habitActionTypes.LIST_RATINGS_BY_DAY:
      if (!action.ready) {
        return {
          ...state,
          loadings: { ...state.loadings, ratings: true }
        };
      }
      let ratingsById = {};
      if (action.payload) {
        action.payload.forEach(element => {
          ratingsById[element.id] = element;
        });
      }

      return {
        ...state,
        ratings: ratingsById,
        loadings: { ...state.loadings, ratings: false }
      };

    case habitActionTypes.HABIT_VOTE:
      if (!action.ready) {
        return {
          ...state,
          loadings: { ...state.loadings, HabitVote: true }
        };
      }
      let ratingsByIdUpdated = state.ratings || {};
      if (action.payload) {
        if (!ratingsByIdUpdated[action.payload.habitId]) {
          ratingsByIdUpdated = Object.assign({}, state.ratings);
          ratingsByIdUpdated[action.payload.habitId] = {
            id: action.payload.habitId,
            rate: action.payload.rate
          };
        } else {
          ratingsByIdUpdated[action.payload.habitId].rate = action.payload.rate;
          ratingsByIdUpdated = Object.assign({}, ratingsByIdUpdated);
        }
      }

      return {
        ...state,
        ratings: ratingsByIdUpdated,
        loadings: { ...state.loadings, HabitVote: false }
      };
    default:
      return state;
  }
};
