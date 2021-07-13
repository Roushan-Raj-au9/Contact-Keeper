const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { isSignedIn } = require('../middleware/authMiddleware');
const { getUserAllContacts, addNewContact, updateContact, deleteContact } = require('../controllers/contactController');


//get all user contacts
router.get('/', isSignedIn, getUserAllContacts)

//Add new Contact
router.post('/add', 
    [
        check("name", "Name is required").not().isEmpty()
    ],
    isSignedIn, addNewContact
)

//Update Contact
router.put('/:id', isSignedIn, updateContact)


//Delete Contact
router.delete('/:id', isSignedIn, deleteContact)


module.exports = router;