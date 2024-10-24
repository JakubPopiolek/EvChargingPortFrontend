export interface PersonalDetails {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  address: Address | null;
}

export interface Address {
  postcode: string | null;
  addressLineOne: string | null;
  addressLineTwo: string | null;
  townOrCity: string | null;
  county: string | null;
}
