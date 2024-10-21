'use client';
import React from 'react';
import { Button } from './ui/button';
import { logout } from '@/actions';

function LogoutButton() {
  const onLogout = async () => {
    const res = await logout();
  };
  return (
    <Button size={'sm'} onClick={onLogout}>
      Sign Out
    </Button>
  );
}

export default LogoutButton;
