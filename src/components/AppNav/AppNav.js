import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import navItems from '../../config/Sections.json';

class AppNav extends Component {
  render() {
    const { handleNavClick } = this.props;

    return (
      <Navbar color="light">
        {navItems.map((navItem) =>
          <a href="#" onClick={ () => handleNavClick( navItem.value )} >
            { navItem.label } |
          </a>
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
