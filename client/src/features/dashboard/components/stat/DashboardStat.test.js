import { screen } from "@testing-library/react";
import { renderWithProvider } from "core/utils/tests/render";
import DashboardStat from "features/dashboard/components/stat/DashboardStat";
import { server } from "setupTests";

describe("Dashboard Stat Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render all dashboard stat", async () => {
    renderWithProvider(<DashboardStat />);

    const countElement = await screen.findAllByTestId("dashboard-card");
    expect(countElement.length).toBe(3);
  });
});
