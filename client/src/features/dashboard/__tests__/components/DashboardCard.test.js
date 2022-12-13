import { renderWithProvider } from "core/utils/tests/render";
import DashboardCard from "features/dashboard/components/card/DashboardCard";

describe("Dashboard Card", () => {
  it("should render dashboard card component", () => {
    const { getByText } = renderWithProvider(
      <DashboardCard count={2} status="Pending" />
    );

    const countElement = getByText(/2/i);
    const statusElement = getByText(/Pending/i);

    expect(countElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
  });
});
