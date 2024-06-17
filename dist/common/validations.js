"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_SEATS = exports.ACCEPTED_REQUEST_METHOD = exports.ACCEPTED_CONTENT_TYPES = void 0;
exports.ACCEPTED_CONTENT_TYPES = {
    cars: "application/json",
    journey: "application/json",
    locate: "application/x-www-form-urlencoded",
    dropoff: "application/x-www-form-urlencoded",
};
exports.ACCEPTED_REQUEST_METHOD = {
    cars: "PUT",
    journey: "POST",
    locate: "POST",
    dropoff: "POST",
};
exports.MAX_SEATS = 6;
//# sourceMappingURL=validations.js.map