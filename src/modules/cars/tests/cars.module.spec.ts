import { Test, TestingModule } from "@nestjs/testing";
import { CarsModule } from "../cars.module";

describe("Cars module", () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CarsModule],
    }).compile();
  });

  it("should be defined", () => {
    expect(module).toBeDefined();
  });
});
