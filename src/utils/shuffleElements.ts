const shuffleElements = (slides: any[]) => {
  const slidesCopy = [...slides]; // Create a copy to avoid mutating the original array
  for (let i = slidesCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slidesCopy[i], slidesCopy[j]] = [slidesCopy[j], slidesCopy[i]];
  }
  return slidesCopy;
};

export default shuffleElements;
