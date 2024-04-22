import './index.scss'

//MARK: bodyLock
export let bodyLockHold = false
export const bodyLockToggle = (delay = 5) => {
	0
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay)
	} else {
		bodyLock(delay)
	}
}

export const bodyLock = (delay) => {
	let body = document.querySelector("body")
	if (!bodyLockHold) {
		//For lp
		// let lock_padding = document.querySelectorAll("[data-lp]")
		// for (let index = 0; index < lock_padding.length; index++) {
		// 	const el = lock_padding[index]
		// 	el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		// }
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		document.documentElement.classList.add("lock")

		bodyLockHold = true
		setTimeout(function () {
			bodyLockHold = false
		}, delay);
	}
}

export const bodyUnlock = (delay) => {
	let body = document.querySelector("body")
	if (!bodyLockHold) {
		// let lock_padding = document.querySelectorAll("[data-lp]")
		setTimeout(() => {
			//For lp
			// for (let index = 0; index < lock_padding.length; index++) {
			// 	const el = lock_padding[index]
			// 	el.style.paddingRight = '0px'
			// }
			body.style.paddingRight = '0px'
			document.documentElement.classList.remove("lock")
		}, delay)
		bodyLockHold = true
		setTimeout(function () {
			bodyLockHold = false
		}, delay)
	}
}

//MARK: menu
const menu =
	({ buttonClass, triggerOpenEnable }) => {

		const isButtonClass = document.querySelector(buttonClass)
		if (isButtonClass) {

			document.addEventListener('click', function (e) {
				if (!bodyLockHold) {

					const isClickOnButton = e.target.closest(buttonClass)
					if (isClickOnButton) {

						bodyLockToggle()
						document.documentElement.classList.toggle(triggerOpenEnable)

					}
				}
			})
		}
		return {
			openMenu() {
				bodyLock()
				document.documentElement.classList.add(triggerOpenEnable)
			},
			closeMenu() {
				bodyUnlock()
				document.documentElement.classList.remove(triggerOpenEnable)
			}
		}
	}

const menuInit = menu({ buttonClass: '.icon-menu', triggerOpenEnable: 'menu-open' })
