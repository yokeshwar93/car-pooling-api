import { CommonRequestMiddleware } from "../common.request.middleware";
import { ERROR_MESSAGES } from "src/common/constants";

describe("Common requeset middleware", () => {
  let requestMiddleware;
  let mockRequest;
  let mockResponse;
  let mockNextFunction;

  beforeAll(async () => {
    requestMiddleware = new CommonRequestMiddleware();
    mockNextFunction = jest.fn();
  });

  it("should return content type error", () => {
    mockRequest = {
      headers: {
        "content-type": "application/text",
      },
      baseUrl: "/cars",
    };
    expect(() =>
      requestMiddleware.use(mockRequest, mockResponse, mockNextFunction)
    ).toThrowError(ERROR_MESSAGES.CONTENT_TYPE_NOT_ALLOWED);
  });

  it("should return method type error", () => {
    mockRequest = {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      baseUrl: "/cars",
    };
    expect(() =>
      requestMiddleware.use(mockRequest, mockResponse, mockNextFunction)
    ).toThrowError(ERROR_MESSAGES.REQUEST_METHOD_NOT_ALLOWED);
  });

  it("should continue to controller if valid", () => {
    mockRequest = {
      headers: {
        "content-type": "application/json",
      },
      baseUrl: "/cars",
      method: "PUT",
    };
    requestMiddleware.use(mockRequest, mockResponse, mockNextFunction);
    expect(mockNextFunction).toBeCalled();
  });
});
