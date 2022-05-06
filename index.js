// Import stylesheets
import './style.css';

const containers = document.querySelectorAll('.box')
const articles = document.querySelectorAll('.draggable')

articles.forEach(article =>{
  article.addEventListener('dragstart',()=>{
    article.classList.add('is-dragged')
  })
  article.addEventListener('dragend',()=>{
    article.classList.remove('is-dragged')
  })
})
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.is-dragged')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})