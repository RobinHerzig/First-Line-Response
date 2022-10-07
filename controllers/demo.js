const Call = require('../models/Call')


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

            await Call.updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        business: req.body.business,
                        address: req.body.address,
                        city: req.body.city,
                        type: req.body.type,
                        first: req.body.first,
                        last: req.body.last,
                        phone: req.body.phone,
                    },
                }
            )
            if (req.body.newNote) { // Seperate update for array, or else it will push empty timestamp
                await Call.updateOne(
                    { _id: req.body.id },
                    {
                        $push: {
                            callNotes: (`${new Date().toLocaleTimeString('en-US', { hour12: false })}: ${req.body.newNote}`),
                        }
                    }
                )
            }

            // pull info to add to it, then resubmit?
            // const data = await Call.find({apparatus})
            // console.log(data)

            let responseDepartmentTypes = ['apparatus', 'tone', 'enroute', 'arrival', 'departure', 'quarters']
            let responseDepartment = {}
            debugger
            for (let property in req.body) {
                console.log(property)
                if (responseDepartmentTypes.map(elem => property.includes(elem)).includes(true) && property.length > 0) {
                    responseDepartment[property] = req.body[property]
                }
            }

            console.log('body', req.body)
            console.log('responseDepartment', responseDepartment)


            if (true) { // Seperate update for apparatus
                await Call.updateOne(
                    { _id: req.body.id },
                    {
                        $addToSet: {
                            apparatus: responseDepartment
                        }
                    }
                )
            }
            console.log('Saved selected call')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
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