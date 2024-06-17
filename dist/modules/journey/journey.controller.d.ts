import { Response } from "express";
import { DropoffDTO, JourneyDTO, LocateDTO } from "./journey.dto";
import { JourneyService } from "./journey.service";
export declare class JourneyController {
    private journeyService;
    constructor(journeyService: JourneyService);
    registerJourney(journey: JourneyDTO): Promise<void>;
    locateJourney(locateJourneyRequest: LocateDTO, response: Response): Promise<void>;
    dropoffJourney(dropoffJourneyRequest: DropoffDTO, response: Response): Promise<void>;
}
