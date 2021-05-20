import React from 'react'
import { useSelector } from 'react-redux'
import { getTotalQuantity } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap'

export const NavBar = () => {
  const totalQuantity = useSelector(getTotalQuantity)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top px-1">
      <div className="container px-0">
        <Link className="navbar-brand" style={{ fontSize: '2.3rem' }} to="/">
          Robot Market
        </Link>
        <div className="justify-content-end" id="navbarNav">
          <Link to="/cart">
            <Button>
                Cart{' '}
              <Badge variant="light">{totalQuantity || 0}</Badge>
              <span className="sr-only">items quantity</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
