export function insertAfter(newNode, currentNode){
  if (currentNode.nextSibling) {
    currentNode.parentNode.insertBefore(newNode, currentNode.nextSibling);
  } else {
    currentNode.parentNode.appendChild(newNode);
  }
}