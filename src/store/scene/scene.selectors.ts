import { AppState } from '../main.store';
import { createSelector } from 'reselect';
import { IObject, IPath, ISensor } from '../../modules/canvas/canvas.model';
import { Dictionary } from '../../app.model';

export class SceneSelectors {
  static scene = createSelector(
    (state: AppState) => state.scene,
    (scene) => scene
  );
  static paths = createSelector(SceneSelectors.scene, (scene) => scene.paths);
  static points = createSelector(SceneSelectors.scene, (scene) => scene.points);
  static objects = createSelector(SceneSelectors.scene, (scene) => scene.objects);
  static sensors = createSelector(SceneSelectors.scene, (scene) => scene.sensors);

  static getPath = (pathId: string) => createSelector(SceneSelectors.paths, (paths) => paths[pathId]);

  static getRouteVisualisationSceneByPathId = (pathId: string) =>
    createSelector(
      [SceneSelectors.paths, SceneSelectors.objects, SceneSelectors.sensors, SceneSelectors.points],
      (paths, objects, sensors, points) => {
        const selectedPath: IPath = paths[pathId];

        const selectedObjects: Dictionary<IObject> = {};
        selectedPath.objects.forEach(({ objectId }) =>
          Object.assign(selectedObjects, { [objectId]: objects[objectId] })
        );

        const firstSensorId = selectedPath.sensors[0].sensorId;
        const lastSensorId = selectedPath.sensors[selectedPath.sensors.length - 1].sensorId;
        const selectedSensors: Dictionary<ISensor> = {
          start: { ...sensors[firstSensorId] },
          end: { ...sensors[lastSensorId] },
        };

        return { path: selectedPath, objects: selectedObjects, sensors: selectedSensors, points };
      }
    );
}
