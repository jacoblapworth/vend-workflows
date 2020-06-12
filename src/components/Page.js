export function Page(props) {
  const { children } = props
  return (
    <section className="vd-section">
      <div className="vd-section-wrap">
        {children}
      </div>
    </section>
  )
}

export default Page
