import { renderWithProvider } from "core/utils/tests/render";
import Signup from "features/auth/pages/Signup";

describe("Signup Page", () => {
  it("should render signup page", () => {
    const { getByRole } = renderWithProvider(<Signup />);

    const headingElement = getByRole("heading", {
      name: /signup/i,
    });

    const paragraphElement = getByRole("paragraph");
    const linkElement = getByRole("link", { name: /login/i });

    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
