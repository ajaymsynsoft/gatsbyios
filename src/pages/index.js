import React, {
    Component
} from "react"

import Layout from "../components/layout"
import Player from "../components/reactPlayer"
import ViewCamera from "../components/qrReader"
const queryString = require('query-string');

class IndexPage extends Component {
    state = {
        QrReader: false,
        showQrReader: true,
        showMP3Player: false,
        showWelcomeScreen: true      
    }

    componentDidMount() {
        var parsed = queryString.parse(this.props.location.search);
        try {             
            if (parsed && !!parsed.pwa) {
                this.setState({ showWelcomeScreen: false });
            }
            this.setState({ QrReader: true });
        } catch (e) {
            console.error(e);
        }
    } 


    render() {       
        return (
            <Layout>  
                { this.state.showWelcomeScreen  &&    
                   <div
                      style={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `1.45rem 1.0875rem`,
                      }}
                    >
                    <h1>Welcome.....</h1>
                    <p>Please  <button className="button" onClick={this.handleAfterEnd}>click here</button> to scan QR code.</p>
                  </div>         
                }           
                { !this.state.showWelcomeScreen && this.state.showQrReader && this.state.QrReader && 
                    <ViewCamera />               
                }

                { !this.state.showWelcomeScreen && this.state.showMP3Player && 
                    <Player />                
                }       
            </Layout>
        )
    }
}

export default IndexPage