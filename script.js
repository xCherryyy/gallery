const catImg = document.querySelectorAll('.gallery img')
const popupShadow = document.querySelector('.popup-shadow')
const popupImg = document.querySelector('.popup img')
const wrapper = document.querySelector('.wrapper')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')

const API_LINK = 'https://api.thecatapi.com/v1/images/search'

let previousImg, nextImg, imgID

const setImg = () => {
	catImg.forEach(img => {
		if (img.getAttribute('src') === '') {
			fetch(API_LINK)
				.then(res => res.json())
				.then(res => {
					img.setAttribute('src', `${res[0].url}`)
				})
		}
	})
}

const showPopup = e => {
	const imgToShow = document.getElementById(`${e.target.id}`)
	imgID = parseInt(e.target.id)
	const imgLink = imgToShow.getAttribute('src')
	popupImg.setAttribute('src', `${imgLink}`)
	wrapper.classList.add('blur-background')
	checkButtons()
}

const closePopup = () => {
	popupShadow.style.display = 'none'
	wrapper.classList.remove('blur-background')
	removeBtnsDisabled()
}

const slideToLeft = () => {
	if (imgID > 0) {
		previousImg = document.getElementById(`${imgID - 1}`).getAttribute('src')
		popupImg.setAttribute('src', previousImg)
		imgID--
	}
	checkButtons()
}

const slideToRight = () => {
	if (imgID < catImg.length - 1) {
		nextImg = document.getElementById(`${imgID + 1}`).getAttribute('src')
		popupImg.setAttribute('src', nextImg)
		imgID++
	}
	checkButtons()
}

const checkButtons = () => {
	if (imgID === 0) {
		leftArrow.classList.remove('arrow-color')
		leftArrow.setAttribute('disabled', '')
	} else if (imgID !== 0 && imgID === catImg.length - 1) {
		rightArrow.classList.remove('arrow-color')
		rightArrow.setAttribute('disabled', '')
	} else {
		removeBtnsDisabled()
	}
}

const removeBtnsDisabled = () => {
	leftArrow.classList.add('arrow-color')
	leftArrow.removeAttribute('disabled')
	rightArrow.classList.add('arrow-color')
	rightArrow.removeAttribute('disabled')
}

const checkLeftKey = e => {
	if (popupShadow.style.display === 'flex') {
		if (e.code === 'ArrowLeft' || e.keyCode === 37) {
			slideToLeft()
		}
	}
}

const checkRightKey = e => {
	if (popupShadow.style.display === 'flex') {
		if (e.code === 'ArrowRight' || e.keyCode === 39) {
			slideToRight()
		}
	}
}

const checkEsc = e => {
	if (popupShadow.style.display === 'flex') {
		if (e.code === 'Escape' || e.keyCode === 27) {
			closePopup()
		}
	}
}

const checkEnter = e => {
	if (popupShadow.style.display !== 'flex') {
		if (e.code === 'Enter' || e.keyCode === 13) {
			popupShadow.style.display = 'flex'
			showPopup(e)
		}
	}
}

catImg.forEach(img => {
	img.addEventListener('click', () => (popupShadow.style.display = 'flex'))
})
catImg.forEach(img => img.addEventListener('click', showPopup))
catImg.forEach(img => img.addEventListener('keydown', checkEnter))
window.addEventListener('click', e => {
	if (e.target === popupShadow) {
		closePopup()
	}
})
leftArrow.addEventListener('click', slideToLeft)
rightArrow.addEventListener('click', slideToRight)
document.addEventListener('keydown', checkRightKey)
document.addEventListener('keydown', checkLeftKey)
document.addEventListener('keydown', checkEsc)
setImg()
