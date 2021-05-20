/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartByVal, updateItemQtyByVal, getItemById, setCartItemsLength } from '../cart/cartSlice'
import { Card, Row, Col, Badge, Form, Button } from 'react-bootstrap/'
import { dateFilter, thaiCurrencyFormat } from '../../app/js/helpers'

export const RobotItem = ({ robot }) => {
  // set initial quantity value to 1
  // because the min acceptable value is 1
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  // Boolean to prevent adding more than 5 items
  const isFiveItems = useSelector(state => state.cart.isFiveItems)

  // check if selected item is already in the cart
  const itemInTheCart = useSelector(state => getItemById(state, robot.id))

  const totalAmount = () => Number(quantity) * Number(robot.price)

  function handleSubmit (e) {
    e.preventDefault()
    // DO VALIDATION BEFORE ADDING ITEM TO CART
    // boolean check just to be sure
    const isSaveToDispatch = Boolean(quantity) && Boolean(totalAmount())
    if (isSaveToDispatch) {
      // if item in the cart
      // update its quanity, total qty & total price of the cart
      if (itemInTheCart) {
        // check, to prevent adding item to the cart more than its stock
        if ((itemInTheCart.quantity + Number(quantity)) > robot.stock) {
          return alert("You can't add more than product's stock")
        } else {
          // if item in the cart
          // and quatity is less than stock
          // update its qty in the cart
          savelyUpdateTheQty()
        }
      } else {
        // if item not in the card add new item
        // five diff robots allowed
        // notify if it's more than five
        if (isFiveItems) {
          return alert('You can add up to 5 different robots to cart')
        }
        // if items in the cart less than 5 add new item
        savelyAddNewItem()
      }
    }

    // update boolean cart's length
    // to prevent adding more than 5 products to cart
    // this call will run every time new item added to cart or updated
    dispatch(setCartItemsLength())

    // reset the quantity to 1
    setQuantity(1)
  }
  // dispatches action to add new item
  function savelyAddNewItem () {
    const newCartItem = {
      ...robot,
      quantity: Number(quantity),
      amount: totalAmount()
    }
    dispatch(addToCartByVal(newCartItem))
  }
  // if item in the cart
  // dispatches action to update it's qty, total qty, total price
  function savelyUpdateTheQty () {
    const updatedItem = {
      ...robot,
      quantity: Number(quantity),
      amount: totalAmount()
    }
    dispatch(updateItemQtyByVal(updatedItem))
  }
  return (
    <Col xs={6} md={4} lg={3} className="px-1 py-1">
      <Card className={itemInTheCart ? 'border border-seagreen' : ''}>
        <Card.Img variant="top" src={robot.image} />
        <Card.Body className="py-1 px-3">
          <Card.Title className="h6 min-height-45">{robot.name}</Card.Title>
          <Card.Text>
            <span className="font-weight-bolder">
              {thaiCurrencyFormat(robot.price)}
            </span>
            / each
          </Card.Text>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId={robot.id} className="mx-0">
                <Form.Label srOnly>
                  {'Add 1pc ' + robot.name + ' robot to cart'}
                </Form.Label>
                <Col xs={6} className="px-0">
                  <Form.Control
                    type="number"
                    placeholder="1"
                    value={!robot.stock ? 0 : quantity}
                    min="1"
                    max={robot.stock}
                    disabled={!robot.stock}
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Col>
                <Col xs={6} className="px-1">
                  <Button
                    className="px-13 btn-seagreen font-weight-bolder"
                    variant="outline-success"
                    type="submit"
                    disabled={!robot.stock}
                  >
                    Add
                  </Button>
                </Col>
              </Form.Group>
            </Form>
            <div>
              <small className="float-left seagreen text muted">
                {itemInTheCart ? itemInTheCart.quantity + ' in cart' : ''}
              </small>
              <small className="float-right text-muted">
                stock {robot.stock}
              </small>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted" title={dateFilter(robot.createdAt)}>{dateFilter(robot.createdAt)}</small>
          <Badge
            pill
            variant="light"
            className="px-1 float-right badge-seagreen"
          >
            {robot.material}
          </Badge>
        </Card.Footer>
      </Card>
    </Col>
  )
}
