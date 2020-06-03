import { ISelection, IVisualizationState, ObjectType } from '../modules/canvas/canvas.model';

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
  objects: {},
  paths: {},
  routes: {},
  sensors: {},
  selection: selectionMock,
  isD3: true,
};
