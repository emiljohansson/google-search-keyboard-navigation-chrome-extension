import browserEnv from 'browser-env'
browserEnv(['window', 'document', 'navigator'])

const createLink = () => {
  return `<h3 class="r">
  <a href="example.com">Example</a>
</h3>`
}

const page = document.createElement('div')
page.innerHTML = `
<input type="text" />
${createLink()}
${createLink()}
${createLink()}
${createLink()}
${createLink()}
`

document.body.appendChild(page)
