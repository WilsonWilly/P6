/**
 * Delete all children from element in param
 * @param {HTMLElement} element All children will be deleted from this parent
 */
const empty = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

/**
 * Remove all classes for each element inside querySelectorAll in param
 * and set elementToActivate to a new class in param
 *
 * @param {String} querySelectorAll
 * @param {HTMLElement} elementToActivate
 * @param {String} newClass
 */
const removeAndSetNewClass = (querySelectorAll, elementToActivate, newClass) => {
  document.querySelectorAll(querySelectorAll).forEach(item => item.setAttribute('class', ''))
  elementToActivate.setAttribute('class', newClass)
}

const divGallery = document.getElementById('gallery')
const divCategories = document.getElementById('categories')
const aLogin = document.getElementById('login')

aLogin.addEventListener('click', () => {
  localStorage.removeItem('token')
})

const API_URL = 'http://localhost:5678/api'

const getWorks = async () => fetch(`${API_URL}/works`, { method: 'get' }).then(response => response.json())

const displayCategories = data => {
  // Get unique categories as per https://stackoverflow.com/questions/39997067/es6-unique-array-of-objects-with-set
  const categories = [...new Set(data.map(item => JSON.stringify(item.category)))].map(item => JSON.parse(item))
  console.log(categories)
  // Create each category element (first create 'Tous' element)
  categories.unshift({ name: 'Tous' })
  categories.forEach((item, index) => {
    const span = document.createElement('span')
    divCategories.appendChild(span)
    if (index === 0) {
      span.setAttribute('class', 'active')
    }
    span.innerHTML = item.name
    // On click on category display only projects matching with category
    span.addEventListener('click', () => {
      displayProjects(data, item.id)
      removeAndSetNewClass('.categories span', span, 'active')
    })
  })
}

const displayProjects = (data, categoryId) => {
  empty(divGallery)
  // if categoryId in params then filter by categoryId otherwise get all data
  const dataFiltered = categoryId ? data.filter(item => item.categoryId === categoryId) : data
  // loop on each project
  dataFiltered.forEach(item => {
    // create figure and append to divGallery
    const figure = document.createElement('figure')
    divGallery.appendChild(figure)
    // create img and append to figure
    const img = document.createElement('img')
    img.setAttribute('src', item.imageUrl)
    img.setAttribute('alt', item.title)
    img.setAttribute('crossorigin', 'anonymous')
    figure.appendChild(img)
    // create figCaption text and append to figure
    const figCaption = document.createElement('figCaption')
    figCaption.innerHTML = item.title
    figure.appendChild(figCaption)
  })
}

/**
 * init the page
 */
const init = async () => {
  const projects = await getWorks()

  displayProjects(projects)
  displayCategories(projects)

  console.log('token:', localStorage.token)
  if (localStorage.token) {
    aLogin.innerHTML = 'logout'
  }
}

init()
