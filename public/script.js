const video = document.getElementById('video')
const userId = document.getElementById('userId')
const codeDetector = new BarcodeDetector({ formats: ['code_39'] })
const audio = new Audio('success.mp3')

const tempIds = ['000000001', '000000002', '000000003']
const idLimit = 9
let id = ''

function setToId() {
    userId.textContent = id + '-'.repeat(idLimit - id.length)
    
    if (tempIds.includes(id)) {
        tempIds.splice(tempIds.indexOf(id), 1)

        userId.style.color = 'green'
        audio.play()
        setTimeout(() => { userId.style.color = 'black' }, 1_000)
    }
}

document.addEventListener('keydown', event => {
    if ((parseInt(event.key) && id.length < idLimit) || event.key == '0') {
        id = `${id}${event.key}`
        
    } else if (event.key == 'Backspace') {
        id = id.slice(0, -1)
    
    } else {
        return
    }

    id = id.slice(0, idLimit)
    setToId()
})

navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } }).then(stream => {
    video.srcObject = stream
})

setInterval(() => {
    codeDetector.detect(video).then(codes => {
        if (codes.length) {
            id = codes[0].rawValue
            setToId()
        }
    })
}, 500)