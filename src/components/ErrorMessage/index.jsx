export function ErrorMessage({ message }) {
  return (
    <aside>
      <i className="fa fa-exclamation-triangle vd-icon vd-mr2" />
      {message}

      <style jsx>{`
        aside {
          padding: 1.5em;
          font-size: 15px;
          color: var(--vd-colour--text-inverse);
          background-color: var(--vd-colour--no);
        }
      `}</style>
    </aside>
  )
}
export default ErrorMessage
