import shuffleElements from './shuffleElements';

const originalSlides = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

describe('shuffleElement', () => {
  it('returns a new array with the same elements but in a different order', () => {
    const shuffled = shuffleElements(originalSlides);

    // Check that the shuffled array is not the same reference as the original
    expect(shuffled).not.toBe(originalSlides);

    // Check that the shuffled array has the same elements as the original
    expect(shuffled).toEqual(expect.arrayContaining(originalSlides));
    expect(originalSlides).toEqual(expect.arrayContaining(shuffled));

    // Verify that at least one element is in a different position to ensure it's shuffled
    const isShuffled = originalSlides.some(
      (slide, index) => slide.id !== shuffled[index].id
    );
    expect(isShuffled).toBe(true);
  });

  it('does not mutate the original array', () => {
    const originalSlidesCopy = [...originalSlides];
    shuffleElements(originalSlides);

    // Verify that the original array remains unchanged
    expect(originalSlides).toEqual(originalSlidesCopy);
  });
});
