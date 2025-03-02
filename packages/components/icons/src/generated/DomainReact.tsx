// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/domain.react.svg
/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
export type Props = {
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
export type SVGProps = Props & {
  className: string;
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
} as const;
const getSizeDimensions = (size: Props['size']) => {
  switch (size) {
    case 'scale':
      return {
        width: '100%',
        height: 'auto',
      };
    case 'small':
    case 'medium':
    case 'big':
      return {
        width: `${iconSizes[size]}px`,
        height: `${iconSizes[size]}px`,
      };
    default:
      return {
        width: `${iconSizes.big}px`,
        height: `${iconSizes.big}px`,
      };
  }
};
const getSizeStyle = (size: Props['size']) => {
  const dimensions = getSizeDimensions(size);
  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: ${dimensions.width};
          height: ${dimensions.height};
        }
      `;
    default:
      return `
        width: ${dimensions.width};
        height: ${dimensions.height};
      `;
  }
};
const getColor = (color: Props['color']) => {
  if (!color) return 'inherit';
  let iconColor;
  switch (color) {
    case 'solid':
      iconColor = designTokens.colorSolid;
      break;
    case 'neutral60':
      iconColor = designTokens.colorNeutral60;
      break;
    case 'surface':
      iconColor = designTokens.colorSurface;
      break;
    case 'info':
      iconColor = designTokens.colorInfo;
      break;
    case 'primary':
      iconColor = designTokens.colorPrimary;
      break;
    case 'primary40':
      iconColor = designTokens.colorPrimary40;
      break;
    case 'warning':
      iconColor = designTokens.colorWarning;
      break;
    case 'error':
      iconColor = designTokens.colorError;
      break;
    default:
      break;
  }
  if (!iconColor) {
    warning(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }
  return iconColor;
};
export const getIconStyles = (props: Props) => css`
  *:not([fill='none']) {
    fill: ${getColor(props.color)};
  }
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;
const SvgDomain = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M4.8 20.2c-.495 0-.919-.176-1.27-.528A1.734 1.734 0 0 1 3 18.4V5.8c0-.495.176-.919.53-1.272A1.733 1.733 0 0 1 4.8 4h5.4c.495 0 .919.176 1.272.528.352.353.528.777.528 1.272v1.8h7.2c.495 0 .919.176 1.272.528.352.353.528.777.528 1.272v9c0 .495-.176.919-.528 1.272a1.736 1.736 0 0 1-1.272.528H4.8Zm0-1.8h1.8v-1.8H4.8v1.8Zm0-3.6h1.8V13H4.8v1.8Zm0-3.6h1.8V9.4H4.8v1.8Zm0-3.6h1.8V5.8H4.8v1.8Zm3.6 10.8h1.8v-1.8H8.4v1.8Zm0-3.6h1.8V13H8.4v1.8Zm0-3.6h1.8V9.4H8.4v1.8Zm0-3.6h1.8V5.8H8.4v1.8ZM12 18.4h7.2v-9H12v1.8h1.8V13H12v1.8h1.8v1.8H12v1.8Zm3.6-5.4v-1.8h1.8V13h-1.8Zm0 3.6v-1.8h1.8v1.8h-1.8Z" />
  </svg>
);
SvgDomain.displayName = 'SvgDomain';
const DomainIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgDomain {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
DomainIcon.displayName = 'DomainIcon';
export default DomainIcon;
