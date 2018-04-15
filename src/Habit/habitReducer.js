import { habitActionTypes } from "./habitActions";

const initialState = {
  habits: null,
  ratings: null,
  loadings: {
    habits: false,
    ratings: false,
    HabitVote: false
  }
};

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
      let ratingsById = [];
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
      let ratingsByIdUpdated = state.ratings;
      console.log(" ##### action.payload", action.payload);
      if (action.payload) {
        if (!state.ratings[action.payload.habitId]) {
          ratingsByIdUpdated = ratingsByIdUpdated.slice();
          ratingsByIdUpdated[action.payload.habitId] = {
            id: action.payload.habitId,
            rate: action.payload.rate
          };
        } else {
          ratingsByIdUpdated = state.ratings.map(element => {
            if (element.id !== action.payload.habitId) {
              return element;
            }
            return {
              ...element,
              rate: action.payload.rate
            };
          });
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
