import { CarsService } from "./cars.service";
import { CarsRequestDTO } from "./cars.dto";
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    updateCarsList(carsList: CarsRequestDTO[]): Promise<string>;
}
