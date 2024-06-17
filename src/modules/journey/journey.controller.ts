import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { Response } from "express";
import { ERROR_MESSAGES, SWAGGER_DESCRIPTIONS } from "src/common/constants";
import { ACCEPTED_CONTENT_TYPES } from "src/common/validations";
import { ZodValidationPipe } from "src/pipes/ZodValidationPipe";
import { CarsRequestDTO } from "../cars/cars.dto";
import { DropoffDTO, JourneyDTO, LocateDTO } from "./journey.dto";
import { createJourneySchema, locateJourneySchema } from "./journey.schema";
import { JourneyService } from "./journey.service";

@Controller()
export class JourneyController {
  constructor(private journeyService: JourneyService) {}

  @Post("journey")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(createJourneySchema))
  @ApiOkResponse({ description: SWAGGER_DESCRIPTIONS.JOURNEY_OK })
  @ApiBadRequestResponse({
    description: SWAGGER_DESCRIPTIONS.JOURNEY_BAD_REQUEST,
  })
  async registerJourney(@Body() journey: JourneyDTO) {
    this.journeyService.registerNewJourney(journey);
  }

  @Post("locate")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(locateJourneySchema))
  @ApiConsumes(ACCEPTED_CONTENT_TYPES.locate)
  @ApiOkResponse({
    type: CarsRequestDTO,
    description: SWAGGER_DESCRIPTIONS.LOCATE_OK,
  })
  @ApiNoContentResponse({ description: SWAGGER_DESCRIPTIONS.LOCATE_NO_CONTENT })
  @ApiBadRequestResponse({
    description: SWAGGER_DESCRIPTIONS.LOCATE_BAD_REQUEST,
  })
  @ApiNotFoundResponse({ description: SWAGGER_DESCRIPTIONS.LOCATE_NOT_FOUND })
  async locateJourney(
    @Body() locateJourneyRequest: LocateDTO,
    @Res() response: Response
  ) {
    const { status, car } = this.journeyService.locateJourney(
      locateJourneyRequest.ID
    );
    if (status === ERROR_MESSAGES.NOT_FOUND) {
      response.status(HttpStatus.NOT_FOUND);
      response.send();
    }
    if (status === ERROR_MESSAGES.NO_CONTENT) {
      response.status(HttpStatus.NO_CONTENT);
    }
    response.send(car);
  }

  @Post("dropoff")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(locateJourneySchema))
  @ApiConsumes(ACCEPTED_CONTENT_TYPES.dropoff)
  @ApiOkResponse({ description: SWAGGER_DESCRIPTIONS.DROPOFF_OK })
  @ApiNoContentResponse({
    description: SWAGGER_DESCRIPTIONS.DROPOFF_NO_CONTENT,
  })
  @ApiNotFoundResponse({ description: SWAGGER_DESCRIPTIONS.DROPOFF_NOT_FOUND })
  @ApiBadRequestResponse({
    description: SWAGGER_DESCRIPTIONS.DROPOFF_BAD_REQUEST,
  })
  async dropoffJourney(
    @Body() dropoffJourneyRequest: DropoffDTO,
    @Res() response: Response
  ) {
    const status = this.journeyService.dropoffJourney(dropoffJourneyRequest.ID);
    if (status === ERROR_MESSAGES.NO_CONTENT) {
      response.status(HttpStatus.NO_CONTENT);
    } else {
      response.status(HttpStatus.OK);
    }
    response.send();
  }
}
