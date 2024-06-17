import { Test, TestingModule } from "@nestjs/testing";
import { JourneyModule } from "../journey.module";

describe("Journey module", () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [JourneyModule],
    }).compile();
  });

  it("should be defined", () => {
    expect(module).toBeDefined();
  });
});
