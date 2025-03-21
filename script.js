let array = []
let delay
const normalDelay = 300
const fastDelay = 10
let comparisons = 0

function generateArray() {
  const container = document.getElementById("array-container")
  container.innerHTML = ""
  array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1)

  array.forEach((value) => {
    const bar = document.createElement("div")
    bar.style.height = `${value * 3}px`
    bar.classList.add("bar")

    const label = document.createElement("span")
    label.textContent = value

    bar.appendChild(label)
    container.appendChild(bar)
  })

  delay = normalDelay
  comparisons = 0
  updateComparisonCounter()
}

function speedUp() {
  delay = fastDelay
}

function updateComparisonCounter() {
  document.getElementById(
    "comparison-counter"
  ).textContent = `Comparações: ${comparisons}`
}

async function bubbleSort() {
  let bars = document.querySelectorAll(".bar")
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      comparisons++
      updateComparisonCounter()

      bars[j].classList.add("bubble")
      bars[j + 1].classList.add("bubble")

      await new Promise((resolve) => setTimeout(resolve, delay))

      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        updateBars()
        await new Promise((resolve) => setTimeout(resolve, delay))
      }

      bars[j].classList.remove("bubble")
      bars[j + 1].classList.remove("bubble")
    }
    bars[array.length - i - 1].classList.add("sorted")
  }

  bars[0].classList.add("sorted")
}

async function insertionSort() {
  let bars = document.querySelectorAll(".bar")
  for (let i = 1; i < array.length; i++) {
    let key = array[i]
    let j = i - 1
    bars[i].classList.add("insertion")

    await new Promise((resolve) => setTimeout(resolve, delay))

    while (j >= 0 && array[j] > key) {
      comparisons++
      updateComparisonCounter()

      array[j + 1] = array[j]
      j--
      updateBars()
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    array[j + 1] = key
    updateBars()
    bars[i].classList.remove("insertion")
  }

  bars.forEach((bar) => bar.classList.add("sorted"))
}

async function mergeSortWrapper() {
  await mergeSort(0, array.length - 1)
  document
    .querySelectorAll(".bar")
    .forEach((bar) => bar.classList.add("sorted"))
}

async function mergeSort(left, right) {
  if (left >= right) return
  let mid = Math.floor((left + right) / 2)
  await mergeSort(left, mid)
  await mergeSort(mid + 1, right)
  await merge(left, mid, right)
}

async function merge(left, mid, right) {
  let bars = document.querySelectorAll(".bar")
  let leftArr = array.slice(left, mid + 1)
  let rightArr = array.slice(mid + 1, right + 1)
  let i = left,
    j = 0,
    k = 0

  while (j < leftArr.length && k < rightArr.length) {
    comparisons++
    updateComparisonCounter()

    bars[i].classList.add("merge")
    if (leftArr[j] <= rightArr[k]) {
      array[i] = leftArr[j++]
    } else {
      array[i] = rightArr[k++]
    }
    updateBars()
    await new Promise((resolve) => setTimeout(resolve, delay))
    bars[i].classList.remove("merge")
    i++
  }

  while (j < leftArr.length) {
    bars[i].classList.add("merge")
    array[i] = leftArr[j++]
    updateBars()
    await new Promise((resolve) => setTimeout(resolve, delay))
    bars[i].classList.remove("merge")
    i++
  }

  while (k < rightArr.length) {
    bars[i].classList.add("merge")
    array[i] = rightArr[k++]
    updateBars()
    await new Promise((resolve) => setTimeout(resolve, delay))
    bars[i].classList.remove("merge")
    i++
  }
}

function updateBars() {
  requestAnimationFrame(() => {
    let bars = document.querySelectorAll(".bar")
    for (let i = 0; i < array.length; i++) {
      bars[i].style.height = `${array[i] * 3}px`
      bars[i].querySelector("span").textContent = array[i]
    }
  })
}

generateArray()