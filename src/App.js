import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap/'
import { RobotList } from './features/products/RobotList'
import { ShoppingCart } from './features/cart/ShoppingCartPage'
import { NavBar } from './app/NavBar'
import { TheRightPanel } from './app/TheRightPanel'
import { ScrollButton } from './app/ScrollButton'

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Container>
          <Row className="px-0">
            <Col md={12} lg={9}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <React.Fragment>
                      <RobotList />
                    </React.Fragment>
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  component={ShoppingCart}
                />
              </Switch>
            </Col>
            <Col>
              <TheRightPanel />
            </Col>
          </Row>
          <ScrollButton />
        </Container>
      </div>
    </Router>
  )
}

export default App
