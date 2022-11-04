const express = require('express')
const router = express.Router()
const demoController = require('../controllers/demo') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', demoController.getDemo)
router.post('/createCall', ensureAuth, demoController.createCall)
router.get('/displaySelectedCall', demoController.displaySelectedCall)
router.put('/saveSelectedCall', ensureAuth, demoController.saveSelectedCall)
router.delete('/deleteSelectedCall', ensureAuth, demoController.deleteSelectedCall)

module.exports = router