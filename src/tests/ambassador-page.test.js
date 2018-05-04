import React from "react";
import { shallow, mount } from "enzyme";

import { AmbassadorPage } from "../components/ambassador-page";
import { AmbassadorItineraries } from "../components/ambassador-itineraries";
import { AmbassadorPastItineraries } from "../components/ambassador-past-itineraries";

describe("<AmbassadorPage />", () => {
  it("Renders without crashing", () => {
    const dispatch = jest.fn();
    shallow(<AmbassadorPage />);
    shallow(<AmbassadorItineraries handleSubmit={dispatch} />);
  });

  it("Should register user when Register is clicked", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<RegistrationForm handleSubmit={dispatch} />);
    const instance = wrapper.instance();
    expect(wrapper.find("button").length).toEqual(1);
    wrapper.find("button").simulate("click");
    expect(dispatch).toHaveBeenCalled;
  });
});
