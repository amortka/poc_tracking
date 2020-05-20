import { Camera, Scene } from 'three';

import { ISelection, ISelectionData, ISelectionTooltip } from '../../../../models/main.model';
import { ObjectType } from '../../canvas.model';

export class SelectionUtils {
  static collectAllData(
    selection: ISelection,
    camera: Camera,
    scene: Scene,
    viewport: { width: number; height: number }
  ): ISelectionData {
    const result: ISelectionData = {};

    for (let [objectsType, objectIds] of Object.entries(selection)) {
      objectIds.forEach((objectId) => {
        const selectionData: ISelectionTooltip = {
          coordinates: undefined,
          description: '',
          objectType: ObjectType.SENSOR,
          title: '',
        };

        const mesh = scene.getObjectByName(`${objectsType}_${objectId}`);

        if (mesh) {
          selectionData.title = mesh.userData['tag'];
          const position = mesh.position.clone();
          const vector = position.project(camera);

          selectionData.coordinates = {
            y: (-(vector.y - 1) * viewport.height) / 2,
            x: ((vector.x + 1) * viewport.width) / 2,
          };
        }
        result[`${objectsType}_${objectId}`] = selectionData;
      });
    }

    return result;
  }
}
