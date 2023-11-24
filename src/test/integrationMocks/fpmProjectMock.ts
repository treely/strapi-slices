import FPMProject from '@/models/fpm/FPMProject';

const fpmProjectMock: FPMProject = {
  id: '1',
  title: 'Project 1',
  geom: {
    type: 'Point',
    coordinates: [10.036542145100883, 47.42636837845707],
  },
  area: 1400000,
  location: 'Austria',
  start: new Date('2020-01-01'),
  end: new Date('2050-12-31'),
  projectType: {
    title: 'Project Type 1',
    id: '1',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  projectDeveloper: {
    name: 'Project Developer 1',
    id: '1',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  verificationStandard: {
    id: 'SilvaconsultFCSISO14',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01'),
  },
  forecastedAmountYearly: 100,
  riskBuffer: 10,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
};

export default fpmProjectMock;
