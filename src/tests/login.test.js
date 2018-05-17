import React from "react";
import { shallow } from "enzyme";

import { Login } from "../components/login";
import { LoginForm } from "../components/login-form";

describe("<LoginPage />", () => {
  it("Renders without crashing", () => {
    const dispatch = jest.fn();
    shallow(<Login />);
    shallow(<LoginForm handleSubmit={dispatch} />);
  });

  it("Should log user in when Login is clicked", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<LoginForm handleSubmit={dispatch} />);
    expect(wrapper.find("button").length).toEqual(1);
    wrapper.find("button").simulate("click");
    expect(dispatch).toHaveBeenCalled();
  });
});
