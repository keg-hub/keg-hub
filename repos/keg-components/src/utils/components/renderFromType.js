import React from 'react'
import { isArr } from '@keg-hub/jsutils'
import { isValidComponent } from '../validate/isValidComponent'

/**
 * Checks the passed in Elements type and formats it so react can render it
 * This allows for dynamic rendering of prop children
 * @param {React Component|Object|Array|string} Element - Component to be rendered
 * @param {*} props - Object of props to be passed to the Element
 * @param {React Component=} Wrapper - React component to wrap the Element
 *
 * @returns {React Component|Object} - rendered React Component
 */
export const renderFromType = (Element, props, Wrapper) => {
  return isValidComponent(Element)
    ? React.cloneElement(Element, props, Element.children)
    : isArr(Element)
      ? Element
      : isValidComponent(Wrapper)
        ? (<Wrapper {...props}>{ Element }</Wrapper>)
        : Element
}
