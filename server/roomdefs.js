module.exports = {

  lobby: {

    name: "lobby",

    bg: "assets/bg.png",

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

        to: "room1",

        spawn: {
          x: 80,
          y: 200
        }
      }
    ],

    obstacles: []
  },

  room1: {

    name: "room1",

    bg: "assets/bg.png",

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

        to: "lobby",

        spawn: {
          x: 500,
          y: 200
        }
      }
    ],

    obstacles: []
  }
};