import { ArgumentMetadata } from "@nestjs/common";
import { createCarsSchema } from "src/modules/cars/cars.schema";
import { CARS_LIST, CARS_MOCK_DATA } from "src/modules/cars/tests/__mockData__";
import { ZodValidationPipe } from "../ZodValidationPipe";

describe("Common requeset middleware", () => {
  let zodValidationPipe: ZodValidationPipe;
  let mockMetaData: ArgumentMetadata;
  beforeAll(async () => {
    zodValidationPipe = new ZodValidationPipe(createCarsSchema);
  });

  it("should return parsed data for valid data", () => {
    const mockData = CARS_MOCK_DATA;
    const result = zodValidationPipe.transform(mockData, mockMetaData);
    expect(result).toEqual(CARS_MOCK_DATA);
  });

  it("should throw error for invalid data", () => {
    const mockData = [{ id: "1", seats: "101" }];
    expect(() =>
      zodValidationPipe.transform(mockData, mockMetaData)
    ).toThrowError("Validation failed");
  });
});
