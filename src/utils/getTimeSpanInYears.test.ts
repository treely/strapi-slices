import getTimeSpanInYears from './getTimeSpanInYears';

describe('The getTimeSpanInYears util', () => {
  it('counts the difference in years between start and end dates', () => {
    const startDate = new Date('2021-01-01');
    const endDate = new Date('2031-01-01');
    const result = getTimeSpanInYears(startDate, endDate);

    expect(result).toBe(10);
  });

  it('counts the difference in years between start and end dates and adds one year more, if the months difference is more than 6 ', () => {
    const startDate = new Date('2031-01-01');
    const endDate = new Date('2041-12-31');
    const result = getTimeSpanInYears(startDate, endDate);

    expect(result).toBe(11);
  });

  it('counts the difference of more than 6 months for an entire year', () => {
    const startDate = new Date('2041-05-01');
    const endDate = new Date('2041-12-31');
    const result = getTimeSpanInYears(startDate, endDate);

    expect(result).toBe(1);
  });

  it('counts the difference in years also considering the amount of months', () => {
    const startDate = new Date('2041-12-01');
    const endDate = new Date('2043-01-01');
    const result = getTimeSpanInYears(startDate, endDate);

    expect(result).toBe(1);
  });
});
