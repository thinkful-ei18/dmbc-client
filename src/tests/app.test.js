import React from "react";
import { shallow } from "enzyme";

import { App } from "../components/app";
import { Login } from "../components/login";
import { LoginForm } from "../components/login-form";
import { Registration } from "../components/register";
import { RegistrationForm } from "../components/registration-form";

describe("<App />", () => {
  it("Renders without crashing", () => {
    const dispatch = jest.fn();
    shallow(<App />);
    shallow(<Login />);
    shallow(<LoginForm handleSubmit={dispatch} />);
    shallow(<Registration />);
    shallow(<RegistrationForm handleSubmit={dispatch} />);
  });
});
