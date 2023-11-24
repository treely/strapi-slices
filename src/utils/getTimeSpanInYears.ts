const getTimeSpanInYears = (start: Date, end: Date) => {
  const monthsDifference = end.getMonth() - start.getMonth();
  const yearsDifference = end.getFullYear() - start.getFullYear();

  if (monthsDifference > 4) {
    return yearsDifference + 1;
  }
  if (monthsDifference < -4) {
    return yearsDifference - 1;
  }
  return yearsDifference;
};

export default getTimeSpanInYears;
