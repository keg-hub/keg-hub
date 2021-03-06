import React from 'react'
import { View } from 'KegView'
import { Touchable } from '../touchable'
import { ChevronDown } from '../../assets/icons'
import { noOpObj, isNum } from '@keg-hub/jsutils'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { useStyle, useThemeHover } from '@keg-hub/re-theme'
import { isCssUnits } from '../../utils/helpers/isCssUnits'

const ToggleElWidth = 20

/**
 * Helper method to get the width of the sidebar from the passed in props
 * @function
 * @export
 * @public
 * @param {number} width - The width of the sidebar
 * @param {number} initial - The initial width of the sidebar if width is not passed in
 * @param {Object} styles - The styles object to pull the width from if it exists
 *
 * @returns {boolean} - If the animation should NOT run
 */
export const getSidebarWidth = (width, initial, styles = noOpObj) => {
  return isNum(width) || isCssUnits(width)
    ? width
    : isNum(styles?.main?.width) || isCssUnits(styles?.main?.width)
      ? styles?.main?.width
      : isNum(initial) || isCssUnits(initial)
        ? initial
        : 200
}

/**
 * Gets the location of the Sidebar based on the passed in props
 * @type {function}
 *
 * @returns {string|number} - Initial Location of the Sidebar component
 */
const getToggleLocation = (width, initial, styles, location) => {
  const fullWidth = getSidebarWidth(width, initial, styles)

  // Width of the toggle component, measured from the right side in
  return location === 'left' ? fullWidth : ToggleElWidth
}

/**
 * Restyles View component for the Main Sidebar Component
 * @type {React.Component}
 *
 * @returns {React.Component} - Wrapped reStyle View Component
 */
export const SidebarMain = reStyle(View)({
  h: '100%',
})

/**
 * Restyles View component
 * @type {React.Component}
 * @export
 * @public
 * @param {Object} theme - Global theme object
 * @param {Object} props
 * @param {number} props.width - The width of the sidebar
 * @param {number} props.initial - The initial width of the sidebar if width is not passed in
 * @param {Object} props.styles - The styles object to pull the width from if it exists
 *
 * @returns {React.Component} - Wrapped reStyle View Component
 */
export const SidebarContainer = reStyle(View)((theme, props) => ({
  fl: 1,
  shadowRadius: 6,
  alS: `stretch`,
  shadowOpacity: 0.05,
  bgC: theme.colors.palette.white01,
  shadowOffset:
    props.location === 'right'
      ? { width: -2, height: 2 }
      : { width: 2, height: 2 },
  shadowColor: theme.colors.palette.black03,
  w: getSidebarWidth(props.sidebarWidth, props.initial, props.styles),
}))

export const ToggleMain = reStyle(View)((theme, props) => {
  return {
    position: 'absolute',
  }
})

/**
 * Restyles Touchable component
 * @type {React.Component}
 * @export
 * @public
 * @param {Object} theme - Global theme object
 * @param {Object} props
 *
 * @returns {React.Component} - Wrapped reStyle Touchable Component
 */
export const ToggleAction = reStyle(({ styles, location, ...props }) => {
  const locStyles = useStyle(styles.main, styles[location])
  const [ ref, style ] = useThemeHover(locStyles, styles.hover)

  return <Touchable
    {...props}
    style={style}
    touchRef={ref}
  />
}, 'styles')((theme, props) => ({
  main: {
    w: ToggleElWidth,
    pH: 1,
    pV: 15,
    tp: `45vh`,
    bRad: 3,
    minH: 50,
    alI: 'center',
    jtC: 'center',
    pos: 'relative',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    transitionDuration: '0.8s',
    bgC: theme?.colors?.palette?.black01,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: theme?.colors?.palette?.black03,
    transitionProperty: 'width height background-color',
    [props.location || 'left']: getToggleLocation(
      props.sidebarWidth,
      props.initial,
      props.styles,
      props.location
    ),
  },
  hover: {
    minH: 75,
    width: 30,
    bgC: theme?.colors.palette?.blue02,
    ...(props.location === 'right' && { right: 30 }),
  },
  left: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  right: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}))

/**
 * Restyles Icon component
 * @type {React.Component}
 * @export
 * @public
 * @param {Object} theme - Global theme object
 * @param {Object} props
 * @param {number} props.width - The width of the sidebar
 * @param {number} props.initial - The initial width of the sidebar if width is not passed in
 * @param {Object} props.styles - The styles object to pull the width from if it exists
 *
 * @returns {React.Component} - Wrapped reStyle Icon Component
 */
export const ToggleIcon = reStyle(props => {
  const { styles, hovered, ...iconProps } = props
  return (
    <ChevronDown
      {...iconProps}
      width={styles?.width}
      height={styles?.height}
      {...(hovered && styles?.hover)}
      style={styles?.main}
    />
  )
}, 'styles')({
  main: {
    lt: -1,
    pos: 'relative',
    transitionDuration: '0.8s',
    transitionProperty: 'width height transform stroke color',
  },
  width: 18,
  height: 18,
  hover: {
    width: 25,
    height: 25,
  },
})
