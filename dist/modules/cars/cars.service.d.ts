import { JourneyDb } from "../journey/journey.db";
import { CarsDb } from "./cars.db";
import { CarsRequestDTO } from "./cars.dto";
export declare class CarsService {
    private readonly carsDb;
    private journeyDb;
    private readonly logger;
    constructor(carsDb: CarsDb, journeyDb: JourneyDb);
    updateCarsList(cars: CarsRequestDTO[]): string;
}
