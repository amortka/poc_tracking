import { useEffect, useMemo, useState } from 'react';
import { awaitAfterLoop, progress } from '../../../../mocks/vehicle.mock';

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

  useEffect(() => {
    const idInterval = setInterval(() => {
      setDisplayValue((current) => (current <= 1 ? totalTime : --current));
    }, 1000);
    return () => clearInterval(idInterval);
  }, [totalTime]);

  return displayValue;
}

export function useNextStationCounter(): number {
  const scenarioStepsTime = useScenarioStepsTime();
  const [displayValue, setDisplayValue] = useState<number>(scenarioStepsTime[0]);

  useEffect(() => {
    let currentTimeIndex = 0;
    const idInterval = setInterval(() => {
      setDisplayValue((current) => {
        if (current <= 1 || Number.isNaN(current)) {
          currentTimeIndex = currentTimeIndex === scenarioStepsTime.length - 1 ? 0 : currentTimeIndex + 1;
          return scenarioStepsTime[currentTimeIndex];
        } else {
          return --current;
        }
      });
    }, 1000);
    return () => clearInterval(idInterval);
  }, [scenarioStepsTime]);

  return displayValue;
}
