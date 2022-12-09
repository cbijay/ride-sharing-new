import { renderWithProvider } from "core/utils/tests/render";

import BookingHistory from "features/booking/components/history/BookingHistory";

describe("Booking History Component", () => {
  it("should render dashboard with view all text", async () => {
    const { getByRole, findByTestId } = renderWithProvider(
      <BookingHistory isViewLink={true} perPage={5} />
    );

    const viewLinkElement = getByRole("link", {
      name: /view all/i,
    });

    const headingElement = getByRole("heading", {
      name: /booking history/i,
    });

    const cardElement = await findByTestId("booking-card");

    expect(viewLinkElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(cardElement).toBeInTheDocument();
  });
});
