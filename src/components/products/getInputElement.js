import { InputField } from '../InputField'
import { Switch } from '../Switch'
import { Label } from '../Label'

export const getInputElement = (element, formMethods, rest) => {
  const { register, errors } = formMethods

  const {
    key: name,
    value: title,
    field: { type, options },
    isRequired,
  } = element

  switch (type) {
    case 'STRING':
      return (
        <InputField
          key={name}
          name={name}
          label={title}
          innerRef={register()}
          errors={errors}
        />
      )
    case 'INTEGER':
      return (
        <InputField
          key={name}
          name={name}
          label={title}
          innerRef={register()}
          errors={errors}
          type="number"
        />
      )
    case 'BOOLEAN':
      return (
        <div className="vd-field" key={name}>
          <Switch name={name} ref={register} />
          <Label className="vd-ml2" name={name}>
            {title}
          </Label>
        </div>
      )
    default:
      return null
  }
}

export default getInputElement
