import { ApiEvent, IApiObjectResourceUpdate } from '../app.model';

export class ObjectResourceMock {
  private interval;
  readonly objects = [
    { objectId: 'vbisqysg', resourceIndicator: 0.7, decrementValue: 0.04 },
    { objectId: 'hcgrauti', resourceIndicator: 0.5, decrementValue: 0.06 },
    { objectId: 'kkshvomj', resourceIndicator: 0.9, decrementValue: 0.03 },
    { objectId: 'ycjfzvlk', resourceIndicator: 0.8, decrementValue: 0.04 },
  ];

  private stopProcess: boolean = false;

  constructor(private socketIo: any) {}

  stopSimulation(): void {
    this.stopProcess = true;
    clearInterval(this.interval);
  }

  startSimulation(): void {
    this.stopProcess = false;
    this.simulateScenario();
  }

  private simulateScenario(): void {
    this.interval = setInterval(() => {
      this.objects.forEach((o, i) => {
        ((o, i) =>
          setTimeout(() => {
            this.objects[i].resourceIndicator -= this.objects[i].decrementValue;
            this.objects[i].resourceIndicator =
              this.objects[i].resourceIndicator < 0.1 ? 0.1 : this.objects[i].resourceIndicator;
            this.updateObject([{ objectId: o.objectId, resourceIndicator: this.objects[i].resourceIndicator }]);
          }, i * 350))(o, i);
      });
    }, 3000);
  }

  private updateObject(patch: IApiObjectResourceUpdate): void {
    this.socketIo.emit(ApiEvent.OBJECT_UPDATE, patch);
  }
}
