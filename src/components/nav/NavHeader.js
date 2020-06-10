import Link from 'next/link'

export function NavHeader() {
  return (
    <div className='vd-topbar'>
      <div className='hs-layout-app-name'>
        <Link href='/'><a className='vd-nav-item vd-nav-item-action vd-nav-item-label'>Workflows</a></Link>
      </div>
    </div>
  )
}

export default NavHeader