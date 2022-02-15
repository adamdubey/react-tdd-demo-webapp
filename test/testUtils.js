import checkPropTypes from "prop-types/checkPropTypes";
/**
 *
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} value - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */

export const findByTestAttribute = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propTypes, conformingProps, "prop", component.name);
  expect(propError).toBeUndefined();
};
