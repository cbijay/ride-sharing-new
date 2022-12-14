import { renderHook, waitFor } from "@testing-library/react";
import { createClientWrapper } from "core/utils/tests/wrapper";
import { useFindRiders } from "features/booking/hooks/api/useFindRider";

describe("useFindRiders", () => {
  it("should return data, success and error from find rider api", async () => {
    const { result } = renderHook(() => useFindRiders(25, 85), {
      wrapper: createClientWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
