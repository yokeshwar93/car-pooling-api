import { constructCarsMap } from "../cars.helper";
import {
  CARS_MOCK_DATA,
  CARS_MOCK_DATA_1,
  CONSTRUCT_CARS_MAP,
  CONSTRUCT_CARS_MAP_1,
} from "./__mockData__";

describe("constructCarsMap", () => {
  it("should return a object with cars and availabilty map", () => {
    const result = CONSTRUCT_CARS_MAP;
    const result1 = CONSTRUCT_CARS_MAP_1;
    expect(constructCarsMap(CARS_MOCK_DATA)).toEqual(result);
    expect(constructCarsMap(CARS_MOCK_DATA_1)).toEqual(result1);
  });
});
