import React from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";

const RatingStars = ({ value, onClick }) => {
  const starFilled = (starNumber, value) => {
    let star = "star_border";
    if (value) {
      if (starNumber <= value) {
        star = "star";
      }
    }
    return <Icon style={{ color: "#FFC107" }}>{star}</Icon>;
  };

  const handlerOnClick = starNumber => {
    onClick(starNumber);
  };

  return (
    <Grid container>
      <Grid item xs={1} />
      {[1, 2, 3, 4, 5].map(i => (
        <Grid item xs={2} key={i}>
          <IconButton
            onClick={() => handlerOnClick(i)}
            aria-label={`Star ${i}`}
          >
            {starFilled(i, value)}
          </IconButton>
        </Grid>
      ))}
      <Grid item xs={1}>
        <IconButton
          onClick={() => handlerOnClick(null)}
          aria-label={`reset stars`}
        >
          <small>x</small>
        </IconButton>
      </Grid>
    </Grid>
  );
};

RatingStars.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func
};

export default RatingStars;
