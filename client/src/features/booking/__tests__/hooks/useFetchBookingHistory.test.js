import { renderHook, waitFor } from "@testing-library/react";
import { createClientWrapper } from "core/utils/tests/wrapper";
import { useFetchBookingHistory } from "features/booking/hooks/api/useFetchBookingHistory";

describe("useFetchBookingHistory", () => {
  it("should return data, success and error from booking history api", async () => {
    const { result } = renderHook(() => useFetchBookingHistory(1, 10), {
      wrapper: createClientWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
