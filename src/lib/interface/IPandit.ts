import type { IAddress } from "./IAddress";

export interface IPanditCreateUpdate {
  userId: number;
  fullName: string;
  languages: string;
  experienceInYears: number;
  address: IAddress;
}

export interface IListPanditResponse {
  panditId: string;
  fullName: string;
  languages: string;
  experienceInYears: number;
  verificationState: string;
  city: string;
  country: string;
}

export interface IPanditResponse {
  panditId: string;
  fullName: string;
  languages: string;
  experienceInYears: number;
  verificationState?: string;
  averageRating?: number;
  city?: string;
  country?: string;
  pujaTypes: IPujaTypeResponse[];
  verifications: IVerificationResponse[];
}

export interface IPujaTypeResponse {
  id: string;
  name: string;
  description?: string;
  isRecurring: boolean;
}

export interface IVerificationResponse {
  id: string;
  documentName: string;
  documentPath: string;
  verifiedOn: string;
}
