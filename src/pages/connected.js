import cookies from 'next-cookies'

import dynamic from 'next/dynamic'

const Button = dynamic(() => import('@vendhq/shared-react')
  .then((module) => module.Button), { ssr: false }
)

// const sharedReact = dynamic(() => import('@vendhq/shared-react'), { ssr: false })

function Connected() {
  console.log(Button);

  return (
    <div className='vd-section'>
      <h1>Connected!</h1>
      <Button>Test</Button>
    </div>
  )
}

export default Connected
