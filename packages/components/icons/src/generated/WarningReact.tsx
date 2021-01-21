// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/warning.react.svg

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

const SvgWarning = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="warning_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="warning_react_svg__MC-icon-set"
        transform="translate(-24 -312)"
        fill="#000"
      >
        <g id="warning_react_svg__Notices" transform="translate(24 312)">
          <g id="warning_react_svg__Warning">
            <path
              d="M20.678 17.887L13.37 5.229c-.752-1.305-1.987-1.305-2.74 0L3.322 17.887c-.754 1.305-.137 2.373 1.37 2.373h14.616c1.508 0 2.124-1.068 1.37-2.373zm-7.96.049a.976.976 0 01-.712.297.98.98 0 01-.721-.297.994.994 0 01-.3-.72c0-.276.104-.513.3-.712.197-.2.439-.3.72-.3.278 0 .51.1.712.3a.98.98 0 01.295.711c0 .281-.099.522-.295.72zm-.36-2.286h-.717c-.962-3.774-1.441-5.814-1.441-6.112 0-.364.184-.657.557-.88a2.344 2.344 0 011.25-.335c.498 0 .92.116 1.272.356.345.237.52.52.52.845 0 .307-.477 2.352-1.44 6.126z"
              id="warning_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgWarning.displayName = 'SvgWarning';

const WarningIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgWarning {...props} css={getIconStyles(props, theme)} />;
};

WarningIcon.displayName = 'WarningIcon';
export default WarningIcon;
