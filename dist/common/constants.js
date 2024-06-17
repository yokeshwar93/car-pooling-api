"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_DESCRIPTIONS = exports.SERVER_PORT = exports.ERROR_MESSAGES = exports.JOURNEY_REQUEST = exports.GROUP_STATUSES = void 0;
var GROUP_STATUSES;
(function (GROUP_STATUSES) {
    GROUP_STATUSES["WAITING"] = "WAITING";
    GROUP_STATUSES["DROPPED"] = "DROPPED";
    GROUP_STATUSES["COMPLETED"] = "COMPLETED";
    GROUP_STATUSES["TRAVELLING"] = "TRAVELLING";
})(GROUP_STATUSES = exports.GROUP_STATUSES || (exports.GROUP_STATUSES = {}));
var JOURNEY_REQUEST;
(function (JOURNEY_REQUEST) {
    JOURNEY_REQUEST["DROPOFF"] = "DROPOFF";
    JOURNEY_REQUEST["ASSIGNED"] = "ASSIGNED";
})(JOURNEY_REQUEST = exports.JOURNEY_REQUEST || (exports.JOURNEY_REQUEST = {}));
exports.ERROR_MESSAGES = {
    NO_CONTENT: "No Content",
    NOT_FOUND: "Not Found",
    CONTENT_TYPE_NOT_ALLOWED: "Content type not allowed",
    REQUEST_METHOD_NOT_ALLOWED: "Request method not allowed",
};
exports.SERVER_PORT = 9091;
exports.SWAGGER_DESCRIPTIONS = {
    CARS_OK: "Cars list updated.",
    CARS_ERROR: "Error while updating car list",
    JOURNEY_OK: "When the group has completed travelling.",
    JOURNEY_BAD_REQUEST: "When there is a failure in the request format or the payload can't be unmarshalled.",
    LOCATE_OK: "When the group is assigned to a car.",
    LOCATE_NO_CONTENT: "When the group is waiting to be assigned to a car.",
    LOCATE_NOT_FOUND: "When there is a failure in the request format or the payload can't be unmarshalled.",
    LOCATE_BAD_REQUEST: "When the group is not to be found.",
    DROPOFF_OK: "When the group has completed travelling.",
    DROPOFF_NO_CONTENT: "When the group is unregistered correctly.",
    DROPOFF_NOT_FOUND: "When the group is not to be found.",
    DROPOFF_BAD_REQUEST: "When there is a failure in the request format or the payload can't be unmarshalled.",
};
//# sourceMappingURL=constants.js.map