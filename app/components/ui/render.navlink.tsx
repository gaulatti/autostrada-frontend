import React from 'react';
import { Link } from '@radix-ui/themes';
import { NavLink } from 'react-router';

interface RenderNavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const RenderNavLink = ({ to, children }: RenderNavLinkProps) => (
  <Link asChild>
    <NavLink to={to}>
      {children}
    </NavLink>
  </Link>
);
