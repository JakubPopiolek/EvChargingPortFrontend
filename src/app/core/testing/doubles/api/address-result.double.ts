import { Address } from '../../../interfaces/PersonalDetails.interface';

export class AddressResultDouble {
  public static prepareSuccessfulResultTwoAddresses(): Address[] {
    return [
      {
        line1: 'testLine1-1',
        line2: 'testLine2-1',
        city: 'testCity-1',
        province: 'testProvince-1',
        postcode: 'testPostcode-1',
      },
      {
        line1: 'testLine1-2',
        line2: 'testLine2-2',
        city: 'testCity-2',
        province: 'testProvince-2',
        postcode: 'testPostcode-2',
      },
    ];
  }

  public static prepareSuccessfulResultOneAddress(): Address[] {
    return [
      {
        line1: 'testLine1-1',
        line2: 'testLine2-1',
        city: 'testCity-1',
        province: 'testProvince-1',
        postcode: 'testPostcode-1',
      },
    ];
  }
}
