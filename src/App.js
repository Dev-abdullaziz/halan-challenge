import { useState } from 'react'
import './css/App.css'
import Login from './Login'
import { Switch, Route } from 'react-router'
import Map from './Map/Map'
import SaveZonePopup from './Map/SaveZonePopup'

function App(props) {
  const [popupShow, setPopupShow] = useState(false);

  return (
    <div className="App">
      <Switch>
        <Route path='/map'>
          <SaveZonePopup
            show={popupShow}
            onHide={() => setPopupShow(false)}
          />
          <Map 
            showSaveZone={() => setPopupShow(true)}
          />
        </Route>
        <Route path='/'>
          <Login/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
