const convertAreaM2ToHa = (areaInM2: string): number =>
  parseInt(areaInM2, 10) / 10000;

export default convertAreaM2ToHa;
