const HABITS = [
  { id: 1, name: "Café da manhã", tip: "Saudável e em casa" },
  { id: 2, name: "Café da manhã", tip: "Saudável e em casa" },
  { id: 3, name: "Café da manhã", tip: "Saudável e em casa" },
  { id: 4, name: "Café da manhã", tip: "Saudável e em casa" }
];

const getHabits = () => {
  return new Promise(resolve => {
    resolve(HABITS);
  });
};

const getRatingByDay = () => {
  return new Promise(resolve => {
    resolve([{ id: 1, rate: 3 }, { id: 2, rate: 1 }, { id: 4, rate: 5 }]);
  });
};

const habitVote = (date, habitId, rate) => {
  return new Promise(resolve => {
    resolve({ date, habitId, rate });
  });
};

export default {
  HABITS,
  getHabits,
  getRatingByDay,
  habitVote
};
