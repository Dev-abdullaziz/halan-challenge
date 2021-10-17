import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { savePolygonAction } from '../actions/map'

function SaveZonePopup(props) {
  const [zone, setZone] = useState({
    name: '',
    color: ''
  })

  function captureData(event) {
    setZone({
      ...zone,
      [event.target.id]: event.target.value
    })
  }

  async function postZone(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  function saveZone() {
    postZone('https://zones-backend-halan.herokuapp.com/zones',{
      label: zone.name,
      color: zone.color,
      points: props.polygon
    }).then(data => {
      if(data.message !== 'zone created!') {
        alert(data.message)
      }  else {
        props.onHide()
        props.dispatch(savePolygonAction())
        alert('Zone was created successfully')
      }
    })    
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName='saveZone'
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Zone
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' onChange={(event) => captureData(event)}></input>
        <label htmlFor='color'>color</label>
        <input type='color' id='color' onChange={(event) => captureData(event)}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='bg-danger'>discard</Button>
        <Button onClick={saveZone}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}
  
function mapStateToProps({polygon, token}){
  return {
    polygon,
    token
  }
}
export default connect(mapStateToProps)(SaveZonePopup)