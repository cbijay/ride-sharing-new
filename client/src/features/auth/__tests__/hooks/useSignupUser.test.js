import { act, renderHook, waitFor } from "@testing-library/react";
import { createClientWrapper } from "core/utils/tests/wrapper";

import { useSignupUser } from "features/auth/hooks/api/useSignupUser";

describe("useSignupUser", () => {
  it("should return data, success and error from signup user api", async () => {
    const { result } = renderHook(() => useSignupUser({}), {
      wrapper: createClientWrapper(),
    });

    act(() => {
      result.current.mutateAsync({
        credential: "credential",
        lat: 27.982,
        long: 85.1242,
      });
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });
  });
});
