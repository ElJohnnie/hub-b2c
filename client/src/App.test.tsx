import React from "react";
import { render, screen } from "@testing-library/react";
import AppController from "./pages/App/Controllers/app.controller";

test("renders learn react link", () => {
  render(<AppController />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
