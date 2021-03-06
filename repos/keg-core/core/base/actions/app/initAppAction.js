import { kegComponentsTheme } from '../../theme/kegComponentsTheme'
import { dispatch } from 'KegStore'
import { ActionTypes } from 'KegConstants'
import { fontLoader } from 'KegNative'
import { fonts } from 'KegAssets/fonts'
import { setDefaultTheme } from '@keg-hub/re-theme'
import { noOpObj, isFunc, isEmptyColl, isObj, limbo } from '@keg-hub/jsutils'

/**
 * Sets the default theme calling ReThemes setDefaultTheme method
 * Passes the theme function response if theme is a function
 * Passes the the kegComponents theme merged with the theme when theme is an object
 * @param {Object|function} theme - Custom theme object or function to override the default theme
 * @param {Object} themeConfig - Custom theme themeConfig to override the theme themeConfig defaults
 *
 * @returns {void}
 */
const setupTheme = (theme, themeConfig = noOpObj) => {
  return setDefaultTheme(
    isFunc(theme)
      ? theme(themeConfig, noOpObj)
      : kegComponentsTheme(themeConfig, theme)
  )
}

/**
 * Initializes the app, by loading any custom fonts and setting up the theme
 * Only loads the fonts if auto-generated fonts are found
 * Only sets the theme if a theme object of function is passed
 * Then updates the app reducer store with initialized true
 * @param {Object|function} [theme=] - Custom theme object to override the default theme
 * @param {Object} [themeConfig=] - Custom theme themeConfig to override the defaults
 *
 * @returns {void}
 */
export const initAppAction = async (theme, themeConfig) => {
  // Auto-load any-autogenerated fonts
  !isEmptyColl(fonts) && (await limbo(fontLoader(fonts)))

  // If a theme object is passed, setup the theme
  ;(isFunc(theme) || isObj(theme)) && setupTheme(theme, themeConfig)

  // Update the store setting the app to be initialized
  dispatch({
    type: ActionTypes.APP_INIT,
    initialized: true,
  })
}
