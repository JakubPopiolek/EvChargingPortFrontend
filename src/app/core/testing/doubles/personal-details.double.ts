import { PersonalDetails } from '../../interfaces/PersonalDetails.interface';

export class PersonalDetailsDouble {
  public static preparePersonalDetails(): PersonalDetails {
    return {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'testEmail',
      postcode: 'testPostcode',
      buildingNumberName: 'testBuildingNumberName',
      fullAddress: 'testFullAddress',
    };
  }
}
