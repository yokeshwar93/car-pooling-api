import { Body, Controller, Put, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/ZodValidationPipe";
import { CarsService } from "./cars.service";
import { createCarsSchema } from "./cars.schema";
import { CarsRequestDTO } from "./cars.dto";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { SWAGGER_DESCRIPTIONS } from "src/common/constants";

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Put("cars")
  @UsePipes(new ZodValidationPipe(createCarsSchema))
  @ApiBody({ type: [CarsRequestDTO] })
  @ApiOkResponse({ description: SWAGGER_DESCRIPTIONS.CARS_OK })
  async updateCarsList(@Body() carsList: CarsRequestDTO[]): Promise<string> {
    return this.carsService.updateCarsList(carsList);
  }
}
