import * as React from 'react';
import { Component } from 'react';
import './Video.scss';

// Types
import { VideoType } from '@/types';

type Props = {
    source: VideoType
}

type State = {
    playing: boolean
}

export default class Video extends Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            playing: false,
        };
        
        this.loadVideo = this.loadVideo.bind(this);
    }

    loadVideo() {
        this.setState({
            playing: true
        })
    }

    render() {
        if (this.state.playing) {
            return (
                <div className='video'>
                    <iframe width="800" height="450" src={makeSourceUrl(this.props.source)} frameBorder="0" data-allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
            )
        } else {
            let bg = {backgroundImage: 'url(' + getVideoImageUrl(this.props.source.url) + ')'};
            return <div className='video'><div className="placeholder" onClick={this.loadVideo} style={bg}></div></div>;
        }
    }
}

/**
 * Takes an in and an out time in format HH:MM:SS and returns a query string to be appended to the source link (YT)
 * @param {*} start Time in format HH:MM:SS
 * @param {*} end Time in format HH:MM:SS
 */
function makeSourceUrl(source: VideoType) {
    let s = source.url + `?start=${makeTime(source.start)}` + (source.stop ? `&end=${makeTime(source.stop)}` : '');
    s += '&showinfo=0&autoplay=1'
    return s;
}

/**
 * Takes a time in HH:MM:SS and converts it to seconds
 * @param {*} t Time in format HH:MM:SS
 */
function makeTime(t: string): number {
    let newT = t.split(':').map(x => parseInt(x)); // [H, M, S]
    let seconds = 0;

    seconds += newT[0] * 60 * 60; // calc hours
    seconds += newT[1] * 60; // calc minutes
    seconds += newT[2]; // calc seconds
    
    return seconds;
}

/**
 * Takes a youtube embed url and returns the url of the high-quality default image
 * @param {*} source source youtube video embed link
 */
function getVideoImageUrl(source: string): string {
    let u = 'https://img.youtube.com/vi/<ID>/hqdefault.jpg';
    let id = source.split('/');
    u = u.replace('<ID>', id[id.length - 1]);
    return u;
}