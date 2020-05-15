import { ISelection, ISelectionData, ISelectionTooltip } from '../../../../models/main.model';
import { ObjectType } from '../../contexts/EventsContext';
import * as THREE from 'three';

export class SelectionUtils {
  static collectAllData(
    selection: ISelection,
    camera: THREE.Camera,
    scene: THREE.Scene,
    viewport: { width: number; height: number }
  ): ISelectionData {
    const result: ISelectionData = { sensors: {}, vehicles: {} };

    for (let [objectsType, objectIds] of Object.entries(selection)) {
      if (objectsType === 'sensors') {
        objectIds.forEach((objectId) => {
          console.log({ objectsType, objectId });
          const selectionData: ISelectionTooltip = {
            coordinates: undefined,
            description: '',
            objectType: ObjectType.SENSOR,
            title: '',
          };

          const mesh = scene.getObjectByName(`SENSOR_${objectId}`);

          if (mesh) {
            selectionData.title = mesh.userData['tag'];
            const position = mesh.position.clone();
            const vector = position.project(camera);

            selectionData.coordinates = {
              x: (-(vector.y - 1) * viewport.height) / 2,
              y: ((vector.x + 1) * viewport.width) / 2,
            };
          }
          result[objectsType][objectId] = selectionData;
        });
      }
    }

    return result;
  }
}
