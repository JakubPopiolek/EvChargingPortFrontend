import { PersonalDetails } from '../../interfaces/PersonalDetails.interface';

export class PersonalDetailsDouble {
  public static preparePersonalDetails(): PersonalDetails {
    return {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'testEmail',
      address: {
        postcode: 'testPostcode',
        addressLineOne: 'testAddressLineOne',
        addressLineTwo: 'testAddressLineTwo',
        county: 'testCounty',
        townOrCity: 'testTownOrCity',
      },
    };
  }
}
