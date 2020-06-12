import React from "react";
import dynamic from 'next/dynamic'
import { useForm, Controller } from "react-hook-form";

const Dialog = dynamic(() => import('@vendhq/shared-react')
  .then((module) => module.Dialog), { ssr: false }
)

const Button = dynamic(() => import('@vendhq/shared-react')
  .then((module) => module.Button), { ssr: false }
)

// const Switch = dynamic(() => import('@vendhq/shared-react')
//   .then((module) => module.Switch), { ssr: false }
// )

const Switch = React.forwardRef((props, ref) => (
  <div
    className='vd-switch vd-switch--small'
  >
    <input className="vd-switch-input" type="checkbox" ref={ref} {...props} />
    <div className="vd-switch-track">
      <i className="fa fa-check vd-switch-icon" />
      <i className="fa fa-times vd-cross-icon" />
      <div className="vd-switch-track-knob" />
    </div>
  </div>
))


export default function AddCustomField(props) {
  const { onClose } = props

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Dialog
      dismissible={true}
      header={'Add Custom Field.'}
      content={
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='vd-field'>
              <label className="vd-label" htmlFor="customFieldEntity">
                <span>Entity Type</span>
              </label>
              <select className="vd-select" name='customFieldEntity' ref={register({ required: true })}>
                <option value="product">Product</option>
                <option value="sale">Sale</option>
                <option value="line_item">Line Item</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div className='vd-field'>
              <label className="vd-label" htmlFor="customFieldName">
                <span>Name</span>
              </label>
              <input className='vd-input' name="customFieldName" ref={register({ required: true })}></input>
            </div>
            <div className='vd-field'>
              <label className="vd-label" htmlFor="customFieldName">
                <span>Title</span>
              </label>
              <input className='vd-input' name="customFieldTitle" ref={register({ required: true })}></input>
            </div>
            <div className='vd-field'>
              <Switch name="customFieldVisible" ref={register} />
              <label className="vd-label vd-ml2" htmlFor="customFieldVisible">
                <span>Visible in UI</span>
              </label>
            </div>
          </form>
        </>
      }
      actions={
        <div className="vd-btn-group">
          <Button onClick={onClose} variant="supplementary">
            Cancel
              </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            Add
              </Button>
        </div>
      }
      onClose={onClose}
      size={'medium'}
    />
  )
}