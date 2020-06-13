import classNames from 'classnames'
import { ErrorMessage as Error } from 'react-hook-form'
import { Label } from './Label'
import { ErrorMessage } from './SharedReact'

export function InputField(props) {
  const { name, label, innerRef, errors, ...attributes } = props
  return (
    <div className="vd-field">
      <Label name={name}>{label}</Label>
      <div className="vd-value">
        <input
          className={classNames('vd-input', {
            'vd-input--error': errors[name],
          })}
          name={name}
          ref={innerRef}
          {...attributes}
        ></input>
      </div>
      <Error errors={errors} name={name}>
        {({ message }) => <ErrorMessage>{message}</ErrorMessage>}
      </Error>
    </div>
  )
}
