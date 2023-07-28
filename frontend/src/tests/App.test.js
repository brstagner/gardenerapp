import { render, screen } from '@testing-library/react';
import App from '../App';

const user = { username: "user", userId: "1", isAdmin: "false", token: "user-token" };
const admin = { username: "admin", userId: "2", isAdmin: "true", token: "admin-token" };

// smoke test
it("renders without crashing", function () {
  render(<App currUser={user} />);
  // screen.debug;
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<App currUser={user} />);
  expect(asFragment()).toMatchSnapshot();
});