export const parseToTemperature = (temperatura: number): number => {
  const kalvin = 273.15;
  return Math.round(temperatura - kalvin);
};
