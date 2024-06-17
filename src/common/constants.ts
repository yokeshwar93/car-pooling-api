export enum GROUP_STATUSES {
  WAITING = "WAITING",
  DROPPED = "DROPPED",
  COMPLETED = "COMPLETED",
  TRAVELLING = "TRAVELLING",
}
export enum JOURNEY_REQUEST {
  DROPOFF = "DROPOFF",
  ASSIGNED = "ASSIGNED",
}
export const ERROR_MESSAGES = {
  NO_CONTENT: "No Content",
  NOT_FOUND: "Not Found",
  CONTENT_TYPE_NOT_ALLOWED: "Content type not allowed",
  REQUEST_METHOD_NOT_ALLOWED: "Request method not allowed",
};
export const SERVER_PORT = 9091;
export const SWAGGER_DESCRIPTIONS = {
  CARS_OK: "Cars list updated.",
  CARS_ERROR: "Error while updating car list",
  JOURNEY_OK: "When the group has completed travelling.",
  JOURNEY_BAD_REQUEST:
    "When there is a failure in the request format or the payload can't be unmarshalled.",
  LOCATE_OK: "When the group is assigned to a car.",
  LOCATE_NO_CONTENT: "When the group is waiting to be assigned to a car.",
  LOCATE_NOT_FOUND:
    "When there is a failure in the request format or the payload can't be unmarshalled.",
  LOCATE_BAD_REQUEST: "When the group is not to be found.",
  DROPOFF_OK: "When the group has completed travelling.",
  DROPOFF_NO_CONTENT: "When the group is unregistered correctly.",
  DROPOFF_NOT_FOUND: "When the group is not to be found.",
  DROPOFF_BAD_REQUEST:
    "When there is a failure in the request format or the payload can't be unmarshalled.",
};
