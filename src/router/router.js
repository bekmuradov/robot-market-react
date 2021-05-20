import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import { TheRightPanel } from '../components/TheRightPanel'
import { RobotList } from '../features/products/RobotList'
import { TheRobotPage } from '../features/products/TheRobotPage'
import { Container, Row, Col } from 'react-bootstrap/'
import { ShoppingCart } from '../features/cart/ShoppingCart'

const routes = [
  {
    path: '/robot/:robotId',
    component: React.lazy(() => import('../features/products/SingleRobotPage'))
  },
  {
    path: '/cart',
    component: React.lazy(() => import('../features/cart/ShoppingCart'))
  }
]

const Routes = () => {
  <main>
    <div>Hello</div>
    <Row className="justify-content-between mx-0">
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
          path="/robot/:robotId"
          component={TheRobotPage}
        />
        <Route
          exact
          path="/cart"
          component={ShoppingCart}/>
      </Switch>
    </Row>
    <TheRightPanel />
  </main>
}

export default Routes
