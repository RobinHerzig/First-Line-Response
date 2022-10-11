const express = require('express')
const router = express.Router()
const demoController = require('../controllers/demo') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, demoController.getDemo)
router.post('/createCall', demoController.createCall)
router.get('/displaySelectedCall', demoController.displaySelectedCall)
router.put('/saveSelectedCall', demoController.saveSelectedCall)
router.delete('/deleteSelectedCall', demoController.deleteSelectedCall)

module.exports = router