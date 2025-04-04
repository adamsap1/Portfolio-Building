const express = require('express');
const router = express.Router();
const {
    getAllContactMssgs,
    // getContactMssg,
    saveContactRequest,
    // updateContactMssg,
    deleteContactMssg
} = require('../controller/contactController');

router.get('/', getAllContactMssgs);
// router.get('/message/:id', getContactMssg);
router.post('/save_contact', saveContactRequest);
// router.put('/update_req/:id', updateContactMssg);
// router.delete('/remove_req/:id', deleteContactMssg);

module.exports = router;
