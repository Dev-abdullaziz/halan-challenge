import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import {signoutAction} from '../actions/auth'
import '../css/map.css'
import { setPolygonAction } from '../actions/map'

function Map(props) {
  const [deleted,setDeleted] = useState(0)

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 30.033333, lng: 31.233334 },
      zoom: 12,
    })

    function getZones() {
      fetch('https://zones-backend-halan.herokuapp.com/zones', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())
      .then(data => {
        let zones = data.data
        for(let i=0;i < zones.length;i++) {
          const path = zones[i].points.map(point => {
            return {
              lat: parseFloat(point.lat),
              lng: parseFloat(point.lng)
            }
          })
          const zone = new window.google.maps.Polygon({
            paths: path,
            strokeColor: zones[i].color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: zones[i].color,
            fillOpacity: 0.35,
          })
          zone.setMap(map)
          function deleteZone(){
            let confirm = prompt(`Do you really want to delete the ${zones[i].label} zone?`,'No')
            if(confirm !== null && confirm.toLowerCase() === 'yes') {
              fetch(`https://zones-backend-halan.herokuapp.com/zones/${zones[i]._id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`
                }}).then(data => { 
                  zone.setMap(null)
                  console.log(data) 
                  alert(`The ${zones[i].label} zone has been deleted`)
                  setDeleted(deleted+1)
                })
            }
          }
          zone.addListener("click", deleteZone)
        }
      })
    }

    getZones()

    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          window.google.maps.drawing.OverlayType.POLYGON,         
        ],
      },
     
      polygonOptions: {
        fillColor: "#ffff00",
        fillOpacity: 0.5,
        strokeWeight: 3,
        clickable: true,
        editable: true,
        zIndex: 1,
      },
    })
    
    let myPolygon = {
      label:'',
      color:'',
      path: []
    }

    window.google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      var path = polygon.getPath()
      for (let i = 0; i < path.getLength(); i++) {
        const xy = path.getAt(i);
        myPolygon.path.push({lat: xy.lat(), lng: xy.lng()})
        }
      props.dispatch(setPolygonAction(myPolygon.path))
      props.showSaveZone()
    })

    drawingManager.setMap(map)
  },[deleted, props.savedPolygons])

  const {token} = props
  const signout = () => {
      props.dispatch(signoutAction())
  }

  if(token === null) {
      return <Redirect to='/'/>
  }
  
  return (
      <Container fluid className='map'> 
          <Row className='nav'>
              <Col>
                  <button onClick={signout}>Sign out</button>
              </Col>
          </Row>
          <Row>
              <Col className='map-container'>
                <div id='map'></div>
              </Col>
          </Row>
      </Container>
  )
}

function mapStateToProps({token,savedPolygons}){
    return {
        token,
        savedPolygons
    }
}

export default connect(mapStateToProps)(Map)