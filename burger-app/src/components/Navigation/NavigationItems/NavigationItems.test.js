import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

// Jest test
describe('<NavigationItems />', () => {

    let wrapper;

    // enzyme for rendering component
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render a logout <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });

    // use afterEach() for any cleanup
});