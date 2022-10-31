// Display selected call after page load

window.addEventListener('load', displaySelectedCall)

// Display selected call from active call list

const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displaySelectedCall))

async function displaySelectedCall() {
    const id = this.value
    if (id) sessionStorage.setItem('id', id) // Set this id to sessionStorage, so the selected call can be displayed on page load
    else if (sessionStorage.getItem('id') === null) sessionStorage.setItem('id', Array.from(activeCalls)[activeCalls.length - 1].value) // If no active call id exists in storage, automatically set id of the newest call. Necessary for newly added call to automatically show active or prevent blank form when deleting call
    const idSessionStorage = sessionStorage.getItem('id')
    try {
        const res = await fetch('/demo/displaySelectedCall', {
            method: 'get',
        })
        const info = await res.json()
        highlightSelectedCall(info) // Highlight selected call in call list
        for (let i = 0; i < info.length; i++) {
            if (info[i]._id == idSessionStorage) {
                addApparatusRow(info[i]) // Add additional apparatus rows, if necessary 
                const callInfoData = document.querySelectorAll('.callInfoData')
                Array.from(callInfoData).forEach(elem => { // Iterate through the form to add values from the database return
                    if (elem.id === "id") {
                        elem.value = info[i]._id // The database's "_id" does not match elem's "id", so the id value is specified manually
                        removeReadOnlyAttribute() // Remove readonly attribute from inputs with callInfoDataEdit class when call is displayed
                        removeDisabledAttribute() // Remove disabled attribute from save button when call is displayed
                    }
                    else if (elem.id === 'callNotes') {
                        const callNotes = document.querySelector('#callNotes')
                        Array.from(callNotes.childNodes).forEach(elem => elem.remove()) // Delete call notes from previous displayed call
                        if (info[i].callNotes) {
                            callNotesArray = Object.values(info[i].callNotes)
                            for (let i = 0; i < callNotesArray.length; i++) {
                                let li = document.createElement('li')
                                const node = document.createTextNode(callNotesArray[i]) // Parse through callNotesObject to create and display a list of call notes
                                li.appendChild(node)
                                callNotes.appendChild(li)
                            }
                        }
                    }
                    else if (elem.className.includes('response')) {
                        let idNumber = elem.id.split('').filter(elem => (Number(elem) >= 0 || Number(elem) <= 9)).join('') // Split element ID name and number to use for parsing database return
                        let idName = elem.id.split('').filter(elem => (elem.toLowerCase() >= 'a' && elem.toLowerCase() <= 'z')).join('')
                        elem.value = info[i].response[idNumber - 1]?.[idName] || ''
                    }
                    else if (info[i].hasOwnProperty(elem.id)) {
                        elem.value = info[i][elem.id] // If the database has a key that matches an element id, the value of the key is used as the value of the element
                    }
                    else if (Array.isArray(info[i])) {
                        elem.value = info[i][elem.id] // If the database has a key that matches an element id, the value of the key is used as the value of the element
                    }
                    else {
                        elem.value = '' // If the database does not have a key that matches an element id, an empty string is used as the value of the element
                    }
                })
            }
        }
        trackApparatusTimes() // Add event listeners to each cell to create timestamp buttons    
    }
    catch (err) {
        console.log(err)
    }
}

// Highlight selected call in call list

const highlightSelectedCall = async function (info) {
    const idSessionStorage = sessionStorage.getItem('id')
    const activeCallArray = Array.from(activeCalls)

    try {
        for (let i = 0; i < info.length; i++) {
            if (info[i]._id == idSessionStorage) {
                activeCallArray[i].classList.add("bg-gray")
            }
            else {
                activeCallArray[i].classList.remove("bg-gray")
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

// Add additional apparatus rows, if necessary

const addApparatusRow = async function (info) {
    const loopID = function (clone) {  // Loop through childNodes to run function on correct element ids
        for (let i = 1; i < clone.childNodes.length; i += 2) {
            let id = clone.childNodes[i].childNodes[0].id
            clone.childNodes[i].childNodes[0].id = incrementId(id)
            clone.childNodes[i].childNodes[0].name = incrementId(id)
        }
    }
    const incrementId = function (id) { // Increment id numbers
        id = [...id]
        let idNumbers = id.filter(elem => (Number(elem) >= 0 || Number(elem) <= 9)) // Isolating numbers from id to increment properly
        idNumbers = idNumbers.join('')
        idNumbers = Number(idNumbers)
        idNumbers += 1
        const idLetters = id.filter(elem => !(Number(elem) >= 0 || Number(elem) <= 9)) // Isolating letters from id to rejoin as string
        return id = idLetters.concat(idNumbers).join('')
    }

    let apparatusRow = document.querySelectorAll('.apparatusRow')
    let apparatusRowArray = Array.from(apparatusRow) // Calculate how many rows already exist in the DOM
    let apparatusCount = 0

    while (info.response[apparatusCount]?.apparatus) { // Calculate how many rows will be needed by counting non-empty aparatus values
        apparatusCount += 1
    }

    try {
        if (apparatusRowArray.length === apparatusCount + 1) return // If there are already the correct number of rows, return without making changes
        else {
            apparatusRowArray.reverse().forEach((elem, index) => { // Else, remove all row nodes except the first
                if (index > 0) {
                    elem.remove()
                }
            })
            apparatusRow = document.querySelectorAll('.apparatusRow')
            apparatusRowArray = Array.from(apparatusRow) // Refresh calculation of how many rows exist in the DOM
            for (let i = 1; i < apparatusCount + 1; i++) { // Clone new row nodes and place them in DOM
                const node = apparatusRowArray.at(-1)
                const clone = node.cloneNode(true)
                loopID(clone)
                node.before(clone)
                apparatusRow = document.querySelectorAll('.apparatusRow')
                apparatusRowArray = Array.from(apparatusRow).reverse()
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

// Remove readonly attribute from inputs with callInfoDataEdit class when call is displayed

function removeReadOnlyAttribute() {
    const callInfoDataEdit = Array.from(document.querySelectorAll('.callInfoDataEdit'))
    callInfoDataEdit.forEach(elem => elem.removeAttribute('readonly'))
}

// Remove disabled attribute from save button when call is displayed

function removeDisabledAttribute() {
    const saveCallButton = document.querySelector('#saveCallButton')
    const deleteCallButton = document.querySelector('#deleteCallButton')
    saveCallButton.removeAttribute('disabled')
    deleteCallButton.removeAttribute('disabled')
}

// Input time in apparatus cells

const trackApparatusTimes = function () {
    const checkEmptyCells = function (elem) {
        if (elem.childNodes[1].childNodes[0].value) {
            elem.childNodes[1].childNodes[0].setAttribute('readonly', '') // For each row, if there is an apparatus saved, disable the apparatus cell
            let cellCount = 3
            while (elem.childNodes[cellCount]?.childNodes[0]) {
                let cell = elem.childNodes[cellCount].childNodes[0]
                if (!cell.value) cell.removeAttribute('readonly') // For each timestamp cell in this row, enable cell if it does not contain a time
                else cell.setAttribute('readonly', '') // For each timestamp cell in this row, disable cell if it does contain a time
                cell.addEventListener('click', function () { timeStamp(cell); }) // For each cell in this row, apply timestamp function
                cellCount += 2
            }
            let disableLeft = false
            while (cellCount >= 3) {
                cellCount -= 2
                let cell = elem.childNodes[cellCount].childNodes[0]
                if (cell.value) disableLeft = true
                if (disableLeft) cell.setAttribute('readonly', '') // Reiterate backwards, and when a cell with time is found, all timestamp cells to the left are disabled
            }
        }
        else {
            elem.childNodes[1].childNodes[0].removeAttribute('readonly') // For each row, if there is not an apparatus saved, enable the apparatus cell
            let cellCount = 3
            while (elem.childNodes[cellCount]?.childNodes[0]) {
                let cell = elem.childNodes[cellCount].childNodes[0]
                cell.setAttribute('readonly', '') // For each timestamp cell in this row, disable cell
                cellCount += 2
            }
        }
    }
    const timeStamp = function (cell) {
        if (!cell.hasAttribute('readonly'))
            cell.value = new Date().toLocaleTimeString('en-US', { hour12: false })
        cell.setAttribute('readonly', '') // Disable cell after add timestamp
    }

    let apparatusRow = document.querySelectorAll('.apparatusRow')
    Array.from(apparatusRow).forEach(elem => checkEmptyCells(elem))
}

// Create a new call

const newCallButton = document.querySelector("#newCall")
const deleteCallButton = document.querySelector("#deleteCallButton")
newCallButton.addEventListener('click', removeSessionStorage)
deleteCallButton.addEventListener('click', removeSessionStorage)

function removeSessionStorage() {
    if (id) {
        sessionStorage.removeItem('id') // Sets new id to sessionStorage, so the new call will be active on reload
    }
}