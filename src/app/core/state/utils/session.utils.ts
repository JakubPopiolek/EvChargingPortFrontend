export class SessionUtils {
  public static getVehicleDetails() {
    const vehicleDetailsFromStorage = JSON.parse(
      localStorage.getItem('vehicleDetails') || '{}'
    );
    const vehicleDetails = vehicleDetailsFromStorage.vehicleDetails;
    return vehicleDetails;
  }
}
