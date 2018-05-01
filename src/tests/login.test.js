import React from 'react';
import {shallow, mount} from 'enzyme';

import {Login} from '../components/login';
import {LoginForm} from '../components/login-form';
import { login } from '../actions/auth';

describe('<LoginPage />', () => {
    it('Renders without crashing', () => {
      const dispatch = jest.fn();
      shallow(<Login />);
      shallow(<LoginForm handleSubmit={dispatch} />);
    });

    it('Should log user in when Login is clicked', () => {
      const dispatch = jest.fn();
      const wrapper = shallow(
        <LoginForm handleSubmit={dispatch} />
      );
      const instance = wrapper.instance();
      expect(wrapper.find('button').length).toEqual(1);
      wrapper.find('button').simulate('click');
      expect(dispatch).toHaveBeenCalled;
    });
});