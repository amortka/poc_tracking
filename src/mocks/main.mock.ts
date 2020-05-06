import { IVisualisation } from '../models/main.model'

export const visualisationMock: IVisualisation = {
  objects: {},
  paths: {},
  points: {
    sm6nf67n: { x: 0, y: 0 },
    n2o9zu3r: { x: 13.48, y: 0 },
    otov69hw: { x: 13.48, y: 6.75 },
    aeeuewak: { x: 1.49, y: 5.36 },
    s5pyoioi: { x: 1.48, y: 1.3 },
    bbgexc3r: { x: 0, y: 1.28 },
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
          nv0glj1e: {
            start: 1.83,
            width: 1.91,
            height: 2.2,
            fromGround: 0,
          },
        },
      },
    },
    jucu1uf9: {
      start: 'goisx17k',
      end: 'aeeuewak',
      thickness: 0.2,
      meta: {
        holes: {
          pzr6vr6o: {
            start: 0.54,
            width: 1.21,
            height: 2.7,
            fromGround: 0,
          },
          goisx17k: {
            start: 3.81,
            width: 1.65,
            height: 2.7,
            fromGround: 0,
          },
        },
      },
    },
    ka9v61v5: {
      start: 'aeeuewak',
      end: 's5pyoioi',
      thickness: 0.2,
      meta: {
        holes: {
          yu723a51: {
            start: 1.49,
            width: 2.06,
            height: 2.07,
            fromGround: 0,
          },
        },
      },
    },
    e22c2u9q: {
      start: 's5pyoioi',
      end: 'bbgexc3r',
      thickness: 0.2,
    },
    jgxi5xqi: {
      start: 'bbgexc3r',
      end: 'sm6nf67n',
      thickness: 0.2,
      meta: {
        holes: {
          uotg7ieh: {
            start: 0.52,
            width: 0.87,
            height: 2.2,
          },
        },
      },
    },
  },
  rooms: {
    kn3gtnyz: {
      walls: ['ezzgwvd4', 'sw4py33t', 'jucu1uf9', 'ka9v61v5', 'e22c2u9q', 'jgxi5xqi'],
      tag: 'Main Room',
    },
  },
}
