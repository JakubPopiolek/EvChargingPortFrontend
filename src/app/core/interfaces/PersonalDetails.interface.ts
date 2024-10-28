export interface PersonalDetails {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  address: Address | null;
}

export interface Address {
  id: string | null;
  line1: string | null;
  line2: string | null;
  city: string | null;
  province: string | null;
  postcode: string | null;
}
