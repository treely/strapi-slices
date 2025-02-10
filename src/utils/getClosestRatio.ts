const ALLOWED_RATIOS = [2 / 3, 1 / 1, 3 / 2, 2 / 1, 3 / 1, 4 / 1, 5 / 1]; // width / height

export const getClosestRatio = (width: number, height: number): number => {
  const ratio = width / height;

  let minDiff = Math.abs(ratio - ALLOWED_RATIOS[0]);
  let posMinDiff = 0;

  ALLOWED_RATIOS.forEach((allowedRatio, index) => {
    if (Math.abs(ratio - allowedRatio) < minDiff) {
      minDiff = Math.abs(ratio - allowedRatio);
      posMinDiff = index;
    }
  });

  return ALLOWED_RATIOS[posMinDiff];
};
