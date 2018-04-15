import { habitActionTypes } from "./habitActions";
import HabitsMock from "./habitMocks";
import habitUtils from "./HabitUtils";

const initialState = {
  habits: HabitsMock.HABITS,
  ratings: null,
  loadings: {
    habits: false,
    ratings: false,
    HabitVote: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case habitActionTypes.LIST_HABITS:
    //   if (!action.ready) {
    //     return {
    //       ...state,
    //       loadings: { ...state.loadings, habits: true }
    //     };
    //   }
    //   return {
    //     ...state,
    //     habits: action.payload,
    //     loadings: { ...state.loadings, habits: false }
    //   };

    // case habitActionTypes.LIST_RATINGS_BY_DAY:
    //   if (!action.ready) {
    //     return {
    //       ...state,
    //       loadings: { ...state.loadings, ratings: true }
    //     };
    //   }
    //   let ratingsById = {};
    //   if (action.payload) {
    //     action.payload.forEach(element => {
    //       ratingsById[element.id] = element;
    //     });
    //   }

    //   return {
    //     ...state,
    //     ratings: ratingsById,
    //     loadings: { ...state.loadings, ratings: false }
    //   };

    case habitActionTypes.HABIT_VOTE:
      if (!action.ready) {
        return {
          ...state,
          loadings: { ...state.loadings, HabitVote: true }
        };
      }

      let update = Object.assign({}, state.ratings || {});
      if (action.payload) {
        const { date, habitId, rate } = action.payload;
        console.log(">> date, habitId, rate", date, habitId, rate);
        const dateObject = habitUtils.dateToObjects(date);

        if (!update[dateObject.year]) {
          update[dateObject.year] = {};
        }

        if (!update[dateObject.year][dateObject.month]) {
          update[dateObject.year][dateObject.month] = {};
        }

        if (!update[dateObject.year][dateObject.month][dateObject.day]) {
          update[dateObject.year][dateObject.month][dateObject.day] = {};
        }

        if (
          !update[dateObject.year][dateObject.month][dateObject.day][habitId]
        ) {
          // update = Object.assign({}, state.ratings);
          console.log("AQUI 1");
          update[dateObject.year][dateObject.month][dateObject.day][habitId] = {
            id: habitId,
            rate: rate
          };
        } else {
          console.log("AQUI 2");
          update[dateObject.year][dateObject.month][dateObject.day][
            habitId
          ].rate = rate;
          update = Object.assign({}, update);
        }
      }

      return {
        ...state,
        ratings: update,
        loadings: { ...state.loadings, HabitVote: false }
      };
    default:
      return state;
  }
};
