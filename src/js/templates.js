/* eslint-disable no-unused-vars, no-undef, arrow-body-style, block-spacing, brace-style */
const ytPlayButtonSVG = '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="10%"><path id="play-button" class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#000000b6"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'

const loadingSpinner = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'

const playlistItem = (ref, title) => {return `<tr id="${ref}" class="yt-thumb" onclick="setVideo(this.id)"><td class="yt-thumb"><img class="yt-thumb" src="https://img.youtube.com/vi/${ref}/mqdefault.jpg"></td><td><p><strong>${title}</strong></p></td></tr>`}

const placeholder = (videos) => {return `<div id="pre-play-img" class="pre-play-img" onclick="setVideo('${Object.keys(videos)[0]}')"><img class="placeholder" src="https://img.youtube.com/vi/${Object.keys(videos)[0]}/maxresdefault.jpg"><div id="yt-button" class="yt-button">${ytPlayButtonSVG}</div></div>`}

const playButtonRestyleFillHoverListners = () => {
    const playButton = document.getElementById('play-button')
    const prePlayImg = document.getElementById('pre-play-img')

    prePlayImg.addEventListener('mouseover', (event) => {
        playButton.style.fill = 'red'
    })

    prePlayImg.addEventListener('mouseout', (event) => {
        playButton.style.fill = '#000000b6'
    })
}

const load = (videos) => {
    let playlistItems = ''
    // eslint-disable-next-line no-restricted-syntax
    for (const [ref, title] of Object.entries(videos)) {
        playlistItems += playlistItem(ref, title)
    }
    document.getElementById('player').innerHTML = placeholder(videos)
    document.getElementById('video-list').innerHTML = playlistItems
    playButtonRestyleFillHoverListners()
}
