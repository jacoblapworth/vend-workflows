import Link from 'next/link'
import { SideNav, SideNavContent, SideNavDrawer, NavItem, A } from './style'

export function SideBar() {
  return (
    <SideNav>
      <SideNavContent>
        <SideNavDrawer>
          <NavItem>
            <Link href="/setup">
              <A>Setup</A>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/business-rules">
              <A>Business Rules</A>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/custom-fields">
              <A>Custom Fields</A>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/products">
              <A>Products</A>
            </Link>
          </NavItem>
        </SideNavDrawer>
      </SideNavContent>
    </SideNav>
  )
}

export default SideBar
