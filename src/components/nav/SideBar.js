export function SideBar(props) {
  return (
    <div className="react-sidenav nv-sidenav vd-sidebar nv-sidenav-content">
      <div className="vd-sidebar-drawer">
        <div className="vd-nav-item vd-nav-item--active">
          <a
            className="vd-nav-item-action"
            href="https://thetaxman.vendhq.com/webregister"
          >
            <div className="vd-nav-item-label">Business Rules</div>
          </a>
        </div>
        <div className="vd-nav-item">
          <a
            className="vd-nav-item-action"
            href="https://thetaxman.vendhq.com/webregister"
          >
            <div className="vd-nav-item-label">Custom Fields</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SideBar
