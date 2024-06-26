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
var CarsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const journey_db_1 = require("../journey/journey.db");
const cars_db_1 = require("./cars.db");
let CarsService = CarsService_1 = class CarsService {
    constructor(carsDb, journeyDb) {
        this.carsDb = carsDb;
        this.journeyDb = journeyDb;
        this.logger = new common_1.Logger(CarsService_1.name);
    }
    updateCarsList(cars) {
        this.logger.log("Updating cars list");
        this.carsDb.resetDb();
        this.journeyDb.resetDb();
        const response = this.carsDb.updateCarsList(cars);
        this.logger.log("Cars list updated");
        return response;
    }
};
CarsService = CarsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => journey_db_1.JourneyDb))),
    __metadata("design:paramtypes", [cars_db_1.CarsDb,
        journey_db_1.JourneyDb])
], CarsService);
exports.CarsService = CarsService;
//# sourceMappingURL=cars.service.js.map