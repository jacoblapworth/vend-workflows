export function Section(props) {
  const { children } = props
  return (
    <section className="vd-section">
      <div className="vd-section-wrap">{children}</div>
    </section>
  )
}

export default Section
