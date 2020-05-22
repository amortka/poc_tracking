import { IVisualizationScene, IVisualizationState, ISelection } from '../app.model';
import { ObjectType, VisualizationType } from '../modules/canvas/canvas.model';

export const visualizationSceneMock: IVisualizationScene = {
  objects: {
    bkgwbnwu: {
      shapePoints: ['xfblfcmx', 'cmtulzxs', 'gjcuvwgu', 'uazocvnx'],
      fromGround: 0.1,
      meta: {
        name: 'ecophon',
        description: '120x120',
        type: VisualizationType.D2,
      },
    },
    bkozixwk: {
      shapePoints: ['unxmnnfr', 'zboxtrvu', 'cqmcsiay', 'nstmcsir'],
      fromGround: 0.1,
      meta: {
        name: 'ecophon',
        description: '120x120',
        type: VisualizationType.D2,
      },
    },
    xgqewujr: {
      shapePoints: ['qyipxgyf', 'oaozugec', 'suvgtoul', 'sgvatdjc'],
      fromGround: 0.1,
      meta: {
        name: 'ecophon',
        description: '120x120',
        type: VisualizationType.D2,
      },
    },
    mdwlizmv: {
      shapePoints: ['h5jghnhl', 'o6c3mck5', 'lqximksu', 'janzaxld'],
      fromGround: 0.1,
      meta: {
        name: 'ecophon',
        description: '120x240',
        type: VisualizationType.D2,
      },
    },
    kstmxjew: {
      shapePoints: ['ophifqgn', 'pyaidnyh', 'vbowugex', 'qtvfipgx'],
      fromGround: 0.1,
      meta: {
        name: 'ecophon',
        description: '120x240',
        type: VisualizationType.D2,
      },
    },
    dbrolfrq: {
      shapePoints: ['aizmaxly', 'wlnnbsii', 'hddoeigl', 'dhwtktzq'],
      fromGround: 0.1,
      meta: {
        name: 'ecophon',
        description: '120x240',
        type: VisualizationType.D2,
      },
    },
    dhgolfqh: {
      shapePoints: ['gxoyvvhy', 'zditbxul', 'ousrgrvl', 'mjbwywey'],
      height: 1,
      fromGround: 0.1,
      meta: {
        name: 'Checkpoint 1',
      },
    },
  },
  paths: {
    ojihoybn: {
      points: ['nlyiefgt', 'ponbhqmp', 'flguqmoa', 'bxlnhzmb', 'acljbmkd', 'nlyiefgq'],
      tag: 'main path',
      sensors: [
        { sensorId: 'qeculymv', distance: 0.04 },
        { sensorId: 'wytjebmg', distance: 0.147 },
        { sensorId: 'etkehdxr', distance: 0.244 },
        { sensorId: 'rzmgfdlc', distance: 0.332 },
        { sensorId: 'dqwzllxi', distance: 0.422 },
        { sensorId: 'sadvcvxl', distance: 0.495 },
        { sensorId: 'ccomdgqr', distance: 0.583 },
        { sensorId: 'lojlicgi', distance: 0.682 },
        { sensorId: 'zohcrjma', distance: 0.791 },
        { sensorId: 'xlrbndpv', distance: 0.876 },
        { sensorId: 'qeculymv', distance: 0.953 },
      ],
    },
  },
  points: {
    sm6nf67n: { x: 0, y: 0 },
    n2o9zu3r: { x: 13.48, y: 0 },
    otov69hw: { x: 13.48, y: 6.75 },
    zgppagoc: { x: 8.11, y: 6.75 },
    qqsaokeb: { x: 8.11, y: 5.36 },
    aeeuewak: { x: 1.49, y: 5.36 },
    s5pyoioi: { x: 1.48, y: 1.3 },
    bbgexc3r: { x: 0, y: 1.28 },
    xfblfcmx: { x: 2.58, y: 0.73 },
    cmtulzxs: { x: 3.8, y: 0.73 },
    gjcuvwgu: { x: 3.81, y: 1.93 },
    uazocvnx: { x: 2.59, y: 1.93 },
    unxmnnfr: { x: 4.14, y: 0.73 },
    zboxtrvu: { x: 5.34, y: 0.72 },
    cqmcsiay: { x: 5.35, y: 1.93 },
    nstmcsir: { x: 4.14, y: 1.92 },
    qyipxgyf: { x: 5.7, y: 0.72 },
    oaozugec: { x: 6.9, y: 0.72 },
    suvgtoul: { x: 6.88, y: 1.93 },
    sgvatdjc: { x: 5.69, y: 1.93 },
    h5jghnhl: { x: 2.59, y: 2.15 },
    o6c3mck5: { x: 3.8, y: 2.15 },
    lqximksu: { x: 3.8, y: 4.55 },
    janzaxld: { x: 2.59, y: 4.55 },
    ophifqgn: { x: 4.13, y: 2.15 },
    pyaidnyh: { x: 5.35, y: 2.14 },
    vbowugex: { x: 5.34, y: 4.54 },
    qtvfipgx: { x: 4.13, y: 4.54 },

    aizmaxly: { x: 5.7, y: 2.14 },
    wlnnbsii: { x: 6.91, y: 2.14 },
    hddoeigl: { x: 6.91, y: 4.56 },
    dhwtktzq: { x: 5.7, y: 4.56 },

    gxoyvvhy: { x: 5.7, y: 2.54 },
    zditbxul: { x: 5.21, y: 2.54 },
    ousrgrvl: { x: 5.21, y: 4.06 },
    mjbwywey: { x: 5.7, y: 4.06 },

    sadvcvxl: { x: 1.49, y: 5.34 },
    dqwzllxi: { x: 1.52, y: 2.88 },
    rzmgfdlc: { x: 1.51, y: 0.01 },
    etkehdxr: { x: 4.27, y: 0.01 },
    wytjebmg: { x: 7.05, y: 0.02 },

    qeculymv: { x: 10.3, y: 0.03 },
    xlrbndpv: { x: 10.31, y: 2.77 },
    zohcrjma: { x: 10.3, y: 5.4 },
    lojlicgi: { x: 7.07, y: 5.34 },
    ccomdgqr: { x: 4.27, y: 5.34 },

    nlyiefgt: { x: 11.27, y: 0.27 },
    ponbhqmp: { x: 1.7, y: 0.3 },
    flguqmoa: { x: 1.7, y: 5.06 },
    bxlnhzmb: { x: 10.3, y: 5.08 },
    acljbmkd: { x: 10.27, y: 0.47 },
    nlyiefgq: { x: 11.27, y: 0.47 },
  },
  sensors: {
    qwbmjtmf: {
      point: 'sadvcvxl',
      tag: 'Sensor 1',
    },
    xzfsgxxh: {
      point: 'dqwzllxi',
      tag: 'Sensor 2',
    },
    izktgqna: {
      point: 'rzmgfdlc',
      tag: 'Sensor 3',
    },
    piunnkuf: {
      point: 'etkehdxr',
      tag: 'Sensor 4',
    },
    saruefli: {
      point: 'wytjebmg',
      tag: 'Sensor 5',
    },
    pnxwxnpk: {
      point: 'qeculymv',
      tag: 'Sensor 6',
    },
    aihfuhkc: {
      point: 'xlrbndpv',
      tag: 'Sensor 7',
    },
    jpgsbunl: {
      point: 'zohcrjma',
      tag: 'Sensor 8',
    },
    zapgjpha: {
      point: 'lojlicgi',
      tag: 'Sensor 9',
    },
    quqklxup: {
      point: 'ccomdgqr',
      tag: 'Sensor 10',
    },
  },
  walls: {
    ezzgwvd4: {
      start: 'sm6nf67n',
      end: 'n2o9zu3r',
      thickness: 0.1,
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
      thickness: 0.1,
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
      start: 'otov69hw',
      end: 'zgppagoc',
      thickness: 0.1,
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
    fytviige: {
      start: 'zgppagoc',
      end: 'qqsaokeb',
      thickness: 0.1,
      meta: {
        holes: {
          bbvuwocv: {
            start: 0.1,
            width: 0.8,
            height: 2.2,
            fromGround: 0,
          },
        },
      },
    },
    vzelifcm: {
      start: 'qqsaokeb',
      end: 'aeeuewak',
      thickness: 0.1,
    },
    ka9v61v5: {
      start: 'aeeuewak',
      end: 's5pyoioi',
      thickness: 0.1,
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
      thickness: 0.1,
    },
    jgxi5xqi: {
      start: 'bbgexc3r',
      end: 'sm6nf67n',
      thickness: 0.1,
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
      walls: ['ezzgwvd4', 'sw4py33t', 'jucu1uf9', 'fytviige', 'vzelifcm', 'ka9v61v5', 'e22c2u9q', 'jgxi5xqi'],
      tag: 'Main Room',
    },
  },
};

export const selectionMock: ISelection = {
  [ObjectType.SENSOR]: ['qwbmjtmf', 'xzfsgxxh', 'izktgqna', 'piunnkuf'],
};

export const visualizationStateMock: IVisualizationState = {
  vehicles: {
    trqzbojg: {
      tag: 'Milkrun ABC',
      dimensions: { x: 0.6, y: 0.4, z: 0.25 },
      segments: 1,
      velocity: 1,
      temperature: 20,
      humidity: 50,
      ambientPressure: 1,
    },
  },
  routes: {
    // fqfwxpzw: {
    //   vehicle: 'trqzbojg',
    //   path: 'ojihoybn',
    //   progress: 0.2,
    //   selected: true,
    // },
  },
  selection: selectionMock,
  isD3: true,
};
