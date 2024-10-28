import { Address } from '../../../interfaces/PersonalDetails.interface';

export class AddressResultDouble {
  public static prepareSuccessfulResultTwoAddresses(): Address[] {
    return [
      {
        id: 'GB|RM|B|7423468|ENG',
        line1: 'testLine1-1',
        line2: 'testLine2-1',
        city: 'testCity-1',
        province: 'testProvince-1',
        postcode: 'testPostcode-1',
      },
      {
        id: 'GB|RM|B|3423551|ENG',
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
        id: 'GB|RM|B|7423468|ENG',
        line1: 'testLine1-1',
        line2: 'testLine2-1',
        city: 'testCity-1',
        province: 'testProvince-1',
        postcode: 'testPostcode-1',
      },
    ];
  }
}
