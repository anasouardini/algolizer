import React from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';

export default function sharedLayout() {

  const tailwindClasses = {
    link: 'hover:text-blue-500',
    linkActive: `bg-white text-primary 
                relative before:absolute after:absolute
                `,
    navItem: 'pb-1 flex gap-2 items-center px-2 py-1',
  };

  const activeLink = ({
    isActive,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => (isActive
      ? `${tailwindClasses.navItem} ${tailwindClasses.linkActive}` 
      : `${tailwindClasses.navItem} ${tailwindClasses.link}`
  );

  const listNavItems = () => {
    return (
      <>
        <li>
          <NavLink to='/charts'
              className={activeLink}
            >
            charts
          </NavLink>
        </li>
        <li>
          <NavLink to='/ranking'
              className={activeLink}
            >
            ranking
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className='bg-primary w-[8rem]'>
        <ul className='flex gap-3 backdrop-blur-xl h-[3rem]'>
          {listNavItems()}
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}
