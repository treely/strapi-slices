import Issuer from './Issuer';

export enum CreditAvailability {
  CREDITS_AVAILABLE = 'credits_available',
  NO_CREDITS_AVAILABLE = 'no_credits_available',
  SOME_CREDITS_AVAILABLE = 'some_credits_available',
  SOON_CREDITS_AVAILABLE = 'soon_credits_available',
}

interface FPMProject {
  id: string;
  title: string;
  description?: string;
  friendlyName?: string;

  isPublic?: boolean;
  geom?: {
    type: 'Point';
    coordinates: [number, number];
  };
  area?: number;
  location?: string;
  countryCode: string;
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
    friendlyName?: string;
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
  averageSellableAmountPerYear: number;
  riskBuffer?: number;
  defaultIssuer?: Issuer;
  creditAvailability: CreditAvailability;
  certificationDate?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export default FPMProject;
