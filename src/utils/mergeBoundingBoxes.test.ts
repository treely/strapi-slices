import mergeBoundingBoxes from './mergeBoundingBoxes';

describe('The mergeBoundingBoxes util', () => {
  it('returns the merged bounding box', () => {
    const result = mergeBoundingBoxes([
      [10, 10, 10, 10],
      [5, 5, 15, 15],
      [7, 7, 12, 12],
    ]);

    expect(result).toStrictEqual([5, 5, 15, 15]);
  });
});
