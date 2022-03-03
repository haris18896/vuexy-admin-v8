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
          <Link to='/settings/vpn/blockedapps'>
            <NavLink {...(currentActive === 'blockedApps' && { active: true })}>
              Blocked Apps Setting
            </NavLink>
          </Link>
        </NavItem>
      </Nav>
    </div>
  )
}

export default Menu
