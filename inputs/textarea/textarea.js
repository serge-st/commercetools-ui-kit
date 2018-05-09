import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import TextareaAutosize from 'react-textarea-autosize';
import FlatButton from '@commercetools-local/ui-kit/buttons/flat-button';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-local/ui-kit/icons';
import Constraints from '../../materials/constraints';
import styles from './textarea.mod.css';

class TextArea extends React.Component {
  static displayName = 'TextArea';
  DEFAULT_ROWS_NUMBER = 1;
  state = {
    isCollapsed: false,
    rows: this.DEFAULT_ROWS_NUMBER,
    value:
      'The wild fox jumps into the next fence once its done in a very rThe wild fox jumps into the next fence once its done in a very rThe wild fox jumps into the next fence once its done in a very r',
  };

  propTypes = {
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
    placeholder: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  // NOTE: order is important here
  // * a disabled-field currently does not display warning/error-states so it takes precedence
  // * a readonly-field cannot be changed, but it might be relevant for validation, so error and warning are checked first
  // how you can interact with the field is controlled separately by the props, this only influences visuals
  getStyles = props => {
    if (props.isDisabled) return styles.disabled;
    if (props.hasError) return styles.error;
    if (props.hasWarning) return styles.warning;
    if (props.isReadOnly) return styles.readonly;

    return styles.pristine;
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  toggleCollapse = () => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  };

  handleOnFocus = () => {
    if (this.state.isCollapsed) {
      this.toggleCollapse();
    }
    if (this.props.onBlur) this.props.onBlur();
  };

  handleOnHeightChange = newRows => {
    // The proxy component considers the padding style as an extra row
    const newRowsCount = newRows - 1;
    console.log('handleOnHeightChange', newRowsCount);
    this.setState({
      rows: newRowsCount,
    });
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div>
          <TextareaAutosize
            name={this.props.name}
            onChange={() => {
              console.log('change!');
            }}
            onHeightChange={(_, innerComponent) => {
              console.log(innerComponent);
              this.handleOnHeightChange(innerComponent.rowCount);
            }}
            onBlur={this.props.onBlur}
            onFocus={this.handleOnFocus}
            disabled={this.props.isDisabled}
            placeholder={this.props.placeholder}
            className={this.getStyles(this.props)}
            readOnly={this.props.isReadOnly}
            autoFocus={this.props.isAutofocussed}
            style={{
              resize:
                this.state.isCollapsed || this.props.isDisabled
                  ? 'none'
                  : 'vertical',
            }}
            /* ARIA */
            aria-readonly={this.props.isReadOnly}
            role="textbox"
            contentEditable={!this.props.isReadOnly}
            minRows={this.DEFAULT_ROWS_NUMBER}
            maxRows={
              this.state.isCollapsed ? this.DEFAULT_ROWS_NUMBER : undefined
            }
          />

          {(this.state.rows > this.DEFAULT_ROWS_NUMBER ||
            this.state.isCollapsed) && (
            <FlatButton
              onClick={this.toggleCollapse}
              type="primary"
              isDisabled={this.props.isDisabled}
              label={this.state.isCollapsed ? 'Expand' : 'Collapse'}
              icon={
                this.state.isCollapsed ? (
                  <AngleDownIcon size="small" />
                ) : (
                  <AngleUpIcon size="small" />
                )
              }
            />
          )}
        </div>
      </Constraints.Horizontal>
    );
  }
}

export default TextArea;
