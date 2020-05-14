import Link from 'next/link'
import { NavHeader } from '../components/nav/header';

function HomePage() {
  return (
    <>
      <NavHeader />
      <div className='vd-section'>

        <h1>Workflows by Vend</h1>
        <p>
          Every retailer is unique though, and at Vend we want to fit around the way you work, not force you to mould your business around the way we work. That’s why we offer you choice in terms of ecommerce and accounting partners (so you can choose what works best for you) and why we partner with many payment providers, rather than forcing you to use our rate.
          </p>
        <a className='vd-btn vd-btn--do' href='/api/vend/auth'>Connect to Vend</a>
      </div>
    </>
  )
}

export default HomePage
