import classNames from 'classnames'

export function Label(props) {
  const { name, children, hideLabel, ...attributes } = props
  return (
    <label
      className={classNames('vd-label', { 'vd-hide-desktop': hideLabel })}
      htmlFor={name}
      {...attributes}
    >
      <span>{children}</span>
    </label>
  )
}
