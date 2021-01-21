// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/flag-linear.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import invariant from 'tiny-invariant';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size?: 'small' | 'medium' | 'big' | 'scale';
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
} as const;

const getSizeStyle = (size: Props['size']) => {
  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: 100%;
          height: auto;
        }
      `;

    case 'small':
    case 'medium':
    case 'big':
      return `
        width: ${iconSizes[size]}px;
        height: ${iconSizes[size]}px;
      `;

    default:
      return `
        width: ${iconSizes.big}px;
        height: ${iconSizes.big}px;
      `;
  }
};

const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

const getColor = (color: Props['color'], theme: Theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars, ...theme }; // @ts-expect-error

  const iconColor = overwrittenVars[`color${capitalize(color)}`];

  if (!iconColor) {
    invariant(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }

  return iconColor;
};

const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgFlagLinear = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="flag-linear_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="flag-linear_react_svg__MC-icon-set"
        transform="translate(-240 -408)"
        fill="#000"
      >
        <g
          id="flag-linear_react_svg__Switch-states"
          transform="translate(24 408)"
        >
          <g id="flag-linear_react_svg__Flag" transform="translate(216)">
            <path
              d="M4.167 3.25v17.417h1.79v-8.178H19.75l-4.408-4.195L19.75 4.1H5.957v-.85h-1.79zm1.79 2.549h9.479l-2.623 2.495 2.623 2.496h-9.48V5.8z"
              id="flag-linear_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgFlagLinear.displayName = 'SvgFlagLinear';

const FlagLinearIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgFlagLinear {...props} css={getIconStyles(props, theme)} />;
};

FlagLinearIcon.displayName = 'FlagLinearIcon';
export default FlagLinearIcon;
