import { renderWithProvider } from "core/utils/tests/render";
import Login from "features/auth/pages/Login";

describe("Login Page", () => {
  it("should render login page", () => {
    const { getByRole } = renderWithProvider(<Login />);

    const headingElement = getByRole("heading", {
      name: /login/i,
    });

    const paragraphElement = getByRole("paragraph");
    const linkElement = getByRole("link", { name: /signup/i });

    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
