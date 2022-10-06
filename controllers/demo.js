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
            console.log(req.body)
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

            // const apparatusObject = {}
            // const apparatusFields = ['apparatus', 'tone', 'enroute', 'arrival', 'departure', 'quarters']

            // console.log(req.body)
            // for (let property in req.body) {
            //     if (apparatusFields.includes(property) && req.body[property]) {
            //         apparatusObject[property] = req.body[property]
            //     }
            // }
            // console.log(apparatusObject)


            // [{ apparatus: '', tone: '', enroute: '' },
            // { apparatus1: '', tone1: '', enroute1: '' },
            //     { apparatus2: '', tone2: '', enroute2: '' }]

            

            console.log(req.body.apparatus)
            console.log(req.body.apparatus.length) 

            let apparatus = {}
            for (let i = 1; i < req.body.apparatus.length; i++) {
                if (i === 0) {
                    apparatus['apparatus' + i] = { apparatus: req.body.apparatus || '', tone: req.body.tone || '', enroute: req.body.enroute || '', arrival: req.body.arrival || '', departure: req.body.departure || '', quarters: req.body.quarters || ''}
                }
                // else {
                //     apparatus[i] = {apparatus: req.body.apparatus[i], tone: req.body.tone[i], enroute: req.body.enroute[i], arrival: req.body.arrival[i], departure: req.body.departure[i], quarters: req.body.quarters[i]}
                // }
            }

            console.log(apparatus)


            // const apparatus = { apparatus: '', tone: '', enroute: '' }
            // const apparatus1 = { apparatus1: '', tone1: '', enroute1: '' }



            if (true) { // Seperate update for array, or else it will push empty timestamp
                await Call.updateOne(
                    { _id: req.body.id },
                    {
                        $set: {
                            apparatus: req.body.apparatus
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
            console.log(req.body)
            await Call.remove({ _id: req.body.id });
            console.log('Deleted selected call')
            res.redirect('/demo')
        } catch (err) {
            console.log(err)
        }
    },
}

// module.exports = {
//     getTodos: async (req,res) => {
//         console.log(req.user)
//         try {
//             const todoItems = await Todo.find({userId:req.user.id})
//             const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
//             res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
//         } catch(err) {
//             console.log(err)
//         }
//     },
//     createTodo: async (req, res) => {
//         try {
//             await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
//             console.log('Todo has been added!')
//             res.redirect('/todos')
//         } catch(err) {
//             console.log(err)
//         }
//     },
//     markComplete: async (req, res) => {
//         try {
//             await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile}, {
//                 completed: true
//             })
//             console.log('Marked Complete')
//             res.json('Marked Complete')
//         } catch(err) {
//             console.log(err)
//         }
//     },
//     markIncomplete: async (req, res) => {
//         try {
//             await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile}, {
//                 completed: false
//             })
//             console.log('Marked Incomplete')
//             res.json('Marked Incomplete')
//         } catch(err) {
//             console.log(err)
//         }
//     },
//     deleteTodo: async (req, res) => {
//         console.log(req.body.todoIdFromJSFile)
//         try {
//             await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
//             console.log('Deleted Todo')
//             res.json('Deleted It')
//         } catch(err) {
//             console.log(err)
//         }
//     }
// }    