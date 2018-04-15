const getHabits = () => {
  return new Promise(resolve => {
    const mock = [
      { id: 1, name: "Café da manhã", tip: "Saudável e em casa" },
      { id: 2, name: "Café da manhã", tip: "Saudável e em casa" },
      { id: 3, name: "Café da manhã", tip: "Saudável e em casa" },
      { id: 4, name: "Café da manhã", tip: "Saudável e em casa" }
    ];
    resolve(mock);
  });
};

const getRatingByDay = () => {
  return new Promise(resolve => {
    resolve([{ id: 1, rate: 3 }, { id: 2, rate: 1 }, { id: 4, rate: 5 }]);
  });
};

const habitVote = (habitId, rate) => {
  return new Promise(resolve => {
    resolve({ habitId, rate });
  });
};

export default {
  getHabits,
  getRatingByDay,
  habitVote
};
