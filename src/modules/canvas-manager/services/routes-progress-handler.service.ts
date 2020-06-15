import { IRouteServiceCallback, RouteService } from './routes-progress.service';

export class RoutesProgressHandlerService {
  private static instance: RoutesProgressHandlerService;

  readonly routesServices = new Map<string, RouteService>();

  private constructor() {}

  static getInstance(): RoutesProgressHandlerService {
    if (!RoutesProgressHandlerService.instance) {
      RoutesProgressHandlerService.instance = new RoutesProgressHandlerService();
    }

    return RoutesProgressHandlerService.instance;
  }

  updateRoutesServicesByIds(routesId: string[], cta: IRouteServiceCallback): void {
    const servicesToCreate = this.getNotExistingRoutesServicesIds(routesId);
    this.createServices(servicesToCreate);

    routesId.forEach((routeId) => this.routesServices.get(routeId).registerCallback(cta));
  }

  clearRoutesServicesByIds(routesId: string[], cta: IRouteServiceCallback): void {
    routesId.forEach((routeId) => this.routesServices.get(routeId).unregisterCallback(cta));
  }

  private getNotExistingRoutesServicesIds(routesId: string[]): string[] {
    return [...routesId].filter((id) => !this.routesServices.has(id));
  }

  private createServices(routesIds: string[]): void {
    routesIds.forEach((id) => {
      this.routesServices.set(id, new RouteService(id));
    });
  }
}
