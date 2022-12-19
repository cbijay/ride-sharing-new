import { bookingHandler } from "core/utils/tests/handler/booking.handler";
import { dashboardHandler } from "core/utils/tests/handler/dashboard.handler";
import { placeHandler } from "core/utils/tests/handler/map.handler";

import { riderHandler } from "core/utils/tests/handler/rider.handler";
import { signupHandler } from "core/utils/tests/handler/signup.handler";

export const handlers = [
  signupHandler(),
  dashboardHandler(),
  riderHandler(),
  placeHandler(),
  bookingHandler(),
];
