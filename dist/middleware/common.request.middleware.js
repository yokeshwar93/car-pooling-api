"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRequestMiddleware = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../common/constants");
const validations_1 = require("../common/validations");
let CommonRequestMiddleware = class CommonRequestMiddleware {
    use(req, res, next) {
        const contentType = req.headers["content-type"];
        const method = req.method;
        const service = req.baseUrl.split("/")[1];
        if (contentType !== validations_1.ACCEPTED_CONTENT_TYPES[service]) {
            throw new common_1.BadRequestException(constants_1.ERROR_MESSAGES.CONTENT_TYPE_NOT_ALLOWED);
        }
        if (method !== validations_1.ACCEPTED_REQUEST_METHOD[service]) {
            throw new common_1.BadRequestException(constants_1.ERROR_MESSAGES.REQUEST_METHOD_NOT_ALLOWED);
        }
        next();
    }
};
CommonRequestMiddleware = __decorate([
    (0, common_1.Injectable)()
], CommonRequestMiddleware);
exports.CommonRequestMiddleware = CommonRequestMiddleware;
//# sourceMappingURL=common.request.middleware.js.map