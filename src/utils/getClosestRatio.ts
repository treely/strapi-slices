const ALLOWED_RATIOS = [2 / 3, 1 / 1, 3 / 2];

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
