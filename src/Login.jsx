import React from 'react'

export default function login() {
  return (
    <div>
        <form>
            <input type="text" value="" placeholder='Enter username' required/>
            <input type="password" value="" placeholder='Enter password' required/>
            <input type="submit" />
        </form>
    </div>
  )
}
