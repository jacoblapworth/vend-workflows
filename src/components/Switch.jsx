import React from 'react'

export const Switch = React.forwardRef(function Switch(props, innerRef) {
  return (
    <div className="vd-switch vd-switch--small">
      <input
        className="vd-switch-input"
        type="checkbox"
        {...props}
        ref={innerRef}
      />
      <div className="vd-switch-track">
        <i className="fa fa-check vd-switch-icon" />
        <i className="fa fa-times vd-cross-icon" />
        <div className="vd-switch-track-knob" />
      </div>
    </div>
  )
})
