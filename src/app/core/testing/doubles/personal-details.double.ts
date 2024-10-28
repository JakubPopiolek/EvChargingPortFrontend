import { PersonalDetails } from '../../interfaces/PersonalDetails.interface';

export class PersonalDetailsDouble {
  public static preparePersonalDetails(): PersonalDetails {
    return {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'testEmail',
      address: {
        id: 'testId',
        postcode: 'testPostcode',
        line1: 'testAddressLineOne',
        line2: 'testAddressLineTwo',
        province: 'testCounty',
        city: 'testTownOrCity',
      },
    };
  }
}
