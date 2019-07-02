import React, {
    Component
} from "react"
import ReactPlayer from 'react-player'
import audioList from "./config"

class Player extends Component {
    state = {
        url: null,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    }

    componentDidMount() {
        try {
            if (navigator.onLine) {
                audioList.map(r => {
                    console.log(r);
                    const audio = new Audio();
                    audio.src = r;
                    return r;
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    playPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    ref = player => {
        this.player = player;

    }

    handleRestart = data => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(0))
        this.setState({ seeking: true })
    }

    onProgress = state => {
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    }
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    onPause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    onPlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    onError = err => {
        alert("You are offline. For this QR code please go online.");
        this.setState({
            url: '',
            showQrReader: true,
            showMP3Player: false,
            showWelcomeScreen: false,
            playing: false
        })
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
        const { url, playing, controls, muted } = this.state
        return ( <
            >
            <div className='player-wrapper'>
              <ReactPlayer 
                width='100%'
                height='100%'
                autoPlay
                ref={this.ref}
                url={url}     
                onEnded={this.handleAfterEnd}           
                playing={playing}       
                muted={muted}       
                controls={controls}                    
                onPlay={this.onPlay}             
                onPause={this.onPause}
                onProgress={this.onProgress}          
                onError={this.onError}          
                    
              />    
              <div className="audioButton"> 
               <button className="button" onClick={this.handleAfterEnd}>Back</button>
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                <button className="button" onClick={this.handleAfterEnd}>Stop</button>
                <button className="button" onClick={this.handleRestart}>Re-start</button>
                </div>
              </div> <
            />
        )
    }

}

export default Player