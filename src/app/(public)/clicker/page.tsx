'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export default function ClickerPage() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <h1>React Counter Button</h1>
      <Button
        onClick={handleClick}
      >
        I have been clicked {count} times
      </Button>
    </div>
  )
}