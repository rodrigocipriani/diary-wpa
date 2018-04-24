import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import RatingStars from "../components/RatingStars";
import { LinearProgress } from "material-ui/Progress";
import * as habitActions from "./habitActions";
import habitUtils from "./HabitUtils";

class HabitList extends PureComponent {
  state = {
    currentPickDate: Date.now()
  };

  componentDidMount() {
    // this.props.listHabits();
    // this.props.getRatingByDay();
    console.log("4444444444 componentDidMount");
  }

  handleStarClick = (date, habitId, starNumber) => {
    console.log(date, habitId, starNumber);
    this.props.habitVote(date, habitId, starNumber);
  };

  render() {
    const { habits, ratings, habitReducer } = this.props;
    console.log("@@@@@@@@@@@@ habitReducer", Object.assign({}, habitReducer));
    const { currentPickDate } = this.state;
    const currentPickDateKeys = habitUtils.dateToObjects(currentPickDate);
    let currentRatings = null;
    if (ratings) {
      // todo: test if year, month, day are created
      currentRatings =
        ratings[currentPickDateKeys.year][currentPickDateKeys.month][
          currentPickDateKeys.day
        ];
    }
    console.log("ratings", ratings);

    if (!habits || !ratings) {
      return <LinearProgress />;
    }

    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          Hábitos{" "}
          {`${currentPickDateKeys.day}-${currentPickDateKeys.month}-${
            currentPickDateKeys.year
          }`}
          <List>
            {habits.map(habit => {
              let rate = null;
              if (currentRatings && currentRatings[habit.id]) {
                rate = currentRatings[habit.id].rate;
              }
              return (
                <ListItem key={habit.id}>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemText
                        primary={habit.name}
                        secondary={habit.tip}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <RatingStars
                        value={rate}
                        onClick={starNumber =>
                          this.handleStarClick(
                            currentPickDate,
                            habit.id,
                            starNumber
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ habitReducer }) => {
  return {
    habits: habitReducer.habits,
    ratings: habitReducer.ratings,
    habitReducer: habitReducer
  };
};

const mapActionsToProps = {
  listHabits: habitActions.listHabits,
  getRatingByDay: habitActions.getRatingByDay,
  habitVote: habitActions.habitVote
};

export default connect(mapStateToProps, mapActionsToProps)(HabitList);
