const { Call, ResponseSchema } = require('../models/Call')

module.exports = {
    getDemo: async (req, res) => {
        try {
            const data = await Call.find({})
            console.log('Getting demo')
            res.render('demo.ejs', { info: data })
        } catch (err) {
            console.log(err)
        }
    },
    // notLoggedIn: (req, res) => {
    //     console.log('Please login to access profiles page. Redirecting...')
    //     res.redirect('/')
    // },
    createCall: async (req, res) => {
        try {
            await Call.create({
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
            })
            console.log('A call has been created')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
        }
    },
    displaySelectedCall: async (req, res) => {
        try {
            const data = await Call.find({})
            console.log('Displaying selected call')
            res.json(data)
        } catch (err) {
            console.log(err)
        }
    },
    saveSelectedCall: async (req, res) => {
        try {

            let callUpdate = await Call.findById(req.body.id)

            console.log('req.body', req.body)
            console.log('callUpdate', callUpdate)

            callUpdate.business = req.body.business
            callUpdate.address = req.body.address
            callUpdate.city = req.body.city
            callUpdate.type = req.body.type
            callUpdate.first = req.body.first
            callUpdate.last = req.body.last
            callUpdate.phone = req.body.phone

            if (req.body.newNote) {
                callUpdate.callNotes.push(`${new Date().toLocaleTimeString('en-US', { hour12: false })}: ${req.body.newNote}`)
            }

            let responseCount = (Object.keys(req.body).filter(e => e.match(/apparatus(\d+)/)).length)
            const responseOutput = []
            for (let i = 1; i <= responseCount; i++) {
                const responseObject = {}
                if (callUpdate.response[i]?.apparatus || req.body['apparatus' + i]) {
                    responseObject.apparatus = callUpdate.response[i]?.apparatus || req.body['apparatus' + i]
                }
                else responseObject.apparatus = null
                if (callUpdate.response[i]?.tone || req.body['tone' + i]) {
                    responseObject.tone = callUpdate.response[i]?.tone || req.body['tone' + i]
                }
                else responseObject.tone = null
                if (callUpdate.response[i]?.enroute || req.body['enroute' + i]) {
                    responseObject.enroute = callUpdate.response[i]?.enroute || req.body['enroute' + i]
                }
                else responseObject.enroute = null
                if (callUpdate.response[i]?.arrival || req.body['arrival' + i]) {
                    responseObject.arrival = callUpdate.response[i]?.arrival || req.body['arrival' + i]
                }
                else responseObject.arrival = null
                if (callUpdate.response[i]?.departure || req.body['departure' + i]) {
                    responseObject.departure = callUpdate.response[i]?.departure || req.body['departure' + i]
                }
                else responseObject.departure = null
                if (callUpdate.response[i]?.quarters || req.body['quarters' + i]) {
                    responseObject.quarters = callUpdate.response[i]?.quarters || req.body['quarters' + i]
                }
                else responseObject.quarters = null

                // responseObject.apparatus = callUpdate.response[i]?.apparatus || req.body['apparatus' + i] || null,
                // responseObject.tone = req.body['tone' + i] || null,
                // responseObject.enroute = req.body['enroute' + i] || null,
                // responseObject.arrival = req.body['arrival' + i]|| null,
                // responseObject.departure = req.body['departure' + i] || null,
                // responseObject.quarters = req.body['quarters' + i] || null,

                responseOutput.push(new ResponseSchema({ ...responseObject }))
            }

            callUpdate.response = responseOutput


            // const myApparatusArray = [1] // Everything is already parsed from the req.body - Make a funciton for that
            // let apparatusCounter = 1
            // const myApparatusOutput = []
            // myApparatusArray.forEach(elem => {
            //     myApparatusOutput.push(new ApparatusSchema({
            //         apparatus: req.body['apparatus' + apparatusCounter],
            //         tone: req.body['tone' + apparatusCounter],
            //         enroute: req.body['enroute' + apparatusCounter],
            //         arrival: req.body['arrival' + apparatusCounter],
            //         departure: req.body['departure' + apparatusCounter],
            //         quarters: req.body['quarters' + apparatusCounter],
            //     }))
            //     apparatusCounter += 1
            // })





            console.log('callUpdateUPDATED', callUpdate)
            let savedCall = await callUpdate.save()
            console.log('Saved selected call')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
            // res.status(404).json(`Deck id not found: ${req.body.id}`)
            // console.log(`❌ Deck id not found: ${req.body.id}`)
        }
    },
    deleteSelectedCall: async (req, res) => {
        try {
            await Call.remove({ _id: req.body.id });
            console.log('Deleted selected call')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
        }
    },
}



// saveSelectedCall: async (req, res) => {
//     try {

//         await Call.updateOne(
//             { _id: req.body.id },
//             {
//                 $set: {
//                     business: req.body.business,
//                     address: req.body.address,
//                     city: req.body.city,
//                     type: req.body.type,
//                     first: req.body.first,
//                     last: req.body.last,
//                     phone: req.body.phone,
//                 },
//             }
//         )
//         if (req.body.newNote) { // Seperate update for array, or else it will push empty timestamp
//             await Call.updateOne(
//                 { _id: req.body.id },
//                 {
//                     $push: {
//                         callNotes: (`${new Date().toLocaleTimeString('en-US', { hour12: false })}: ${req.body.newNote}`),
//                     }
//                 }
//             )
//         }

//         // pull info to add to it, then resubmit?
//         // const data = await Call.find({apparatus})
//         // console.log(data)

//         let responseDepartmentTypes = ['apparatus', 'tone', 'enroute', 'arrival', 'departure', 'quarters']
//         let responseDepartment = {}
//         debugger
//         for (let property in req.body) {
//             console.log(property)
//             if (responseDepartmentTypes.map(elem => property.includes(elem)).includes(true) && property.length > 0) {
//                 responseDepartment[property] = req.body[property]
//             }
//         }

//         console.log('body', req.body)
//         console.log('responseDepartment', responseDepartment)


//         if (true) { // Seperate update for apparatus
//             await Call.updateOne(
//                 { _id: req.body.id },
//                 {
//                     $addToSet: {
//                         apparatus: responseDepartment
//                     }
//                 }
//             )
//         }
//         console.log('Saved selected call')
//         res.redirect('/demo')
//     } catch (err) {
//         console.log(err)
//     }
// },