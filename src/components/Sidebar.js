import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h5>Sidebar</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">Navigator</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Bin</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Statistics</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Characters</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
