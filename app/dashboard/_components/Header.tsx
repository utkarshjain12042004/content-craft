import { Search, LogOut } from 'lucide-react';
import React from 'react';
import { useClerk } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
      {/* Heading */}
      <h1 
        style={{
          background: 'linear-gradient(to right, purple, blue)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bolder',
          fontSize: '40px',
          textAlign: 'left',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          
        }}
      >
        Content Craft
      </h1>

      {/* Search Bar */}
      <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white'>
        <Search />
        <input 
          type='text' 
          placeholder='Search...'
          className='outline-none bg-transparent'  
        />
      </div>

      {/* UserButton component */}
      <UserButton />
    </div>
  );
}

export default Header;