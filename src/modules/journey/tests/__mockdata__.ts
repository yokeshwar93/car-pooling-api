import { ERROR_MESSAGES, GROUP_STATUSES } from "src/common/constants";

export const JOURNEY_MOCK_DATA = {
  id: 10,
  people: 6,
};
export const LOCATE_ASSIGNED_DATA = {
  status: "OK",
  car: {
    id: 101,
    seats: 6,
  },
};
export const LOCATE_NOT_ASSIGNED_DATA = {
  status: ERROR_MESSAGES.NO_CONTENT,
  car: undefined,
};
export const LOCATE_NOT_FOUND_DATA = {
  status: ERROR_MESSAGES.NOT_FOUND,
  car: undefined,
};
export const ASSIGNED_DATA = {
  people: 6,
  carId: 101,
  currentStatus: GROUP_STATUSES.TRAVELLING,
};

export const COMPLETED_DATA = {
  people: 6,
  carId: 101,
  currentStatus: GROUP_STATUSES.COMPLETED,
};
export const WAITING_LIST_DATA = {
  people: 6,
  currentStatus: GROUP_STATUSES.WAITING,
};

export const DROPPED_LIST_DATA = {
  people: 6,
  currentStatus: GROUP_STATUSES.DROPPED,
};
export const LOCATE_REQUEST = {
  ID: 10,
};
