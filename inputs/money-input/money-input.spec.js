import React from 'react';
import { shallow } from 'enzyme';
import TetherComponent from 'react-tether';
import Cleave from 'cleave.js/react';
import AccessibleButton from '../../buttons/accessible-button';
import MoneyInput, {
  parseNumberToMoney,
  Currency,
  DropdownChevron,
} from './money-input';

const createTestProps = customProps => ({
  language: 'en',
  value: { currencyCode: 'EUR' },
  currencies: [{ value: 'EUR', label: '€' }, { value: 'USD', label: '$' }],
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ...customProps,
});

const createDropdownProps = customProps => ({
  onClick: jest.fn(),
  isDisabled: false,
  isOpen: false,
  className: 'chevron-icon',
  buttonRef: jest.fn(),
  ...customProps,
});

const createCurrencyProps = customProps => ({
  isDisabled: false,
  onClick: jest.fn(),
  currency: '€',
  ...customProps,
});

describe('utils', () => {
  describe('parseNumberToMoney', () => {
    const fractionDigits = 2;
    describe('when number has value', () => {
      const number = 1000;
      let result;

      beforeEach(() => {
        result = parseNumberToMoney(number, fractionDigits);
      });

      it('should return money value with the number of decimal digits', () => {
        expect(result).toEqual('10.00');
      });
    });

    describe('when number is null', () => {
      const number = null;
      let result;

      beforeEach(() => {
        result = parseNumberToMoney(number, fractionDigits);
      });

      it('should return `undefined`', () => {
        expect(result).toEqual(undefined);
      });
    });
  });
});

describe('rendering', () => {
  let wrapper;
  let props;

  describe('`DropdownChevron` component', () => {
    let dropdownChevron;
    let iconWrapper;
    let dropdownProps;
    beforeEach(() => {
      dropdownProps = createDropdownProps();
      dropdownChevron = shallow(<DropdownChevron {...dropdownProps} />);
    });

    it('should render an `AccessibleButton`', () => {
      expect(dropdownChevron).toRender(AccessibleButton);
    });

    describe('when is closed', () => {
      beforeEach(() => {
        iconWrapper = shallow(
          dropdownChevron.find(AccessibleButton).prop('children')
        );
      });

      it('should render a `CaretDownIcon`', () => {
        expect(iconWrapper).toRender('CaretDownIcon');
      });
    });

    describe('when is open', () => {
      beforeEach(() => {
        dropdownProps = createDropdownProps({ isOpen: true });
        dropdownChevron = shallow(<DropdownChevron {...dropdownProps} />);
        iconWrapper = shallow(
          dropdownChevron.find(AccessibleButton).prop('children')
        );
      });

      it('should render a `CaretUpIcon`', () => {
        expect(iconWrapper).toRender('CaretUpIcon');
      });
    });
  });

  describe('`Currency` component', () => {
    let currency;
    const currencyProps = createCurrencyProps();
    beforeEach(() => {
      currency = shallow(<Currency {...currencyProps} />);
    });

    it('should render an `AccessibleButton`', () => {
      expect(currency).toRender(AccessibleButton);
    });

    it('should render selected currency symbol', () => {
      expect(currency.prop('children')).toEqual('€');
    });
  });

  describe('currency field', () => {
    describe('dropdown head', () => {
      let dropdownWrapper;
      let tetherWrapper;

      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyInput {...props} />);
        tetherWrapper = wrapper.find(TetherComponent);
      });

      it('should render a `TetherComponent`', () => {
        expect(wrapper).toRender(TetherComponent);
      });

      it('should render an `Currency`', () => {
        expect(tetherWrapper).toRender(Currency);
      });

      describe('when currency is selectable', () => {
        it('should render a chevron', () => {
          expect(wrapper).toRender('DropdownChevron');
        });
      });

      describe('with states', () => {
        describe('open', () => {
          beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<MoneyInput {...props} />);
            wrapper.setState({ isOpen: true });
            dropdownWrapper = wrapper.find('.currency-dropdown');
          });

          it('should have opened styles', () => {
            expect(dropdownWrapper).toHaveClassName(
              'currency-dropdown-open-container'
            );
          });
        });

        describe('disabled', () => {
          beforeEach(() => {
            props = createTestProps({
              isDisabled: true,
            });
            wrapper = shallow(<MoneyInput {...props} />);
            dropdownWrapper = wrapper.find('.currency-dropdown');
          });

          it('should have disabled styles', () => {
            expect(dropdownWrapper).toHaveClassName(
              'disabled-currency-dropdown-container'
            );
          });
        });

        describe('error', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyError: true,
            });
            wrapper = shallow(<MoneyInput {...props} />);
            dropdownWrapper = wrapper.find('.currency-dropdown');
          });

          it('should have error styles', () => {
            expect(dropdownWrapper).toHaveClassName('currency-error');
          });
        });

        describe('warning', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyWarning: true,
            });
            wrapper = shallow(<MoneyInput {...props} />);
            dropdownWrapper = wrapper.find('.currency-dropdown');
          });

          it('should have error styles', () => {
            expect(dropdownWrapper).toHaveClassName('currency-warning');
          });
        });
      });
    });

    describe('dropdown options', () => {
      let options;
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyInput {...props} />);
        wrapper.setState({ isOpen: true });
        options = wrapper.find('Option');
      });

      it('should render options', () => {
        expect(wrapper).toRender('.options-wrapper');
      });

      it('should render as many options as currencies', () => {
        expect(options).toHaveLength(2);
      });
    });
  });

  describe('amount field', () => {
    let amountField;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<MoneyInput {...props} />);
      amountField = wrapper.find(Cleave);
    });

    it('should render a `Cleave`', () => {
      expect(wrapper).toRender(Cleave);
    });

    describe('with states', () => {
      describe('disabled', () => {
        beforeEach(() => {
          props = createTestProps({
            isDisabled: true,
          });
          wrapper = shallow(<MoneyInput {...props} />);
          amountField = wrapper.find(Cleave);
        });

        it('should have disabled styles', () => {
          expect(amountField).toHaveClassName('disabled');
        });
      });

      describe('error', () => {
        beforeEach(() => {
          props = createTestProps({
            hasAmountError: true,
          });
          wrapper = shallow(<MoneyInput {...props} />);
          amountField = wrapper.find(Cleave);
        });

        it('should have error styles', () => {
          expect(amountField).toHaveClassName('error');
        });
      });

      describe('warning', () => {
        beforeEach(() => {
          props = createTestProps({
            hasAmountWarning: true,
          });
          wrapper = shallow(<MoneyInput {...props} />);
          amountField = wrapper.find(Cleave);
        });

        it('should have error styles', () => {
          expect(amountField).toHaveClassName('warning');
        });
      });
    });
  });
});

describe('callbacks', () => {
  let wrapper;
  let props;
  describe('currency field', () => {
    describe('when changing currency', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyInput {...props} />);
        wrapper.setState({ isOpen: true });
        wrapper
          .find('Option')
          .at(0)
          .prop('onClick')({
          target: {},
        });
      });

      it('should call onChange', () => {
        expect(props.onChange).toHaveBeenCalled();
      });

      it('should call onChange with the new value', () => {
        expect(props.onChange).toHaveBeenCalledWith({
          currencyCode: 'EUR',
        });
      });
    });
  });

  describe('amount field', () => {
    describe('when input loses focus', () => {
      let cleaveComponentReference;
      beforeEach(() => {
        cleaveComponentReference = {
          setRawValue: jest.fn(),
        };
        props = createTestProps({
          value: {
            currencyCode: 'EUR',
            amount: 10,
          },
          onBlur: jest.fn(),
        });
        wrapper = shallow(<MoneyInput {...props} />);
        wrapper.instance().cleaveComponentReference = cleaveComponentReference;
        wrapper
          .find(Cleave)
          .at(0)
          .prop('onBlur')();
      });

      it('should call onBlur', () => {
        expect(props.onBlur).toHaveBeenCalled();
      });
    });
  });
});
