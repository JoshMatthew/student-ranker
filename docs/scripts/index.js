const addEntryBtn = document.querySelector("#new-ent-btn")
const compute = document.querySelector("#compute-btn")
const reset = document.querySelector("#reset-btn")
const entry = document.querySelector("#entry")
const inputs = document.querySelector(".inputs")
const table = document.querySelector("#table")
const conclusion = document.querySelector("#conclusion")
const results = document.querySelector("#results")

let isValid = true;

// Event handlers
reset.addEventListener('click', () => {
  while (inputs.firstChild) {
    inputs.removeChild(inputs.firstChild)
  }

  while (table.children[1]) {
    table.removeChild(table.children[1])
  }

  conclusion.innerText = ''
})

addEntryBtn.addEventListener('click', e => {
  let div = document.createElement("div")
  div.classList.add("entry")
  let input1 = document.createElement('input')
  input1.placeholder = "surname, given name M.I"
  input1.id = "name-" + Math.random()
  let input2 = document.createElement('input')
  input2.placeholder = "GPA"
  input2.id = "grade-" + Math.random()

  let delButton = document.createElement('button')
  delButton.innerText = 'X'
  delButton.classList.add("rem-input", "warn")
  delButton.id = Math.random()


  div.append(input1)
  div.append(input2)
  div.append(delButton)
  div.id = Math.random()

  inputs.append(div)

  delButton.addEventListener('click', e => {
    // const parentId = e.currentTarget.parentNode.id
    inputs.removeChild(e.currentTarget.parentNode)
  })
})

compute.addEventListener("click", e => {
  isValid = true
  let tableChildren = [...table.children]
  for (let i = 0; i < tableChildren.length; i++) {
    if (tableChildren[i].id !== "headers") {
      table.removeChild(tableChildren[i])
    }
  }

  const childrenRaw = [...inputs.children]

  isValid = !!childrenRaw.length

  const children = childrenRaw.map(child => {
    const childrenOfChild = [...child.children]
    if (!!childrenOfChild[0].value && !!childrenOfChild[1].value) {
      return {
        name: childrenOfChild[0].value,
        grade: childrenOfChild[1].value,
      }
    } else {
      childrenOfChild.forEach(c => {
        if (!c.value) {
          c.style.borderColor = "red"
        }
      })
      isValid = false
    }
  })

  if (isValid) {
    sortArray(children)

    let allStudentAve = 0
    let sum = 0

    for (let i = 0; i < children.length; i++) {
      console.log(children[i].grade)
      sum += parseInt(children[i].grade)
    }

    allStudentAve = Math.round(100 * (sum / children.length)) / 100

    for (let i = 0; i < children.length; i++) {
      let tr = document.createElement('tr')
      tr.insertCell(-1).innerText = i + 1
      tr.insertCell(-1).innerText = children[i].name
      tr.insertCell(-1).innerText = children[i].grade

      table.appendChild(tr)
    }

    conclusion.innerText = `The overall average of the students is ${allStudentAve || 0}`
  } else {
    if (children.length) {
      alert("Please fill all the fields")
    } else {
      alert("Please add some fields")
    }
  }
})


// functions

const sortArray = students => {
  let len = students.length - 1;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      if (parseInt(students[i].grade) < parseInt(students[i + 1].grade)) {
        let tmp = students[i];
        students[i] = students[i + 1];
        students[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);
  return students;
}