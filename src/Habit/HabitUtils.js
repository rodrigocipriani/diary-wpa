import moment from "moment";

const dateToObjects = date => {
  return {
    day: moment(date).date(),
    month: moment(date).month() + 1,
    year: moment(date).year()
  };
};

export default { dateToObjects };
