import { keyPressed } from 'keyboard-handler'

const focusTitleClass = 'focused-title'
const focusLinkClass = 'focused-link'

const searchField = document.querySelector('input[type="text"]')
const titles = document.querySelectorAll('h3.r')
const links = document.querySelectorAll('h3.r a')
let focusIndex = -1

keyPressed(event => {
  const key = event.key
  const isBackspace = key === 'Backspace'
  if (key === 'ArrowDown') {
    updateFocus(event, focusIndex + 1)
    return
  }
  if (key === 'ArrowUp') {
    updateFocus(event, focusIndex - 1)
    return
  }
  if (!canFocusField(key) && !isBackspace) {
    return
  }
  if (document.activeElement === searchField) {
    return
  }
  searchField.focus()
  if (isBackspace) {
    removeFromSearchFieldValue()
    return
  }
  addToSearchFieldValue()
})

const updateFocus = (event, nextIndex) => {
  removeFocused()
  if (nextIndex < 0) {
    nextIndex = 0
  }
  if (nextIndex >= links.length) {
    nextIndex = links.length - 1
  }
  focusIndex = nextIndex
  titles[focusIndex].classList.add(focusTitleClass)
  links[focusIndex].classList.add(focusLinkClass)
  links[focusIndex].focus()

  event.stopPropagation()
  event.preventDefault()
}

const removeFocused = () => {
  if (focusIndex < 0) {
    return
  }
  titles[focusIndex].classList.remove(focusTitleClass)
  links[focusIndex].classList.remove(focusLinkClass)
}

const canFocusField = key => key.length === 1 && /[a-z0-9]/i.test(key)

const removeFromSearchFieldValue = () => {
  searchField.value = searchField.value
}

const addToSearchFieldValue = () => {
  const space = ' '
  let value = searchField.value.replace(/  +/g, space)
  const length = value.length
  if (value[length - 1] !== space) {
    value += space
  }
  searchField.value = value
}
