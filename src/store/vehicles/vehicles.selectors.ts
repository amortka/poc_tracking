import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class VehiclesSelectors {
  static vehicles = createSelector(
    (state: AppState) => state.vehicles,
    (vehicles) => vehicles
  );
  static getVehicle = (vehicleId: string) =>
    createSelector(VehiclesSelectors.vehicles, (vehicles) => vehicles[vehicleId]);
}
