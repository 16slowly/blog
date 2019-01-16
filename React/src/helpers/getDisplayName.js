/**
 * @see https://github.com/vivedu/VIVEDU-Homepage/issues/116
 */

export default WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
