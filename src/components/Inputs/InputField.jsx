import classNames from 'classnames'
import { ErrorMessage as Error } from '@hookform/error-message'
import { Label } from './Label'
import { ErrorMessage } from '../SharedReact'

export function InputField(props) {
  const { name, label, innerRef, errors, prefix, ...attributes } = props
  return (
    <div className="vd-field">
      <Label name={name}>{label}</Label>
      <div className="vd-value">
        <input
          className={classNames('vd-input', {
            'vd-input--error': errors ? errors[name] : false,
            'vd-input--icon-left': prefix,
          })}
          name={name}
          ref={innerRef}
          {...attributes}
        ></input>
        <div className="vd-input-icon vd-input-icon--left vd-input-symbol">
          {prefix}
        </div>
      </div>
      {errors && (
        <Error errors={errors} name={name}>
          {({ message }) => <ErrorMessage>{message}</ErrorMessage>}
        </Error>
      )}
    </div>
  )
}
