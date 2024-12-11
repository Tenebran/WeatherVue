export const getWindDirection = (deg: number) => {
  const directions = [
    'directions.N',
    'directions.NE',
    'directions.E',
    'directions.SE',
    'directions.S',
    'directions.SW',
    'directions.W',
    'directions.NW',
  ];

  const index = Math.round(deg / 45) % 8;
  return directions[index];
};
