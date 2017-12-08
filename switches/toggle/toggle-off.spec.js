import React from 'react';
import { shallow } from 'enzyme';
import ToggleOff from './toggle-off';

const createTestProps = custom => ({
  isDisabled: false,
  isChecked: false,
  ...custom,
});

describe('<ToggleOff>', () => {
  describe('rendering', () => {
    let props;
    let wrapper;

    it('outputs correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when not checked', () => {
      beforeEach(() => {
        props = createTestProps({ isChecked: false });
        wrapper = shallow(<ToggleOff {...props} />);
      });

      it('renders a <span>', () => {
        expect(wrapper).toRender('span');
      });
    });

    describe('when checked', () => {
      beforeEach(() => {
        props = createTestProps({ isChecked: true });
        wrapper = shallow(<ToggleOff {...props} />);
      });

      it('should not render any children', () => {
        expect(wrapper.children()).toHaveLength(0);
      });
    });

    describe('when not checked and disabled', () => {
      beforeEach(() => {
        props = createTestProps({ isDisabled: true, isChecked: false });
        wrapper = shallow(<ToggleOff {...props} />);
      });

      it('should render a <span> with disabled class', () => {
        expect(wrapper.find('span')).toHaveClassName('textWrapperDisabled');
      });
    });
  });
});
