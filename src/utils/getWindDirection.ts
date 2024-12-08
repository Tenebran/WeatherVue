export const getWindDirection = (deg: number) => {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

  const index = Math.round(deg / 45) % 8;
  return directions[index];
};
