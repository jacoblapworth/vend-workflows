export const Switch = React.forwardRef((props, innerRef) => (
  <div className="vd-switch vd-switch--small">
    <input
      className="vd-switch-input"
      type="checkbox"
      ref={innerRef}
      {...props}
    />
    <div className="vd-switch-track">
      <i className="fa fa-check vd-switch-icon" />
      <i className="fa fa-times vd-cross-icon" />
      <div className="vd-switch-track-knob" />
    </div>
  </div>
))
