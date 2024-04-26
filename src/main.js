import './index.scss'
import './js/dynamic_adapt'

//MARK: bodyLock
export let bodyLockHold = false
export const bodyLockToggle = (delay = 5) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay)
	} else {
		bodyLock(delay)
	}
}

export const bodyLock = (delay) => {
	if (bodyLockHold) return

	let body = document.querySelector("body")
	body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
	document.documentElement.classList.add("lock")

	bodyLockHold = true
	setTimeout(function () {
		bodyLockHold = false
	}, delay);
}

export const bodyUnlock = (delay) => {
	if (bodyLockHold) return

	let body = document.querySelector("body")
	setTimeout(() => {
		body.style.paddingRight = '0px'
		document.documentElement.classList.remove("lock")
	}, delay)
	bodyLockHold = true
	setTimeout(function () {
		bodyLockHold = false
	}, delay)
}

//mark: menu
const menu = ({ buttonClass, openClassForToggle }) => {

	const buttonIsMissing = document.querySelector(buttonClass) ? false : true
	if (buttonIsMissing) throw 'the buttonClass is missing'

	document.addEventListener('click', (e) => {
		if (bodyLockHold) return

		const isClickOnButton = e.target.closest(buttonClass)
		if (isClickOnButton) {

			bodyLockToggle()
			document.documentElement.classList.toggle(openClassForToggle)

		}
	})

	return {
		openMenu() {
			bodyLock()
			document.documentElement.classList.add(openClassForToggle)
		},
		closeMenu() {
			bodyUnlock()
			document.documentElement.classList.remove(openClassForToggle)
		}
	}
}

const menuInit = menu({ buttonClass: ".icon-menu", openClassForToggle: 'menu-open' })