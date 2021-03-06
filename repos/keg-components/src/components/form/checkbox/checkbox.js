import { View } from 'KegView'
import { Check } from '../../../assets/icons/check'
import React, { forwardRef } from 'react'
import { CheckboxWrapper } from './checkbox.wrapper'
import { noPropObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { Input as KegInput } from '../../internal/input.web'

// Styles are defined here so that they are enforced
// Due to how the checkbox is designed, these styles should not be changed
// Which is why they are not defined within the theme
const checkBoxStyles = {
  icon: {
    position: 'relative',
    zIndex: 1,
    height: 14,
    width: 14,
    top: 0,
    left: 3,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    margin: 0,
    opacity: 0,
    cursor: 'pointer',
  },
}

/**
 * Wrap the internal component with the Styles Injector Hoc
 * <br/>This allows us to add the styles as css classes
 */
const Input = StyleInjector(KegInput, {
  maxSelectors: 0,
  kegComponent: true,
  displayName: 'Checkbox',
  className: 'keg-checkbox',
})

const Element = React.forwardRef((props, ref) => {
  const {
    className,
    elProps,
    styles = noPropObj,
    CheckIcon = Check,
    checked,
    ...attributes
  } = props

  const checkStyle = useStyle(checkBoxStyles.icon, styles.indicator)
  const inputStyle = useStyle(styles.input, checkBoxStyles.input)

  return (
    <View
      style={styles.main}
      className={className}
    >
      <View
        className='keg-checkbox-area'
        style={styles.area}
      />

      { checked && (
        <CheckIcon
          className='keg-checkbox-icon'
          style={checkStyle}
        />
      ) }

      <Input
        className='keg-checkbox'
        {...elProps}
        {...attributes}
        role='checkbox'
        checked={checked}
        type='checkbox'
        ref={ref}
        style={inputStyle}
      />
    </View>
  )
})

export const Checkbox = forwardRef((props, ref) => (
  <CheckboxWrapper
    {...props}
    elType={'checkbox'}
    Element={Element}
    isWeb={true}
    ref={ref}
  />
))

Checkbox.propTypes = { ...CheckboxWrapper.propTypes }
