import dynamic from 'next/dynamic'

export const Tab = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.Tab),
  { ssr: false }
)
export const Tabs = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.Tabs),
  { ssr: false }
)
export const TabContent = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.TabContent),
  { ssr: false }
)
export const SelectedTabProvider = dynamic(
  () =>
    import('@vendhq/shared-react').then((module) => module.SelectedTabProvider),
  { ssr: false }
)
export const ActionBar = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.ActionBar),
  { ssr: false }
)
export const Button = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.Button),
  { ssr: false }
)
export const Dialog = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.Dialog),
  { ssr: false }
)
export const ErrorMessage = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.ErrorMessage),
  { ssr: false }
)
export const Badge = dynamic(
  () => import('@vendhq/shared-react').then((module) => module.Badge),
  { ssr: false }
)
