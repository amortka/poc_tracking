import { BorderType, IVisualizationScene, TextSize } from './canvas.model';

export const visualizationSceneMock: IVisualizationScene = {
  objects: {
    // L3
    wukfpzgn: {
      shapePoints: ['hjqbfgyn', 'kjdyzeyc', 'aooqiwgn', 'jjxesuop'],
      height: 0,
      fromGround: 0.001,
      meta: {
        name: 'L3',
        textSize: TextSize.LARGE,
      },
    },
    // L2
    zassgxxq: {
      shapePoints: ['uihdfjwv', 'lludbgne', 'esrfytri', 'quasprkl'],
      height: 0,
      fromGround: 0.001,
      meta: {
        name: 'L2',
        textSize: TextSize.LARGE,
      },
    },
    // L1
    fzmocfah: {
      shapePoints: ['ajxiqssn', 'qnozzmzr', 'wovbphyc', 'jtmeqtmc'],
      height: 0,
      fromGround: 0.001,
      meta: {
        name: 'L1',
        textSize: TextSize.LARGE,
      },
    },
    // L3B
    muiiyabw: {
      shapePoints: ['uajkikpv', 'bxepajao', 'wbngvreb', 'evnoffqc'],
      height: 0.5,
      fromGround: 0.01,
      meta: {
        name: 'L3B',
        textSize: TextSize.SMALL,
        selectable: true,
      },
    },
    // L3A
    hcgrauti: {
      shapePoints: ['usabopap', 'gkmuruwo', 'immfkhuu', 'znexkvmy'],
      height: 0.5,
      fromGround: 0.01,
      meta: {
        name: 'L3A',
        textSize: TextSize.SMALL,
        selectable: true,
      },
    },
    // L3C
    kkshvomj: {
      shapePoints: ['rnvrpfms', 'uhitdpip', 'totheacj', 'igjjiztd'],
      height: 0.5,
      fromGround: 0.01,
      meta: {
        name: 'L3C',
        textSize: TextSize.SMALL,
        selectable: true,
      },
    },
    // L2A
    ryqaobbn: {
      shapePoints: ['yehftwgj', 'ilouoodq', 'gnwcnczv', 'uzosscaf'],
      height: 0.5,
      fromGround: 0.01,
      meta: {
        name: 'L2A',
        textSize: TextSize.SMALL,
        selectable: true,
      },
    },
    // L2B
    oavzomsx: {
      shapePoints: ['poiwbfgz', 'lodeicuy', 'znocseqn', 'pirsxhnb'],
      height: 0.5,
      fromGround: 0.01,
      meta: {
        name: 'L2B',
        textSize: TextSize.SMALL,
        selectable: true,
      },
    },
    // L1A
    vbisqysg: {
      shapePoints: ['bovuldfh', 'jozyxcaa', 'xyqupfqs', 'fmqbomjp'],
      height: 0.5,
      fromGround: 0.01,
      meta: {
        name: 'L1A',
        textSize: TextSize.SMALL,
        selectable: true,
      },
    },
    // L1B
    ycjfzvlk: {
      shapePoints: ['mwbspruw', 'hjavskeu', 'jzwceyxp', 'otmkhoub'],
      height: 0.5,
      fromGround: 0.01,
      meta: {
        name: 'L1B',
        textSize: TextSize.SMALL,
        selectable: true,
      },
    }, // Warehouse
    etxmnxxf: {
      shapePoints: ['akyepqqo', 'cmjoeldy', 'icdbsniz', 'lmeikfil'],
      height: 0,
      fromGround: 0.001,
      meta: {
        name: 'WAREHOUSE',
        description: 'AREA M1',
        textSize: TextSize.MEDIUM,
        selectable: true,
        borderType: BorderType.DASHED,
      },
    },
    // Gate G1
    zzxcwumh: {
      shapePoints: ['pbtndrum', 'rbdepwzi', 'owkrvduz', 'bcicinqq'],
      height: 0,
      fromGround: 0.01,
      meta: {
        name: 'GATE G1',
        textSize: TextSize.SMALL,
        textRotation: Math.PI / 2,
      },
    },
    // Gate G2
    mmuxivkq: {
      shapePoints: ['twiecysq', 'gzgcijcz', 'xeqeqvey', 'mstiwdey'],
      height: 0,
      fromGround: 0.01,
      meta: {
        name: 'GATE G2',
        textSize: TextSize.SMALL,
        textRotation: Math.PI / 2,
      },
    },
  },
  paths: {
    ojihoybn: {
      points: ['nlyiefgt', 'ponbhqmp', 'flguqmoa', 'bxlnhzmb', 'acljbmkd', 'nlyiefgq'],
      tag: 'main path',
      sensors: [
        { sensorId: 'pnxwxnpk', distance: 0.0 },
        { sensorId: 'saruefli', distance: 0.146 },
        { sensorId: 'piunnkuf', distance: 0.218, relationHidden: true },
        { sensorId: 'izktgqna', distance: 0.288 },
        { sensorId: 'xzfsgxxh', distance: 0.391, relationHidden: true },
        { sensorId: 'qwbmjtmf', distance: 0.537 },
        { sensorId: 'quqklxup', distance: 0.607, relationHidden: true },
        { sensorId: 'zapgjpha', distance: 0.679 },
        { sensorId: 'jpgsbunl', distance: 0.827 },
        { sensorId: 'aihfuhkc', distance: 0.905, relationHidden: true },
        { sensorId: 'pnxwxnpk', distance: 1 },
      ],
      objects: [
        { objectId: 'vbisqysg', distance: 0.146 },
        { objectId: 'hcgrauti', distance: 0.288 },
        { objectId: 'kkshvomj', distance: 0.537 },
        { objectId: 'ycjfzvlk', distance: 0.679 },
      ],
      length: 25.92,
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

    // Sensors
    qeculymv: { x: 10.22, y: 0.37 },
    wytjebmg: { x: 6.43, y: 0.37 },
    etkehdxr: { x: 4.57, y: 0.37 },
    rzmgfdlc: { x: 2.75, y: 0.37 },
    dqwzllxi: { x: 1.9, y: 2.2 },
    sadvcvxl: { x: 2.75, y: 5.1 },
    ccomdgqr: { x: 4.57, y: 5.1 },
    lojlicgi: { x: 6.43, y: 5.1 },
    zohcrjma: { x: 10.22, y: 5.1 },
    xlrbndpv: { x: 10.22, y: 3.0 },

    //PATH ojihoybn
    nlyiefgt: { x: 10.22, y: 0.37 },
    ponbhqmp: { x: 1.9, y: 0.37 },
    flguqmoa: { x: 1.9, y: 5.1 },
    bxlnhzmb: { x: 10.22, y: 5.1 },
    acljbmkd: { x: 10.22, y: 0.55 },
    nlyiefgq: { x: 10.22, y: 0.55 },

    //L3
    hjqbfgyn: { x: 2.19, y: 0.57 },
    kjdyzeyc: { x: 3.32, y: 0.57 },
    aooqiwgn: { x: 3.32, y: 4.87 },
    jjxesuop: { x: 2.19, y: 4.87 },
    //L2
    uihdfjwv: { x: 4.01, y: 0.57 },
    lludbgne: { x: 5.14, y: 0.57 },
    esrfytri: { x: 5.14, y: 4.87 },
    quasprkl: { x: 4.01, y: 4.87 },
    //L1
    ajxiqssn: { x: 5.87, y: 0.57 },
    qnozzmzr: { x: 6.99, y: 0.57 },
    wovbphyc: { x: 6.99, y: 4.87 },
    jtmeqtmc: { x: 5.87, y: 4.87 },
    //L3B
    uajkikpv: { x: 2.19, y: 1.99 },
    bxepajao: { x: 2.61, y: 1.99 },
    wbngvreb: { x: 2.61, y: 2.41 },
    evnoffqc: { x: 2.19, y: 2.41 },
    //L3A
    usabopap: { x: 2.54, y: 0.57 },
    gkmuruwo: { x: 2.96, y: 0.57 },
    immfkhuu: { x: 2.96, y: 0.99 },
    znexkvmy: { x: 2.54, y: 0.99 },
    //L3C
    rnvrpfms: { x: 2.54, y: 4.45 },
    uhitdpip: { x: 2.96, y: 4.45 },
    totheacj: { x: 2.96, y: 4.87 },
    igjjiztd: { x: 2.54, y: 4.87 },
    //L2A
    yehftwgj: { x: 4.37, y: 0.57 },
    ilouoodq: { x: 4.78, y: 0.57 },
    gnwcnczv: { x: 4.78, y: 0.99 },
    uzosscaf: { x: 4.37, y: 0.99 },
    //L2B
    poiwbfgz: { x: 4.37, y: 4.45 },
    lodeicuy: { x: 4.78, y: 4.45 },
    znocseqn: { x: 4.78, y: 4.87 },
    pirsxhnb: { x: 4.37, y: 4.87 },
    //L1A
    bovuldfh: { x: 6.22, y: 0.57 },
    jozyxcaa: { x: 6.64, y: 0.57 },
    xyqupfqs: { x: 6.64, y: 0.99 },
    fmqbomjp: { x: 6.22, y: 0.99 },
    //L1B
    mwbspruw: { x: 6.22, y: 4.45 },
    hjavskeu: { x: 6.64, y: 4.45 },
    jzwceyxp: { x: 6.64, y: 4.87 },
    otmkhoub: { x: 6.22, y: 4.87 },
    // Warehouse
    akyepqqo: { x: 10, y: 0.15 },
    cmjoeldy: { x: 13.24, y: 0.15 },
    icdbsniz: { x: 13.24, y: 5.31 },
    lmeikfil: { x: 10, y: 5.31 },
    // Gate G1
    pbtndrum: { x: 10, y: 0.2 }, // 0.1
    rbdepwzi: { x: 10.45, y: 0.2 },
    owkrvduz: { x: 10.45, y: 1.6 }, // 0.3
    bcicinqq: { x: 10, y: 1.6 },
    // Gate G2
    twiecysq: { x: 10, y: 3.86 },
    gzgcijcz: { x: 10.45, y: 3.86 },
    xeqeqvey: { x: 10.45, y: 5.26 },
    mstiwdey: { x: 10, y: 5.26 },
  },
  sensors: {
    qwbmjtmf: {
      point: 'sadvcvxl',
      tag: 'Sensor 1',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    xzfsgxxh: {
      point: 'dqwzllxi',
      tag: 'Sensor 2',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    izktgqna: {
      point: 'rzmgfdlc',
      tag: 'Sensor 3',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    piunnkuf: {
      point: 'etkehdxr',
      tag: 'Sensor 4',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    saruefli: {
      point: 'wytjebmg',
      tag: 'Sensor 5',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    pnxwxnpk: {
      point: 'qeculymv',
      tag: 'Sensor 6',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    aihfuhkc: {
      point: 'xlrbndpv',
      tag: 'Sensor 7',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    jpgsbunl: {
      point: 'zohcrjma',
      tag: 'Sensor 8',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    zapgjpha: {
      point: 'lojlicgi',
      tag: 'Sensor 9',
      meta: {
        selected: false,
        selectable: true,
      },
    },
    quqklxup: {
      point: 'ccomdgqr',
      tag: 'Sensor 10',
      meta: {
        selected: false,
        selectable: true,
      },
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
            height: 2.2,
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
      meta: {},
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
      meta: {},
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
};
