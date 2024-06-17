import { MiddlewareConsumer, NestMiddleware } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CommonRequestMiddleware } from "src/middleware/common.request.middleware";
import { AppModule } from "../app.module";
import { createMock } from "@golevelup/ts-jest";

describe("AppModule", () => {
  let module: TestingModule;
  let middlewareConsumer: MiddlewareConsumer;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    middlewareConsumer = createMock<MiddlewareConsumer>();
  });

  it("should be defined", () => {
    expect(module).toBeDefined();
  });

  it("should configure the middleware", () => {
    const app = new AppModule();
    app.configure(middlewareConsumer);
    expect(middlewareConsumer.apply).toHaveBeenCalledWith(
      CommonRequestMiddleware
    );
  });
});
