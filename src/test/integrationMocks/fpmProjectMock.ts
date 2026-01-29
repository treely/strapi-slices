import FPMProject, { CreditAvailability } from '../../models/fpm/FPMProject';

const fpmProjectMock: FPMProject = {
  id: '1',
  title: 'Project 1',
  geom: {
    type: 'Point',
    coordinates: [10.036542145100883, 47.42636837845707],
  },
  area: 1400000,
  location: 'Austria',
  countryCode: 'AT',
  start: new Date('2020-01-01'),
  end: new Date('2050-12-31'),
  projectType: {
    title: 'Project Type 1',
    key: 'ifm',
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
  averageSellableAmountPerYear: 800000,
  riskBuffer: 10,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
  creditAvailability: CreditAvailability.CREDITS_AVAILABLE,
  certificationDate: new Date('2020-02-02'),
};

export default fpmProjectMock;
