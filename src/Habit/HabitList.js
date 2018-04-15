import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText } from "material-ui/List";
import RatingStars from "../components/RatingStars";
import { LinearProgress } from "material-ui/Progress";
import * as habitActions from "./habitActions";

class HabitList extends PureComponent {
  // const HabitList = ({ habits, listHabits }) => {
  // listHabits();
  componentDidMount() {
    // this.props.listHabits();
    // this.props.getRatingByDay();
    console.log("4444444444 componentDidMount");
  }

  handleStarClick = (habitId, starNumber) => {
    console.log(habitId, starNumber);
    this.props.habitVote(habitId, starNumber);
  };

  render() {
    const { habits, ratings } = this.props;
    // console.log(">>>>> this.props", this.props);

    if (!habits) {
      return <LinearProgress />;
    }

    return (
      <Grid container>
        <Grid item xs={6}>
          Hábitos 14/04/2018
          <List>
            {habits.map(habit => {
              let rate = null;
              if (ratings && ratings[habit.id]) {
                rate = ratings[habit.id].rate;
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
                          this.handleStarClick(habit.id, starNumber)
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
    ratings: habitReducer.ratings
  };
};

const mapActionsToProps = {
  listHabits: habitActions.listHabits,
  getRatingByDay: habitActions.getRatingByDay,
  habitVote: habitActions.habitVote
};

export default connect(mapStateToProps, mapActionsToProps)(HabitList);
