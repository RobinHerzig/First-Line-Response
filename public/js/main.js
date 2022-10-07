// Display selected call after page load

window.addEventListener('load', displaySelectedCall)

// Display selected call from active call list

const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displaySelectedCall))

async function displaySelectedCall() {
    const id = this.value
    if (id) {
        sessionStorage.setItem('id', id) // Set this id to sessionStorage, so the selected call can be displayed on page load
    }
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
                        console.log(info[i]?.response[idNumber - 1]?.[idName] || '')
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
                activeCallArray[i].style.background = 'grey'
            }
            else {
                activeCallArray[i].style.background = 'transparent'
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


    // while (info['apparatus' + (apparatusCount + 1)]) { // Calculate how many rows will be needed by counting non-empty aparatus values
    //     apparatusCount += 1
    // }

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
        cell.value = new Date().toLocaleTimeString('en-US', { hour12: false })
        cell.setAttribute('readonly', '') // Disable cell after add timestamp
    }

    let apparatusRow = document.querySelectorAll('.apparatusRow')
    Array.from(apparatusRow).forEach(elem => checkEmptyCells(elem))
}

/*

// Create a new call

const newCallButton = document.querySelector("#newCall")
newCallButton.addEventListener('click', createCall)

async function createCall() {
    try {
        const res = await fetch('/demo/createCall', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
          })
        const data = await res.json()
        const id = data.insertedId
        if (id) {
            sessionStorage.setItem('id', id) // Sets new id to sessionStorage, so the new call will be active on reload
        }
        window.location.reload(true);
    }
    catch(err) {
        console.log(err)
    }
}

// Save selected call

const saveCallButton = document.querySelector('#saveCallButton')
saveCallButton.addEventListener('click', saveSelectedCall)

async function saveSelectedCall() {
    try {
        const callInfoDataObject = {}
        const callInfoData = document.querySelectorAll('.callInfoData')
        Array.from(callInfoData).forEach(elem => {
            if (elem.id !== 'callNotes') {
                callInfoDataObject[elem.id] = elem.value // Populates object with properties and values from the active call form
            }
        })
        const res = await fetch('/demo/saveSelectedCall', {
            method: 'put',
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(callInfoDataObject)  
        })
        console.log('trying to save client side')
        const data = await res.json()
    }
    catch(err) {
        console.log(err)
    }
}

// Delete selected call

const deleteCallButton = document.querySelector('#deleteCallButton')
deleteCallButton.addEventListener('click', deleteSelectedCall)

async function deleteSelectedCall() {
    const id = document.querySelector('#id').value
    try {
        const response = await fetch('/demo/deleteSelectedCall', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': id,
            })
          })
        const data = await response.json()
        window.location.reload(true);
    }
    catch(err) {
        console.log(err)
    }
}

*/