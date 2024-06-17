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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ZodValidationPipe_1 = require("../../pipes/ZodValidationPipe");
const cars_service_1 = require("./cars.service");
const cars_schema_1 = require("./cars.schema");
const cars_dto_1 = require("./cars.dto");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../common/constants");
let CarsController = class CarsController {
    constructor(carsService) {
        this.carsService = carsService;
    }
    async updateCarsList(carsList) {
        return this.carsService.updateCarsList(carsList);
    }
};
__decorate([
    (0, common_1.Put)("cars"),
    (0, common_1.UsePipes)(new ZodValidationPipe_1.ZodValidationPipe(cars_schema_1.createCarsSchema)),
    (0, swagger_1.ApiBody)({ type: [cars_dto_1.CarsRequestDTO] }),
    (0, swagger_1.ApiOkResponse)({ description: constants_1.SWAGGER_DESCRIPTIONS.CARS_OK }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "updateCarsList", null);
CarsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cars_service_1.CarsService])
], CarsController);
exports.CarsController = CarsController;
//# sourceMappingURL=cars.controller.js.map