import classNames from 'classnames'

export const Card = (props) => {
  const { children, className, ...rest } = props
  return (
    <div className={classNames('vd-card', className)} {...rest}>
      {children}
    </div>
  )
}
