import Link from 'next/link'

export function NavHeader() {
  return (
    <div className="vd-topbar">
      <div className="hs-layout-app-name">
        <Link href="/">
          <a className="vd-nav-item vd-nav-item-action">
            <i className="vd-i vd-i-vend-tag-logo vd-icon vd-nav-item-icon"></i>
            <div className="vd-nav-item-label">Workflows Demo</div>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .vd-nav-item-label {
            font-weight: 700;
            font-size: 15px;
            margin-left: 10px;
          }
          .vd-nav-item-icon {
            font-size: 42px;
          }
        `}
      </style>
    </div>
  )
}

export default NavHeader
