import { GROUP_STATUSES, JOURNEY_REQUEST } from "src/common/constants";
import { AVAILABILTY_MAP, CAR } from "src/modules/cars/tests/__mockData__";
import { assignJourney, getCurrentAndUpdatedSeats } from "../journey.helper";

describe("assign a Journey", () => {
  it("returns status and car id for assigned", () => {
    const { status, carId } = assignJourney(6, AVAILABILTY_MAP);
    expect(status).toBe(GROUP_STATUSES.TRAVELLING);
    expect(carId).toBe(101);
  });

  it("returns status for waiting", () => {
    const { status, carId } = assignJourney(7, AVAILABILTY_MAP);
    expect(status).toBe(GROUP_STATUSES.WAITING);
    expect(carId).toBe(undefined);
  });
});

describe("get current seats and updated seats", () => {
  let carsDb: any;

  it("returns current and updated seats after assigning a new journey", () => {
    carsDb = {
      getCarById: (carId: number) => ({
        seats: 6,
        currentTravellers: 0,
      }),
    };
    const { currentSeats, updatedSeats } = getCurrentAndUpdatedSeats(
      carsDb,
      101,
      4,
      JOURNEY_REQUEST.ASSIGNED
    );
    expect(currentSeats).toBe(6);
    expect(updatedSeats).toBe(2);
  });

  it("returns current and updated seats after a journey dropoff", () => {
    carsDb = {
      getCarById: (carId: number) => ({
        seats: 6,
        currentTravellers: 4,
      }),
    };
    const { currentSeats, updatedSeats } = getCurrentAndUpdatedSeats(
      carsDb,
      101,
      4,
      JOURNEY_REQUEST.DROPOFF
    );
    expect(currentSeats).toBe(2);
    expect(updatedSeats).toBe(6);
  });
});
