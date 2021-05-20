import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { KeyboardArrowUp } from './icons/index'

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  function toggleVisible () {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  function scrollToTop () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <Button
      variant="outline-light"
    >
      <KeyboardArrowUp onClick={scrollToTop}
        className="scroll-button-fixed"
        style={{ display: visible ? 'inline' : 'none' }} />
    </Button>
  )
}
