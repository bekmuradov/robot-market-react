/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilterValue } from './robotsSlice'
import { Dropdown } from 'react-bootstrap'
export const FilterToggle = ({ materials }) => {
  const dispatch = useDispatch()
  // sets the chosen filter from dropdown menu in the robots state
  function handleFilter (e) {
    dispatch(setFilterValue(e.target.textContent))
  }

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      className="btn-seagreen"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
      &#x25bc;
    </a>
  ))

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <span>{materials.length} materials{' '}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {materials.map((material, i) => (
          <Dropdown.Item
            onClick={e => handleFilter(e)}
            eventKey={i}
            key={i}>{material}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
