import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "src/common/constants";
import {
  ACCEPTED_CONTENT_TYPES,
  ACCEPTED_REQUEST_METHOD,
} from "src/common/validations";
/**
 *
 * A middleware for validating the content tyoe and request method
 * If validation fails it throws an exception else it continues with the request
 *
 */
@Injectable()
export class CommonRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers["content-type"];
    const method = req.method;

    // To get the correct endpoint to validate
    const service = req.baseUrl.split("/")[1];

    if (contentType !== ACCEPTED_CONTENT_TYPES[service]) {
      throw new BadRequestException(ERROR_MESSAGES.CONTENT_TYPE_NOT_ALLOWED);
    }
    if (method !== ACCEPTED_REQUEST_METHOD[service]) {
      throw new BadRequestException(ERROR_MESSAGES.REQUEST_METHOD_NOT_ALLOWED);
    }
    next();
  }
}
