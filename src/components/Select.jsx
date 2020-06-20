import { Label } from './Label'

export function Select(props) {
  const { label, name, innerRef, children, ...attributes } = props
  return (
    <div className="vd-field">
      <Label name={name}>{label}</Label>
      <select className="vd-select" name={name} ref={innerRef} {...attributes}>
        {children}
      </select>
    </div>
  )
}
