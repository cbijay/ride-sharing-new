import { renderWithProvider } from "core/utils/tests/render";

import Dashboard from "features/dashboard/pages/Dashboard";
import { server } from "setupTests";

describe("Dashboard Page", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render all dashboard stat", async () => {
    const { findAllByTestId } = renderWithProvider(<Dashboard />);

    const countElement = await findAllByTestId("dashboard-card");
    expect(countElement.length).toBe(3);
  });
});
