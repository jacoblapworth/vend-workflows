import styled from 'styled-components'

export const SideNav = styled.div`
  display: block;
  height: calc(100%);
  z-index: 200;
  position: relative;
`
export const SideNavContent = styled.div`
  background: #fff;
  width: auto;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  box-shadow: 1px 0 0 0 #e5eaed;
`
export const SideNavDrawer = styled.div`
  height: min-content;
  flex-direction: column;
  width: 145px;
`
export const NavItem = styled.div`
  width: 100%;
  height: auto;
  color: #3a4953;
  font-weight: 700;
`
export const A = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 10px;
  color: inherit;
`
export const NavItemLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
`
