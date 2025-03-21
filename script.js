let array = []
let delay
const normalDelay = 300
const fastDelay = 10
let comparisonCount = 0

function generateArray() {
  const container = document.getElementById("array-container")
  container.innerHTML = ""
  array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1)

  array.forEach((value) => {
    const bar = document.createElement("div")
    bar.style.height = `${value * 3}px`
    bar.classList.add("bar")
    container.appendChild(bar)
  })

  delay = normalDelay
  comparisonCount = 0
  updateComparisonCount()
}

function speedUp() {
  delay = fastDelay
}

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function updateComparisonCount() {
  const counter = document.getElementById("comparison-counter")
  if (counter) {
    counter.innerText = `Comparações: ${comparisonCount}`
  }
}

async function bubbleSort() {
  let bars = document.querySelectorAll(".bar")
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      comparisonCount++
      updateComparisonCount()

      bars[j].classList.add("bubble")
      bars[j + 1].classList.add("bubble")

      await sleep(delay)

      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        updateBars()
        await sleep(delay)
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

    await sleep(delay)

    while (j >= 0 && array[j] > key) {
      comparisonCount++
      updateComparisonCount()

      array[j + 1] = array[j]
      j--
      updateBars()
      await sleep(delay)
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
    comparisonCount++
    updateComparisonCount()

    bars[i].classList.add("merge")
    if (leftArr[j] <= rightArr[k]) {
      array[i] = leftArr[j++]
    } else {
      array[i] = rightArr[k++]
    }
    updateBars()
    await sleep(delay)
    bars[i].classList.remove("merge")
    i++
  }

  while (j < leftArr.length) {
    bars[i].classList.add("merge")
    array[i] = leftArr[j++]
    updateBars()
    await sleep(delay)
    bars[i].classList.remove("merge")
    i++
  }

  while (k < rightArr.length) {
    bars[i].classList.add("merge")
    array[i] = rightArr[k++]
    updateBars()
    await sleep(delay)
    bars[i].classList.remove("merge")
    i++
  }
}

function updateBars() {
  requestAnimationFrame(() => {
    let bars = document.querySelectorAll(".bar")
    for (let i = 0; i < array.length; i++) {
      bars[i].style.height = `${array[i] * 3}px`
    }
  })
}

generateArray()
