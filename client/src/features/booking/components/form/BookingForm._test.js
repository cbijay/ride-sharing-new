// import { screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import { renderWithProvider } from "core/utils/tests/render";
// import BookingForm from "features/booking/components/form/BookingForm";
// import { act } from "react-dom/test-utils";
// import RiderList from "../riders/RiderList";

// describe("Booking Form Component", () => {
//   let pickupElement, destinationElement, submitElement;

//   beforeEach(() => {
//     renderWithProvider(<BookingForm />);
//     pickupElement = screen.getByPlaceholderText(/pickup/i);
//     destinationElement = screen.getByPlaceholderText(/destination/i);
//     submitElement = screen.getByRole("button", { name: /find rider/i });
//   });

//   it("should render booking form element", () => {
//     expect(pickupElement).toBeInTheDocument();
//     expect(destinationElement).toBeInTheDocument();
//     expect(submitElement).toBeInTheDocument();
//   });

//   it("should return error when no value is provided to the form elements", async () => {
//     act(() => {
//       userEvent.click(submitElement);
//     });
//     const errorElements = await screen.findAllByTestId("error");

//     expect(errorElements.length).toBe(2);
//   });

//   it("should return error when pickup or destination input value is not provided", async () => {
//     userEvent.type(pickupElement, "baneshwor");

//     await waitFor(async () => {
//       const placeElements = await screen.findAllByTestId("place");

//       placeElements.map((placeElement) => userEvent.click(placeElement));
//     });

//     const errorElements = await screen.findAllByTestId("error");

//     act(() => {
//       userEvent.click(submitElement);
//     });

//     // expect(errorElements.length).toBe(1);
//   });

//   it("should return all riders that matches user pickup address", async () => {
//     userEvent.type(pickupElement, "new baneshwor");
//     userEvent.type(destinationElement, "old baneshwor");

//     await waitFor(async () => {
//       const pickupPlaces = await screen.findAllByTestId("place");
//       pickupPlaces.map((pickupPlace) => userEvent.click(pickupPlace));
//     });

//     act(() => {
//       userEvent.click(submitElement);
//     });

//     renderWithProvider(<RiderList />);

//     const riderElements = await screen.findAllByTestId("rider-card");

//     expect(riderElements.length).toBe(1);
//   });
// });
