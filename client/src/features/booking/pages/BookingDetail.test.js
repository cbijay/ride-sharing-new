import { renderWithProvider } from "core/utils/tests/render";
import BookingDetail from "./BookingDetail";

describe("Booking Detail Page", () => {
  it("should return booking detail", () => {
    renderWithProvider(<BookingDetail />);
  });
});
