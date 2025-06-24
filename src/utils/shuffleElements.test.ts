import shuffleElements from './shuffleElements';

const originalSlides = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

describe('shuffleElement', () => {
  it('returns a new array with the same elements without mutating the original array', () => {
    const shuffled = shuffleElements(originalSlides);

    // Check that the shuffled array is not the same reference as the original
    expect(shuffled).not.toBe(originalSlides);

    // Check that the shuffled array has the same elements as the original
    expect(shuffled).toEqual(expect.arrayContaining(originalSlides));
    expect(originalSlides).toEqual(expect.arrayContaining(shuffled));

    // Check that the arrays have the same length
    expect(shuffled).toHaveLength(originalSlides.length);
  });

  it('produces a different order when shuffled multiple times', () => {
    // Test multiple shuffles to ensure at least one produces a different order
    const shuffles = [
      shuffleElements(originalSlides),
      shuffleElements(originalSlides),
      shuffleElements(originalSlides),
    ];

    // Check that at least one shuffle produces a different order
    const hasDifferentOrder = shuffles.some((shuffled) => {
      return shuffled.some(
        (element, index) => element.id !== originalSlides[index].id
      );
    });

    expect(hasDifferentOrder).toBe(true);
  });
});
