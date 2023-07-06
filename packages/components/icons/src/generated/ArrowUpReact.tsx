// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrow-up.react.svg
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
const SvgArrowUp = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M12.046 21a.887.887 0 0 1-.655-.265.887.887 0 0 1-.265-.654V6.126L7.54 9.69a.9.9 0 0 1-.632.264.857.857 0 0 1-.655-.264A.872.872 0 0 1 6 9.046c0-.26.084-.475.253-.644l5.15-5.15a.813.813 0 0 1 .298-.195c.107-.038.222-.057.345-.057.123 0 .238.019.345.057a.812.812 0 0 1 .299.196l5.15 5.15c.168.168.252.378.252.631a.937.937 0 0 1-.253.656.896.896 0 0 1-.656.276.895.895 0 0 1-.654-.276l-3.563-3.564v13.955a.89.89 0 0 1-.264.654.89.89 0 0 1-.656.265Z" />
  </svg>
);
SvgArrowUp.displayName = 'SvgArrowUp';
const ArrowUpIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgArrowUp {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ArrowUpIcon.displayName = 'ArrowUpIcon';
export default ArrowUpIcon;
