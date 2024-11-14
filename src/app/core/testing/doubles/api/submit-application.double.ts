import {
  ApplicationSubmission,
  ApplicationSubmissionResponse,
} from '../../../interfaces/Application.interface';

export class SubmitApplicationDouble {
  public static prepareApplicationSubmissionResponse(): ApplicationSubmissionResponse {
    return {
      id: 'testId',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'testEmail',
      address: {
        postcode: 'testPostcode',
        line1: 'testAddressLineOne',
        line2: 'testAddressLineTwo',
        province: 'testCounty',
        city: 'testTownOrCity',
      },
      vrn: 'testVRN',
    };
  }

  public static prepareApplicationSubmission(): ApplicationSubmission {
    return {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'testEmail',
      address: {
        postcode: 'testPostcode',
        line1: 'testAddressLineOne',
        line2: 'testAddressLineTwo',
        province: 'testCounty',
        city: 'testTownOrCity',
      },
      vrn: 'testVRN',
    };
  }
}
