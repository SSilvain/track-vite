// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

class DynamicAdapt {
	constructor(type) {
		this.type = type
	}
	init() {
		// масив об'єктів
		this.objects = []
		this.daClassname = '_dynamic_adapt_'
		// масив DOM-елементів
		this.nodes = [...document.querySelectorAll('[data-da]')]

		// наповнення оbjects об'єктами
		this.nodes.forEach((node) => {
			const data = node.dataset.da.trim()
			const dataArray = data.split(',')
			const object = {}
			object.element = node
			object.parent = node.parentNode
			object.destination = document.querySelector(`${dataArray[0].trim()}`)
			object.breakpoint = dataArray[1] ? dataArray[1].trim() : '767'
			object.place = dataArray[2] ? dataArray[2].trim() : 'last'
			object.index = this.indexInParent(object.parent, object.element)
			this.objects.push(object)
		})

		this.arraySort(this.objects)

		// масив унікальних медіа-запитів
		this.mediaQueries = this.objects
			.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
			.filter((item, index, self) => self.indexOf(item) === index)

		// навішування слухача на медіа-запит
		// та виклик оброблювача при першому запуску
		this.mediaQueries.forEach((media) => {
			const mediaSplit = media.split(',')
			const matchMedia = window.matchMedia(mediaSplit[0])
			const mediaBreakpoint = mediaSplit[1]

			// масив об'єктів з відповідним брейкпоінтом
			const objectsFilter = this.objects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint)
			matchMedia.addEventListener('change', () => {
				this.mediaHandler(matchMedia, objectsFilter)
			})
			this.mediaHandler(matchMedia, objectsFilter)
		})
	}
	// Основна функція
	mediaHandler(matchMedia, objects) {
		if (matchMedia.matches) {
			objects.forEach((object) => {
				// object.index = this.indexInParent(object.parent, object.element);
				this.moveTo(object.place, object.element, object.destination)
			})
		} else {
			objects.forEach(({ parent, element, index }) => {
				if (element.classList.contains(this.daClassname)) {
					this.moveBack(parent, element, index)
				}
			})
		}
	}
	// Функція переміщення
	moveTo(place, element, destination) {
		element.classList.add(this.daClassname)
		if (place === 'last' || place >= destination.children.length) {
			destination.append(element)
			return
		}
		if (place === 'first') {
			destination.prepend(element)
			return
		}
		destination.children[place].before(element)
	}
	// Функція повернення
	moveBack(parent, element, index) {
		element.classList.remove(this.daClassname)
		if (parent.children[index] !== undefined) {
			parent.children[index].before(element)
		} else {
			parent.append(element)
		}
	}
	// Функція отримання індексу всередині батьківського єлементу
	indexInParent(parent, element) {
		return [...parent.children].indexOf(element)
	}
	// Функція сортування масиву по breakpoint та place
	// за зростанням для this.type = min
	// за спаданням для this.type = max
	arraySort(arr) {
		if (this.type === 'min') {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0
					}
					if (a.place === 'first' || b.place === 'last') {
						return -1
					}
					if (a.place === 'last' || b.place === 'first') {
						return 1
					}
					return 0
				}
				return a.breakpoint - b.breakpoint
			})
		} else {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0
					}
					if (a.place === 'first' || b.place === 'last') {
						return 1
					}
					if (a.place === 'last' || b.place === 'first') {
						return -1
					}
					return 0
				}
				return b.breakpoint - a.breakpoint
			})
			return
		}
	}
}
const da = new DynamicAdapt("max")
da.init()
console.log(da)