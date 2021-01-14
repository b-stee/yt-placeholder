/* eslint-disable no-unused-vars, no-use-before-define, no-undef */

let firstVideo

let player
let playerLoaded
let done = false

const firstScriptTag = document.getElementsByTagName('script')[0]
const tag = document.createElement('script')

tag.src = 'https://www.youtube.com/iframe_api'

// Aside from styling the placeholder assets, the following if/else block is
// the only thing above and beyond what's already happening...
const setVideo = (vid) => {
    if (playerLoaded) {
        player.loadVideoById(vid)
    } else {
        document.getElementById('yt-button').innerHTML = loadingSpinner
        firstVideo = vid
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        playerLoaded = true
    }
}

const onPlayerReady = (event) => {
    event.target.playVideo()
}

const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING && !done) {
        done = true
    }
}

// eslint-disable-next-line vars-on-top, no-var
var onYouTubeIframeAPIReady = () => {
    document.getElementById('player').innerHTML = ''
    player = new YT.Player('player', {
        videoId: firstVideo,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    })
}
