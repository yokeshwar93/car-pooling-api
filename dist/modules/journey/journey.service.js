"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JourneyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JourneyService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
const cars_db_1 = require("../cars/cars.db");
const journey_db_1 = require("./journey.db");
const journey_helper_1 = require("./journey.helper");
let JourneyService = JourneyService_1 = class JourneyService {
    constructor(journeyDb, carsDb) {
        this.journeyDb = journeyDb;
        this.carsDb = carsDb;
        this.logger = new common_1.Logger(JourneyService_1.name);
    }
    registerNewJourney(journey) {
        this.logger.log("Journey registeration started");
        if (this.journeyDb.getAllJourneys()[journey.id]) {
            throw new common_1.BadRequestException("Journey already exists");
        }
        const availabilty = this.carsDb.getAvailabilty();
        const { status, carId } = (0, journey_helper_1.assignJourney)(journey.people, availabilty);
        const journeyObject = {
            people: journey.people,
            currentStatus: status,
            carId,
        };
        this.journeyDb.createNewJourney(journey.id, journeyObject);
        if (carId) {
            const { currentSeats, updatedSeats } = (0, journey_helper_1.getCurrentAndUpdatedSeats)(this.carsDb, carId, journey.people, constants_1.JOURNEY_REQUEST.ASSIGNED);
            this.carsDb.updateAvailabilty(currentSeats, updatedSeats, carId);
            this.logger.log("Journey has been assigned");
        }
        else {
            this.journeyDb.addToWaitingList(journey.id);
            this.logger.log("Journey has been added to waitlist");
        }
        this.logger.log("Journey registeration completed");
    }
    locateJourney(journeyId) {
        const journey = this.journeyDb.getJourneyById(journeyId);
        if (journey && journey.currentStatus === constants_1.GROUP_STATUSES.TRAVELLING) {
            const car = this.carsDb.getCarById(journey.carId);
            return { status: "OK", car: { id: journey.carId, seats: car.seats } };
        }
        else if (journey &&
            (journey.currentStatus === constants_1.GROUP_STATUSES.WAITING ||
                journey.currentStatus === constants_1.GROUP_STATUSES.DROPPED)) {
            return { status: constants_1.ERROR_MESSAGES.NO_CONTENT, car: undefined };
        }
        else {
            return { status: constants_1.ERROR_MESSAGES.NOT_FOUND, car: undefined };
        }
    }
    dropoffJourney(journeyId) {
        this.logger.log("Dropoff journey started");
        const journey = this.journeyDb.getJourneyById(journeyId);
        if (!journey) {
            throw new common_1.NotFoundException(constants_1.ERROR_MESSAGES.NOT_FOUND);
        }
        if (journey.currentStatus === constants_1.GROUP_STATUSES.COMPLETED ||
            journey.currentStatus === constants_1.GROUP_STATUSES.DROPPED) {
            return constants_1.ERROR_MESSAGES.NO_CONTENT;
        }
        if (journey.currentStatus === constants_1.GROUP_STATUSES.WAITING) {
            this.journeyDb.updateJourneyStatus(journeyId, constants_1.GROUP_STATUSES.DROPPED);
            const waitingList = this.journeyDb.getWaitingList();
            waitingList.delete(Number(journeyId));
            this.logger.log("Dropoff journey completed");
            return constants_1.ERROR_MESSAGES.NO_CONTENT;
        }
        const { currentSeats, updatedSeats } = (0, journey_helper_1.getCurrentAndUpdatedSeats)(this.carsDb, journey.carId, journey.people, constants_1.JOURNEY_REQUEST.DROPOFF);
        this.carsDb.updateAvailabilty(currentSeats, updatedSeats, journey.carId);
        this.journeyDb.updateJourneyStatus(journeyId, constants_1.GROUP_STATUSES.COMPLETED);
        const waitingList = this.journeyDb.getWaitingList();
        let current = waitingList.head;
        const car = this.carsDb.getCarById(journey.carId);
        let currentAvailableSeats = car.seats - car.currentTravellers;
        while (current !== null) {
            const journeyObject = this.journeyDb.getJourneyById(current.data);
            if (journeyObject.people > currentAvailableSeats) {
                current = current.next;
                continue;
            }
            const availabilty = this.carsDb.getAvailabilty();
            const { carId } = (0, journey_helper_1.assignJourney)(journeyObject.people, availabilty);
            if (carId) {
                currentAvailableSeats = currentAvailableSeats - journeyObject.people;
                const { currentSeats, updatedSeats } = (0, journey_helper_1.getCurrentAndUpdatedSeats)(this.carsDb, carId, journeyObject.people, constants_1.JOURNEY_REQUEST.ASSIGNED);
                this.carsDb.updateAvailabilty(currentSeats, updatedSeats, carId);
                this.journeyDb.updateJourneyCarId(current.data, carId);
                this.journeyDb.updateJourneyStatus(current.data, constants_1.GROUP_STATUSES.TRAVELLING);
                waitingList.delete(current.data);
            }
            current = current.next;
        }
        this.logger.log("Dropoff journey completed");
    }
};
JourneyService = JourneyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => cars_db_1.CarsDb))),
    __metadata("design:paramtypes", [journey_db_1.JourneyDb,
        cars_db_1.CarsDb])
], JourneyService);
exports.JourneyService = JourneyService;
//# sourceMappingURL=journey.service.js.map