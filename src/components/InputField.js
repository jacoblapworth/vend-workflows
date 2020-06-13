import { Label } from './Label'
import { ErrorMessage } from './SharedReact'
import classNames from 'classnames'

export function InputField(props) {
  const { name, label, innerRef, error, ...attributes } = props
  return (
    <div className="vd-field">
      <Label name={name}>{label}</Label>
      <input
        className={classNames('vd-input', { 'vd-input--error': error })}
        name={name}
        ref={innerRef}
        {...attributes}
      ></input>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  )
}
