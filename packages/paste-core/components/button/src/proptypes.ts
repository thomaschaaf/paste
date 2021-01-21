import * as PropTypes from 'prop-types';

export const DirectButtonPropTypes = {
  as: PropTypes.string as any,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'icon', 'icon_small', 'reset']).isRequired as any,
  tabIndex: PropTypes.oneOf([0, -1]) as any,
  type: PropTypes.oneOf(['submit', 'button', 'reset']) as any,
  disabled: PropTypes.bool,
  buttonState: PropTypes.oneOf(['disabled', 'loading', 'default']).isRequired as any,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'destructive',
    'destructive_link',
    'destructive_secondary',
    'link',
    'inverse_link',
    'inverse',
    'reset',
  ]) as any,
};

export const ButtonPropTypes = {
  as: PropTypes.string as any,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'icon', 'icon_small', 'reset']) as any,
  tabIndex: PropTypes.oneOf([0, -1]) as any,
  type: PropTypes.oneOf(['submit', 'button', 'reset']) as any,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'destructive',
    'destructive_link',
    'destructive_secondary',
    'link',
    'inverse_link',
    'inverse',
    'reset',
  ]).isRequired as any,
};
