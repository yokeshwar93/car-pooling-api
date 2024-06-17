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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsDb = void 0;
const common_1 = require("@nestjs/common");
const DoublyLinkedList_1 = require("../../common/utils/DoublyLinkedList");
const cars_helper_1 = require("./cars.helper");
const constants_1 = require("../../common/constants");
let CarsDb = class CarsDb {
    constructor() {
        this.cars = {};
        this.availabilty = {};
    }
    getCarsList() {
        return this.cars;
    }
    getAvailabilty() {
        return this.availabilty;
    }
    getCarById(carId) {
        return this.cars[carId];
    }
    getAvailableCarsBySeats(seats) {
        return this.availabilty[seats];
    }
    updateCarsList(carsList) {
        try {
            const { cars, availabilty } = (0, cars_helper_1.constructCarsMap)(carsList);
            this.cars = cars;
            this.availabilty = availabilty;
            return constants_1.SWAGGER_DESCRIPTIONS.CARS_OK;
        }
        catch (error) {
            return constants_1.SWAGGER_DESCRIPTIONS.CARS_ERROR;
        }
    }
    updateAvailabilty(currentSeats, updatedSeats, carId) {
        if (currentSeats > 0) {
            const currentSeatsList = this.availabilty[currentSeats];
            currentSeatsList.delete(carId);
        }
        if (updatedSeats > 0) {
            const updatedSeatsList = this.availabilty[updatedSeats];
            if (!updatedSeatsList) {
                this.availabilty[updatedSeats] = new DoublyLinkedList_1.DoublyLinkedList();
                this.availabilty[updatedSeats].add(carId);
            }
            else {
                updatedSeatsList.add(carId);
            }
        }
    }
    resetDb() {
        this.cars = {};
        this.availabilty = {};
    }
};
CarsDb = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CarsDb);
exports.CarsDb = CarsDb;
//# sourceMappingURL=cars.db.js.map