import { Link } from 'react-router-dom'
import { Heading } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <>
      <div className='nav'>
        <div className='nav-content'>
          <div className='logo'>
            <Link to={'/'}>Commutilator</Link>
          </div>
          <div className='menu'>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  )
}
