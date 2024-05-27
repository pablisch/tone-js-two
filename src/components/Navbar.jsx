import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <NavLink className='navlink' to='/tone1'>Synth 1</NavLink>
      <NavLink className='navlink' to='/tone2'>Synth 2</NavLink>
      <NavLink className='navlink' to='/tone3'>Synth 3</NavLink>
      <NavLink className='navlink' to='/tone4'>Sampler 1</NavLink>
    </nav>
  )
}

export default Navbar
