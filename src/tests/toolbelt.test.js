import React from "react";
import { shallow, mount } from "enzyme";

import { App } from "../components/app";
import { Toolbelt } from "../components/toolbelt";
import { ToolbeltCard } from "../components/toolBeltCard";

describe("<Toolbelt />", () => {
  it("Renders without crashing", () => {
    shallow(<App />);
    //   const availableBlocks = [{     id: 123   }];   const destination = {
    // distance: 30,     location: {       coordinates: [         123,         321
    //     ]     }   };   const cards = [     {       id: 123,     },     {
    // id: 321     } ];   const distance = 30;   const dispatch = jest.fn();
    // shallow(<Toolbelt     availableBlocks={availableBlocks}
    // destination={destination}     dispatch={dispatch}   />);
    // shallow(<ToolbeltCard />);
  });
});
