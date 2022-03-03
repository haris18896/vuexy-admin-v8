import { Nav, NavItem, NavLink } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'

const Menu = props => {
  const { currentActive } = props
  return (
    <div>
      <CardTitle>App Settings</CardTitle>
      <Nav pills>
        <NavItem>
          <Link to='/settings/app/ad'>
            <NavLink {...(currentActive === 'ad' && { active: true })}>
              Ad Setting
            </NavLink>
          </Link>
        </NavItem>
      
        <NavItem>
          <Link to='/settings/app/payment'>
            <NavLink {...(currentActive === 'payment' && { active: true })}>Payment Setting</NavLink>
          </Link>
        </NavItem>

        <NavItem>
          <Link to='/settings/app/inappupdate'>
            <NavLink {...(currentActive === 'inappupdate' && { active: true })}>InAppUpdate Setting</NavLink>
          </Link>
        </NavItem>
      </Nav>
    </div>
  )
}

export default Menu
