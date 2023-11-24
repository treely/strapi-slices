import Issuer from './Issuer';

interface FPMProject {
  id: string;
  title: string;

  isPublic?: boolean;
  geom?: {
    type: 'Point';
    coordinates: [number, number];
  };
  area?: number;
  location?: string;
  start?: Date;
  end?: Date;
  projectType?: {
    title: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  projectDeveloper?: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  verificationStandard?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  forecastedAmountYearly?: number;
  riskBuffer?: number;
  defaultIssuer?: Issuer;

  createdAt: Date;
  updatedAt: Date;
}

export default FPMProject;
