import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavLink = ({ label, href }) => (
  <Link to={href} className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
    {label}
  </Link>
)

NavLink.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string
}

export default NavLink
