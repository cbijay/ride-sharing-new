import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "core/utils/tests/render";
import BookingForm from "./BookingForm";

describe("Booking Form Component", () => {
  it("should render booking form element", () => {
    const { getByPlaceholderText, getByRole } = renderWithProvider(
      <BookingForm />
    );

    const pickupElement = getByPlaceholderText(/pickup/i);
    const destinationElement = getByPlaceholderText(/destination/i);
    const submitElement = getByRole("button", { name: /find rider/i });

    expect(pickupElement).toBeInTheDocument();
    expect(destinationElement).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
  });

  it("should return error when no value is provided to the form elements", async () => {
    const { getByRole, findAllByTestId } = renderWithProvider(<BookingForm />);
    const submitElement = getByRole("button", { name: /find rider/i });

    userEvent.click(submitElement);
    const errorElements = await findAllByTestId("error");

    expect(errorElements.length).toBe(2);
  });

  it("should return error when pickup or destination input value is not provided", async () => {
    const { getByPlaceholderText, getByRole, findAllByTestId } =
      renderWithProvider(<BookingForm />);

    const pickupElement = getByPlaceholderText(/pickup/i);
    const submitElement = getByRole("button", { name: /find rider/i });

    userEvent.type(pickupElement, "baneshwor");

    await waitFor(async () => {
      const placeElements = await findAllByTestId("place");

      placeElements.map((placeElement) => userEvent.click(placeElement));
    });

    const errorElements = await findAllByTestId("error");
    userEvent.click(submitElement);

    expect(errorElements.length).toBe(1);
  });
});
