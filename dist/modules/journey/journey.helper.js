"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentAndUpdatedSeats = exports.assignJourney = void 0;
const constants_1 = require("../../common/constants");
const validations_1 = require("../../common/validations");
const assignJourney = (seats, availabilty) => {
    var _a;
    let currentSeat = seats;
    let carId;
    while (currentSeat <= validations_1.MAX_SEATS) {
        const car = (_a = availabilty[currentSeat]) === null || _a === void 0 ? void 0 : _a.getFirstItem();
        if (car) {
            carId = car.data;
            break;
        }
        currentSeat++;
    }
    const status = carId ? constants_1.GROUP_STATUSES.TRAVELLING : constants_1.GROUP_STATUSES.WAITING;
    return { status, carId };
};
exports.assignJourney = assignJourney;
const getCurrentAndUpdatedSeats = (carsDB, carId, people, type) => {
    const car = carsDB.getCarById(carId);
    const { seats, currentTravellers } = car;
    const currentSeats = seats - currentTravellers;
    let updatedTravellers;
    if (type === constants_1.JOURNEY_REQUEST.ASSIGNED) {
        updatedTravellers = currentTravellers + people;
    }
    else {
        updatedTravellers = currentTravellers - people;
    }
    car.currentTravellers = updatedTravellers;
    const updatedSeats = seats - updatedTravellers;
    return { currentSeats, updatedSeats };
};
exports.getCurrentAndUpdatedSeats = getCurrentAndUpdatedSeats;
//# sourceMappingURL=journey.helper.js.map