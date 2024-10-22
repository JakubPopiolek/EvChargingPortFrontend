import { AddressServiceResponse } from '../../../interfaces/AddressServiceResponse.interface';

export class AddressResultDouble {
  public static prepareSuccessfulResultTwoAddresses(): AddressServiceResponse[] {
    return [
      {
        Id: 'GB|RM|B|7423468|ENG',
        Text: '42 someStreet someCounty AA1 2BB',
      },
      {
        Id: 'GB|RM|B|3456442|ENG',
        Text: '90 otherStreet otherCounty CC3 4DD',
      },
    ];
  }

  public static prepareSuccessfulResultOneAddress(): AddressServiceResponse[] {
    return [
      {
        Id: 'GB|RM|B|7421068|ENG',
        Text: '42 singleAddress singleCounty EE5 6FF',
      },
    ];
  }
}
