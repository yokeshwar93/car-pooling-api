import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { JourneyDb } from "../journey/journey.db";
import { CarsDb } from "./cars.db";
import { CarsRequestDTO } from "./cars.dto";

@Injectable()
export class CarsService {
  private readonly logger = new Logger(CarsService.name);

  constructor(
    private readonly carsDb: CarsDb,
    @Inject(forwardRef(() => JourneyDb)) private journeyDb: JourneyDb
  ) {}

  /**
   * Reset the app db
   * And
   * Update the cars list to db
   * @param cars
   * @returns { string }
   */
  updateCarsList(cars: CarsRequestDTO[]): string {
    this.logger.log("Updating cars list");

    this.carsDb.resetDb();
    this.journeyDb.resetDb();

    const response = this.carsDb.updateCarsList(cars);
    this.logger.log("Cars list updated");
    return response;
  }
}
