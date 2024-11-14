import { Address } from './PersonalDetails.interface';

export interface Application {
  referenceNumber: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  address?: Address | null;
  vrn?: string | null;
}

export interface ApplicationSubmissionResponse {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  address: Address | null;
  vrn: string | null;
}
