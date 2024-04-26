import './index.scss'
import './js/dynamic_adapt'

//MARK: bodylock
export let bodyLockHold = false
export const bodylocktoggle = (delay = 5) => {
	if (document.documentelement.classlist.contains('lock')) {
		bodyunlock(delay)
	} else {
		bodylock(delay)
	}
}

export const bodylock = (delay) => {
	if (bodyLockHold) return

	let body = document.queryselector("body")
	body.style.paddingright = window.innerwidth - document.queryselector('.wrapper').offsetwidth + 'px'
	document.documentelement.classlist.add("lock")

	bodyLockHold = true
	settimeout(function () {
		bodyLockHold = false
	}, delay);
}

export const bodyunlock = (delay) => {
	if (bodyLockHold) return

	let body = document.queryselector("body")
	settimeout(() => {
		body.style.paddingright = '0px'
		document.documentelement.classlist.remove("lock")
	}, delay)
	bodyLockHold = true
	settimeout(function () {
		bodyLockHold = false
	}, delay)
}

//MARK: menu
const menu = ({ buttonclass, openclassfortoggle }) => {

	const buttonismissing = document.queryselector(buttonclass) ? false : true
	if (buttonismissing) throw 'the buttonclass is missing'

	document.addeventlistener('click', (e) => {
		if (bodyLockHold) return

		const isclickonbutton = e.target.closest(buttonclass)
		if (isclickonbutton) {

			bodylocktoggle()
			document.documentelement.classlist.toggle(openclassfortoggle)

		}
	})

	return {
		openmenu() {
			bodylock()
			document.documentelement.classlist.add(openclassfortoggle)
		},
		closemenu() {
			bodyunlock()
			document.documentelement.classlist.remove(openclassfortoggle)
		}
	}
}

const menuinit = menu({ buttonclass: ".icon-menu", openclassfortoggle: 'menu-open' })