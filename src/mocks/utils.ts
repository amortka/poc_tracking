const pathLength = 27.22;
const speed = 5000 / 3600;
const sensors = [
  { sensorId: 'pnxwxnpk', distance: 0.0 },
  { sensorId: 'saruefli', distance: 0.163 },
  { sensorId: 'piunnkuf', distance: 0.231 },
  { sensorId: 'izktgqna', distance: 0.298 },
  { sensorId: 'xzfsgxxh', distance: 0.396 },
  { sensorId: 'qwbmjtmf', distance: 0.534 },
  { sensorId: 'quqklxup', distance: 0.602 },
  { sensorId: 'zapgjpha', distance: 0.67 },
  { sensorId: 'jpgsbunl', distance: 0.809 },
  { sensorId: 'aihfuhkc', distance: 0.886 },
  { sensorId: 'pnxwxnpk', distance: 1 },
];

// Example
// pathLength: 27.22m
// Speed: 5km/h -> 1.3889m/s
// sensorId: 'pnxwxnpk', distance: 0.0 -> 0m -> +0s
// sensorId: 'saruefli', distance: 0.163 -> 4.43686‬m -> ​+6.1623s
// sensorId: 'piunnkuf', distance: 0.231 -> 6.28782‬m -> ​+2.5707s
// sensorId: 'izktgqna', distance: 0.298 -> 8.111559m -> ​+2.5329s
// sensorId: 'xzfsgxxh', distance: 0.396 -> 10.77912m -> ​+3.7049s
// sensorId: 'qwbmjtmf', distance: 0.534 -> 14.53548m -> ​+5.2171s
// sensorId: 'quqklxup', distance: 0.602 -> 16.38644m -> ​+2.5707s
// sensorId: 'zapgjpha', distance: 0.67  -> 18.2374m -> ​+2.5707s
// sensorId: 'jpgsbunl', distance: 0.809 -> 22.02098m -> ​+5.2549s
// sensorId: 'aihfuhkc', distance: 0.886 -> 24.11692m -> ​+2.9110s
// sensorId: 'pnxwxnpk', distance: 1 -> 27.22m -> +4.3098s

const generateSensorDelays = (
  length: number = pathLength,
  sensorsData: typeof sensors = sensors,
  avgSpeed: number = speed
) => {
  return sensorsData
    .map((data) => ({ ...data, meters: data.distance * length }))
    .reduce((acc, data, index) => {
      return [
        ...acc,
        {
          ...data,
          diffMeters: data.meters - (index > 1 ? acc[index - 1].meters : 0),
        },
      ];
    }, [])
    .map((data) => ({
      ...data,
      delay: data.diffMeters * avgSpeed,
    }));
};

export { generateSensorDelays };
