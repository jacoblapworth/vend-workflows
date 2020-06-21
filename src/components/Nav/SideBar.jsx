import Link from 'next/link'
import { SideNav, SideNavContent, SideNavDrawer, NavItem, A } from './styled'

export function SideBar(props) {
  const { active } = props
  const navItems = [
    {
      name: 'Setup',
      url: '/setup',
    },
    {
      name: 'Business Rules',
      url: '/business-rules',
    },
    {
      name: 'Custom Fields',
      url: '/custom-fields',
    },
    {
      name: 'Products',
      url: '/products',
    },
  ]

  const nav = navItems.map((navItem) => {
    return (
      <NavItem key={navItem.url} active={navItem.url === active}>
        <Link href={navItem.url}>
          <A>{navItem.name}</A>
        </Link>
      </NavItem>
    )
  })
  return (
    <SideNav>
      <SideNavContent>
        <SideNavDrawer>{nav}</SideNavDrawer>
      </SideNavContent>
    </SideNav>
  )
}

export default SideBar
