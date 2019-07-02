import React, {
    Component
} from "react"
import audioList from "./config"
var QrReader = '';

class ViewCamera extends Component {
  state = {
      QrReader: false      
  }

  componentDidMount() {      
    try {          
        QrReader = require("react-qr-reader");          
        this.setState({ QrReader: true });
    } catch (e) {
        console.error(e);
    }
  }

  handleError = err => {
      console.error(err)
  }

  handleLoad = url => {
      if (typeof url == 'string') {
          url = url.toLowerCase();
          if (audioList.indexOf(url) > -1) {
              this.setState({
                  showQrReader: false,
                  showMP3Player: true,
                  playing: true,
                  url,
                  played: 0,
                  loaded: 0,
                  pip: false
              })
          }
      }
  }

  handleScan = url => {
      console.log(url);
      if (typeof url == 'string') {
          url = url.toLowerCase();
          if (audioList.indexOf(url) > -1) {
              this.setState({
                  showQrReader: false,
                  showMP3Player: true,
                  playing: true,
                  url,
                  played: 0,
                  loaded: 0,
                  pip: false
              })
          }
      }
  }

  handleAfterEnd = data => {
      this.setState({
          url: '',
          showQrReader: true,
          showMP3Player: false,
          showWelcomeScreen: false,
          playing: false
      })
  }

   render() {       
      return (
          <div className='qrcode-wrapper'>
               <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                onLoad={this.handleLoad}
                style={{ width: '100%' }}
                />  
          </div>   
      )
  }
}

export default ViewCamera
