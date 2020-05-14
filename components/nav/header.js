import Link from 'next/link'

export function NavHeader() {
  return (
    <div className='vd-topbar'>
      <div className='hs-layout-app-name vd-nav-item'>
        <Link href='/'><a className='vd-nav-item-action'><div className='vd-nav-item-label'>Workflows</div></a></Link>
      </div>
    </div>
  )
}

export default NavHeader
