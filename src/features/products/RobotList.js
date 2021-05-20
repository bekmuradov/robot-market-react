/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRobots, fetchRobots, getRobotMaterials, getFilterValue, setFilterValue } from './robotsSlice'
import { RobotItem } from './RobotItem'
import { FilterToggle } from './CustomFilterToggle'
import { FilterOutlined } from '../../app/icons/index'

export const RobotList = () => {
  const dispatch = useDispatch()

  const robots = useSelector(getAllRobots)
  const fetchRobotsStatus = useSelector((state) => state.robots.status)
  const error = useSelector((state) => state.robots.error)
  const robotMaterials = useSelector(getRobotMaterials)
  // filter value sets from CustomFilterToggle line 10-12
  const filterValue = useSelector(getFilterValue)

  let content
  // Filter robots by choosen value
  function robotsList () {
    if (filterValue) {
      return robots.filter(robot => robot.material === filterValue)
        .map((robot) => (
          <RobotItem key={robot.id} robot={robot} />
        ))
    } else {
      return robots.map((robot) => (
        <RobotItem key={robot.id} robot={robot} />
      ))
    }
  }

  // FETCHES THE DATA BASED ON FETCH STATUS
  useEffect(() => {
    if (fetchRobotsStatus === 'idle') {
      dispatch(fetchRobots())
    }
    // if val has been choosen update the content
    if (filterValue) {
      content = robotsList()
    }
  }, [fetchRobotsStatus, dispatch, filterValue])

  if (fetchRobotsStatus === 'loading') {
    content = (
      <div className="loading">
        <span className="sr-only">Loading...</span>
      </div>
    )
  } else if (fetchRobotsStatus === 'completed') {
    // // Sort robots in reverse order by date
    // const sortedRobots = robots.slice().sort((a, b) =>
    //   b.createdAt.localeCompare(a.createdAt)
    // )

    content = robotsList()
  } else if (fetchRobotsStatus === 'failed') {
    content = <div>{error}</div>
  }

  function handleFilterReset () {
    dispatch(setFilterValue(null))
    content = robotsList()
  }

  return (
    <div>
      <Row>

        <Col xs={12}><span className="col-12 px-0 text-muted">{content?.length ?? 0} items</span></Col>

        <Col>

          <Row className="align-items-center">

            <Col sm xs={4} md={2} lg={2} className="pr-0">
              <label className="px-0 m-0 py-1" htmlFor="dropdownFilter">
                <FilterOutlined width="24px" height="24px" />Filter by: </label>
            </Col>

            <Col sm xs={4} md={3} lg={2}>
              <FilterToggle materials={robotMaterials} id="dropdownFilter" />
            </Col>

            <Col>
              <button
                onClick={handleFilterReset}
                disabled={!filterValue}
                className="btn btn-sm btn-light"
              >
                Reset filter
              </button>
            </Col>

          </Row>

        </Col>

      </Row>
      <Row>{content}</Row>
    </div>
  )
}
