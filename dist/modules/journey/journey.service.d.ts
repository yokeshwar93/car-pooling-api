import { CarsDb } from "../cars/cars.db";
import { CarsRequestDTO } from "../cars/cars.dto";
import { JourneyDb } from "./journey.db";
import { JourneyDTO } from "./journey.dto";
export declare class JourneyService {
    private journeyDb;
    private carsDb;
    private readonly logger;
    constructor(journeyDb: JourneyDb, carsDb: CarsDb);
    registerNewJourney(journey: JourneyDTO): void;
    locateJourney(journeyId: number): {
        status: string;
        car: CarsRequestDTO | undefined;
    };
    dropoffJourney(journeyId: number): string;
}
