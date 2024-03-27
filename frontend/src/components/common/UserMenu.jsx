import React from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useUserStore } from '../../store/userStore'
import menuConfigs from '../../configs/menu.configs'
import { AiOutlineLogout } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { routesGen } from '../../routes/routes'

const UserMenu = () => {
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const navigate = useNavigate()

  return (
    <>
      {user && (
        <>
          <DropdownButton
            id="bg-vertical-dropdown"
            variant="outline-info"
            title={user?.username}
            style={{ paddingRight: '4rem' }}
          >
            {menuConfigs.user.map((item, index) => (
              <Dropdown.Item as={Link} to={item.path} key={index}
                style={{
                  textShadow: '1px 1px 1px #000',
                  color: '#fff',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#202224'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >{item.display}</Dropdown.Item>
            ))}
            <Dropdown.Divider style={{ backgroundColor: '#696868' }} />
            <Dropdown.Item key="4" as={Button}
              onClick={() => {
                setUser(null)
                navigate(routesGen.home)
              }}
              style={{
                textShadow: '1px 1px 1px #000',
                color: '#fff',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#202224'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            ><AiOutlineLogout
                style={{ marginRight: '1rem' }}
              />Logout</Dropdown.Item>
          </DropdownButton>
        </>
      )}
    </>

  )
}

export default UserMenu