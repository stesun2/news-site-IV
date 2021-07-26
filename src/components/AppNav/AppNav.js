import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import navItems from '../../config/Sections.json';
import { Link } from 'react-router-dom'

class AppNav extends Component {
  render() {

    return (
      <Navbar color="light">
        {navItems.map((navItem) =>
          <Link to={`/sections/${navItem.value}`}>{navItem.label}</Link>
        )}
      </Navbar>
    )
  }
}

export default AppNav;


// Functional solution:
// function AppNav({ handleNavClick }) {
//   return (
//     <Navbar color="light">
//       {navItems.map((navItem) =>
//         <a href="#" onClick={() => handleNavClick( navItem.value )} >
//           { navItem.label } |
//         </a>
//       )}
//     </Navbar>
//   );
// }
