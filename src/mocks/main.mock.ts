import { ProductionHall } from '../models/main.model'

export const productionHallMock: ProductionHall = {
  objects: { undefined },
  path: {},
  points: {
    sm6nf67n: { x: 0, y: 0 },
    n2o9zu3r: { x: 13.48, y: 0 },
    otov69hw: { x: 13.48, y: 6.75 },
  },
  sensors: {},
  walls: {
    ezzgwvd4: {
      start: 'sm6nf67n',
      end: 'n2o9zu3r',
      thickness: 0.2,
      meta: {
        holes: {
          xygtl1oo: {
            start: 8.86,
            width: 4,
            height: 270,
            fromGround: 0.1,
          },
        },
      },
    },
    sw4py33t: {
      start: 'n2o9zu3r',
      end: 'otov69hw',
      thickness: 0.2,
      meta: {
        holes: {
          pzr6vr6o: {
            start: 0.54,
            width: 1.21,
            height: 2.7,
            fromGround: 0,
          },
          // goisx17k: {
          //   start:
          // }
        },
      },
    },
  },
  rooms: {
    kn3gtnyz: {
      walls: ['kn3gtnyz'],
      tag: 'Main Room',
    },
  },
}
