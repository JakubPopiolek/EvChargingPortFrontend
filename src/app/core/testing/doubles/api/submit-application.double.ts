import {
  ApplicationSubmission,
  ApplicationSubmissionResponse,
} from '../../../interfaces/ApplicationSubmission.interface';

export class SubmitApplicationDouble {
  public static prepareApplicationSubmission(): ApplicationSubmissionResponse {
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
}
