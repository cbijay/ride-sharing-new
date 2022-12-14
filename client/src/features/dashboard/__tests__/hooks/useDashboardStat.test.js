import { renderHook, waitFor } from "@testing-library/react";
import { createClientWrapper } from "core/utils/tests/wrapper";
import { useFetchDashboardStat } from "features/dashboard/hooks/api/useFetchDashboardStat";

describe("useDashboardStat", () => {
  it("should return data, success and error from dashboard stat api", async () => {
    const { result } = renderHook(() => useFetchDashboardStat(), {
      wrapper: createClientWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
