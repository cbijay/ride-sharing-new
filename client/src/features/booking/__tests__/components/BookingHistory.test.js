import { screen } from "@testing-library/react";
import { renderWithProvider } from "core/utils/tests/render";
import BookingHistory from "features/booking/components/history/BookingHistory";

describe("Booking History Component", () => {
  it("should render dashboard with view all text", async () => {
    renderWithProvider(<BookingHistory isViewLink={true} perPage={5} />);

    const viewLinkElement = screen.getByRole("link", {
      name: /view all/i,
    });

    const headingElement = screen.getByRole("heading", {
      name: /booking history/i,
    });

    const cardElement = await screen.findByTestId("booking-card");

    expect(viewLinkElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(cardElement).toBeInTheDocument();
  });
});
