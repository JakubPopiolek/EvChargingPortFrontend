import {
  Application,
  ApplicationSubmissionResponse,
} from '../../../interfaces/Application.interface';

export class ApplicationDouble {
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

  public static prepareApplication(): Application {
    return {
      referenceNumber: 'testRefNumber',
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

  public static prepareApplication_onlyId(): Application {
    return {
      referenceNumber: 'testRefNumber',
      firstName: null,
      lastName: null,
      email: null,
      address: {
        postcode: null,
        line1: null,
        line2: null,
        province: null,
        city: null,
      },
      vrn: null,
    };
  }
}
