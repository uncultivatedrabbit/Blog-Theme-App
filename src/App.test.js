import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// this is the test case
it("renders without crashing", () => {
  // first create a DOM element to render the component into
  const div = document.createElement("div");

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    div
  );

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});

test("renders title on the page", () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = getByText(/Blog Theme Workshop/i);
  expect(linkElement).toBeInTheDocument();
});
