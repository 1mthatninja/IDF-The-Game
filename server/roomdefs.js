// roomDefs.js

module.exports = {
  lobby: {
    spawn: {
      x: 200,
      y: 200
    },

    exits: [
      {
        x: 560,
        y: 150,
        w: 40,
        h: 120,
        to: "room1"
      }
    ],

    obstacles: []
  },

  room1: {
    spawn: {
      x: 200,
      y: 200
    },

    exits: [
      {
        x: 0,
        y: 150,
        w: 40,
        h: 120,
        to: "lobby"
      }
    ],

    obstacles: []
  }
};