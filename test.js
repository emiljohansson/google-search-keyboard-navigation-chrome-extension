import test from 'ava'
import * as main from '.'

const searchField = document.querySelector('input')
const titles = Array.prototype.slice.call(document.querySelectorAll('h3.r'))
const links = Array.prototype.slice.call(document.querySelectorAll('h3.r a'))

function pressKey (code, type) {
  const KeyboardEventInit = {
    bubbles: true,
    cancelable: true,
    shiftKey: false
  }
  KeyboardEventInit['key'] = code
  const e = new window.KeyboardEvent('keydown', KeyboardEventInit)
  document.dispatchEvent(e)
}

const validateOnly = (t, testIndex) => {
  titles.forEach((el, index) => {
    const actual = titles[index].classList.contains('focused-title')
    const expected = testIndex === index
    t.is(actual, expected)
  })
  links.forEach((el, index) => {
    const actual = links[index].classList.contains('focused-link')
    const expected = testIndex === index
    t.is(actual, expected)
  })
}

test('down selects first link', t => {
  pressKey('ArrowDown', 'keydown')
  validateOnly(t, 0)
})

test('down again selects second link', t => {
  pressKey('ArrowDown', 'keydown')
  validateOnly(t, 1)
})

test('up goes back to first link', t => {
  pressKey('ArrowUp', 'keydown')
  validateOnly(t, 0)
})

test('up can\'t pass first link', t => {
  pressKey('ArrowUp', 'keydown')
  pressKey('ArrowUp', 'keydown')
  validateOnly(t, 0)
})

test('down can\'t pass last link', t => {
  let index = 10
  while (--index) {
    pressKey('ArrowDown', 'keydown')
  }
  validateOnly(t, links.length - 1)
})

test('focus highlighted link', t => {
  t.is(document.activeElement, links[links.length - 1])
})

test('typing should focus search field', t => {
  pressKey('d', 'keydown')
  t.is(document.activeElement, searchField)
})

test('should not focus field if not [a-z9-0]', t => {
  pressKey('ArrowDown', 'keydown')
  pressKey('Tab', 'keydown')
  t.not(document.activeElement, searchField)
})

test('typing should start new word at the end', t => {
  searchField.value = 'Hi'
  pressKey('ArrowDown', 'keydown')
  pressKey('d', 'keydown')
  searchField.value += 'd'
  t.is(searchField.value, 'Hi d')
})

test('should trim extra spaces', t => {
  searchField.value = 'the    quick brown   fox jumps over the lazy    dog      '
  pressKey('ArrowDown', 'keydown')
  pressKey('d', 'keydown')
  searchField.value += 'd'
  t.is(searchField.value, 'the quick brown fox jumps over the lazy dog d')
})

test('should not try to focus the field again', t => {
  searchField.value = 'the    quick brown   fox jumps over the lazy    dog      '
  pressKey('ArrowDown', 'keydown')
  pressKey('d', 'keydown')
  pressKey('d', 'keydown')
  searchField.value += 'dd'
  t.is(searchField.value, 'the quick brown fox jumps over the lazy dog dd')
})

test('should not focus field', t => {
  const expected = 'the    quick brown   fox jumps over the lazy    dog      '
  searchField.value = expected
  pressKey('ArrowDown', 'keydown')
  pressKey('ArrowRight', 'keydown')
  t.is(searchField.value, expected)
})

test('the backspace key should focus the field and delete last character', t => {
  searchField.value = 'the quick brown fox jumps over the lazy dog'
  pressKey('ArrowDown', 'keydown')
  pressKey('Backspace', 'keydown')
  searchField.value = searchField.value.slice(0, -1)
  t.is(searchField.value, 'the quick brown fox jumps over the lazy do')
})
