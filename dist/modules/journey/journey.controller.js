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
exports.JourneyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../common/constants");
const validations_1 = require("../../common/validations");
const ZodValidationPipe_1 = require("../../pipes/ZodValidationPipe");
const cars_dto_1 = require("../cars/cars.dto");
const journey_dto_1 = require("./journey.dto");
const journey_schema_1 = require("./journey.schema");
const journey_service_1 = require("./journey.service");
let JourneyController = class JourneyController {
    constructor(journeyService) {
        this.journeyService = journeyService;
    }
    async registerJourney(journey) {
        this.journeyService.registerNewJourney(journey);
    }
    async locateJourney(locateJourneyRequest, response) {
        const { status, car } = this.journeyService.locateJourney(locateJourneyRequest.ID);
        if (status === constants_1.ERROR_MESSAGES.NOT_FOUND) {
            response.status(common_1.HttpStatus.NOT_FOUND);
            response.send();
        }
        if (status === constants_1.ERROR_MESSAGES.NO_CONTENT) {
            response.status(common_1.HttpStatus.NO_CONTENT);
        }
        response.send(car);
    }
    async dropoffJourney(dropoffJourneyRequest, response) {
        const status = this.journeyService.dropoffJourney(dropoffJourneyRequest.ID);
        if (status === constants_1.ERROR_MESSAGES.NO_CONTENT) {
            response.status(common_1.HttpStatus.NO_CONTENT);
        }
        else {
            response.status(common_1.HttpStatus.OK);
        }
        response.send();
    }
};
__decorate([
    (0, common_1.Post)("journey"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new ZodValidationPipe_1.ZodValidationPipe(journey_schema_1.createJourneySchema)),
    (0, swagger_1.ApiOkResponse)({ description: constants_1.SWAGGER_DESCRIPTIONS.JOURNEY_OK }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: constants_1.SWAGGER_DESCRIPTIONS.JOURNEY_BAD_REQUEST,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journey_dto_1.JourneyDTO]),
    __metadata("design:returntype", Promise)
], JourneyController.prototype, "registerJourney", null);
__decorate([
    (0, common_1.Post)("locate"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new ZodValidationPipe_1.ZodValidationPipe(journey_schema_1.locateJourneySchema)),
    (0, swagger_1.ApiConsumes)(validations_1.ACCEPTED_CONTENT_TYPES.locate),
    (0, swagger_1.ApiOkResponse)({
        type: cars_dto_1.CarsRequestDTO,
        description: constants_1.SWAGGER_DESCRIPTIONS.LOCATE_OK,
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: constants_1.SWAGGER_DESCRIPTIONS.LOCATE_NO_CONTENT }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: constants_1.SWAGGER_DESCRIPTIONS.LOCATE_BAD_REQUEST,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: constants_1.SWAGGER_DESCRIPTIONS.LOCATE_NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journey_dto_1.LocateDTO, Object]),
    __metadata("design:returntype", Promise)
], JourneyController.prototype, "locateJourney", null);
__decorate([
    (0, common_1.Post)("dropoff"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UsePipes)(new ZodValidationPipe_1.ZodValidationPipe(journey_schema_1.locateJourneySchema)),
    (0, swagger_1.ApiConsumes)(validations_1.ACCEPTED_CONTENT_TYPES.dropoff),
    (0, swagger_1.ApiOkResponse)({ description: constants_1.SWAGGER_DESCRIPTIONS.DROPOFF_OK }),
    (0, swagger_1.ApiNoContentResponse)({
        description: constants_1.SWAGGER_DESCRIPTIONS.DROPOFF_NO_CONTENT,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: constants_1.SWAGGER_DESCRIPTIONS.DROPOFF_NOT_FOUND }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: constants_1.SWAGGER_DESCRIPTIONS.DROPOFF_BAD_REQUEST,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journey_dto_1.DropoffDTO, Object]),
    __metadata("design:returntype", Promise)
], JourneyController.prototype, "dropoffJourney", null);
JourneyController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [journey_service_1.JourneyService])
], JourneyController);
exports.JourneyController = JourneyController;
//# sourceMappingURL=journey.controller.js.map