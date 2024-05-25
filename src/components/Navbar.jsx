import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <Link className='navlink' to='/tone1'>Tone1</Link>
      <Link className='navlink' to='/tone2'>Tone2</Link>
      <Link className='navlink' to='/tone3'>Tone3</Link>
    </nav>
  )
}

export default Navbar
