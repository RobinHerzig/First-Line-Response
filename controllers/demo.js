const { Call, ResponseSchema } = require('../models/Call')

module.exports = {
    getDemo: async (req, res) => {
        try {
            const data = await Call.find({ user: req.user }).lean()
            console.log('Getting demo')
            res.render('demo.ejs', { info: data,  user: req.user })
        } catch (err) {
            console.log(err)
            res.status(404).json('404 error: getDemo')
        }
    },
    notLoggedIn: (req, res) => {
        console.log('Please login to access profiles page. Redirecting...')
        res.redirect('/login')
    },
    createCall: async (req, res) => {
        try {
            await Call.create({
                user: req.user,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
            })
            console.log('A call has been created')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
            res.status(404).json('404 error: createCall')
        }
    },
    displaySelectedCall: async (req, res) => {
        try {
            const data = await Call.find({ user: req.user }).lean()
            console.log('Displaying selected call')
            res.json(data)
        } catch (err) {
            console.log(err)
            res.status(404).json('404 error: displaySelectedCall')
        }
    },
    saveSelectedCall: async (req, res) => {
        try {

            let callUpdate = await Call.findById(req.body.id).lean()

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

            let responseCount = (Object.keys(req.body).filter(elem => elem.match(/apparatus(\d+)/)).length)
            const responseOutput = []
            for (let i = 1; i <= responseCount; i++) {
                const responseObject = {}
                if (callUpdate.response[i - 1]?.apparatus || req.body['apparatus' + i]) {
                    responseObject.apparatus = callUpdate.response[i - 1]?.apparatus || req.body['apparatus' + i]
                }
                else responseObject.apparatus = null
                if (callUpdate.response[i - 1]?.tone || req.body['tone' + i]) {
                    responseObject.tone = callUpdate.response[i - 1]?.tone || req.body['tone' + i]
                }
                else responseObject.tone = null
                if (callUpdate.response[i - 1]?.enroute || req.body['enroute' + i]) {
                    responseObject.enroute = callUpdate.response[i - 1]?.enroute || req.body['enroute' + i]
                }
                else responseObject.enroute = null
                if (callUpdate.response[i - 1]?.arrival || req.body['arrival' + i]) {
                    responseObject.arrival = callUpdate.response[i - 1]?.arrival || req.body['arrival' + i]
                }
                else responseObject.arrival = null
                if (callUpdate.response[i - 1]?.departure || req.body['departure' + i]) {
                    responseObject.departure = callUpdate.response[i - 1]?.departure || req.body['departure' + i]
                }
                else responseObject.departure = null
                if (callUpdate.response[i - 1]?.quarters || req.body['quarters' + i]) {
                    responseObject.quarters = callUpdate.response[i - 1]?.quarters || req.body['quarters' + i]
                }
                else responseObject.quarters = null
                responseOutput.push(new ResponseSchema({ ...responseObject }))
            }
            callUpdate.response = responseOutput

            await callUpdate.save()
            console.log('Saved selected call')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
            res.status(404).json('404 error: saveSelectedCall')
        }
    },
    deleteSelectedCall: async (req, res) => {
        try {
            await Call.remove({ _id: req.body.id });
            console.log('Deleted selected call')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
            res.status(404).json('404 error: deleteSelectedCall')
        }
    },
}