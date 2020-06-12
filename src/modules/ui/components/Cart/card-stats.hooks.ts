import { useMemo, useRef, useState } from 'react';
import { awaitAfterLoop, progress } from '../../../../mocks/vehicle.mock';
import { useInterval } from '../../custom-hooks/use-iterval.hook';

export function useScenarioStepsTime(): number[] {
  return useMemo(
    () =>
      Object.values(progress)
        .reduce(
          (accumulator, currentValue, i, array) => {
            const arrayLength = accumulator.length;

            accumulator[arrayLength - 1] += currentValue.delay;

            if (array[i + 1]?.objectId) {
              accumulator.push(0);
            }
            if (!array[i + 1]) {
              accumulator[arrayLength - 1] += awaitAfterLoop;
            }
            return accumulator;
          },
          [0]
        )
        .map((v) => v / 1000),
    []
  );
}

export function useScenarioTotalTime(): number {
  const scenarioStepsTime = useScenarioStepsTime();
  return useMemo(() => scenarioStepsTime.reduce((accumulator, currentValue) => (accumulator += currentValue), 0), [
    scenarioStepsTime,
  ]);
}

export function useFinishRouteCounter(): number {
  const totalTime = useScenarioTotalTime();
  const [displayValue, setDisplayValue] = useState<number>(totalTime);

  const intervalClb = () => {
    setDisplayValue((current) => (current <= 1 ? totalTime : --current));
  };
  useInterval(intervalClb, 1000);

  return displayValue;
}

export function useNextStationCounter(): number {
  const scenarioStepsTime = useScenarioStepsTime();
  const [displayValue, setDisplayValue] = useState<number>(scenarioStepsTime[0]);

  const currentTimeIndex = useRef(0);
  const intervalClb = () => {
    setDisplayValue((current) => {
      if (current <= 1 || Number.isNaN(current)) {
        currentTimeIndex.current =
          currentTimeIndex.current === scenarioStepsTime.length - 1 ? 0 : currentTimeIndex.current + 1;
        return scenarioStepsTime[currentTimeIndex.current];
      } else {
        return --current;
      }
    });
  };
  useInterval(intervalClb, 1000);

  return displayValue;
}
