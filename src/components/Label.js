export function Label(props) {
  const { name, children, ...attributes } = props
  return (
    <label className="vd-label" htmlFor={name} {...attributes}>
      <span>{children}</span>
    </label>
  )
}
