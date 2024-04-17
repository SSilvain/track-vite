import './index.scss'

//MARK: bodyLock
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay)
	} else {
		bodyLock(delay)
	}
}

export let bodyLock = (delay = 500) => {
	let body = document.querySelector("body")
	if (bodyLockStatus) {
		//For lp
		// let lock_padding = document.querySelectorAll("[data-lp]")
		// for (let index = 0; index < lock_padding.length; index++) {
		// 	const el = lock_padding[index]
		// 	el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		// }
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		document.documentElement.classList.add("lock")

		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay);
	}
}

export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body")
	if (bodyLockStatus) {
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
		bodyLockStatus = false
		setTimeout(function () {
			bodyLockStatus = true
		}, delay)
	}
}

//MARK: menu
const menu = (params = { buttonClass: '.icon-menu', menuOpenClass: 'menu-open' }) => {
	if (document.querySelector(params.buttonClass)) {
		document.addEventListener('click', function (e) {
			console.log(e.target)
			if (bodyLockStatus && e.target.closest(params.buttonClass)) {
				bodyLockToggle()
				document.documentElement.classList.toggle('menu-open')
			}
		})
	}
	return {
		openMenu() {
			bodyLock()
			document.documentElement.classList.add(params.menuOpenClass)
		},
		closeMenu() {
			bodyUnlock()
			document.documentElement.classList.remove(params.menuOpenClass)
		}
	}
}

const menuInit = menu({ buttonClass: '.icon-menu', menuOpenClass: 'menu-open' })