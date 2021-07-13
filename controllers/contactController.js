const Contact = require('../models/contactModel');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');


exports.getUserAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 })

        res.json(contacts)
    } 
    catch (err) {
        console.error(err.message) 
        res.status(500).send('Server error in getUserAllContacts')
    }
}


exports.addNewContact = async (req, res) => {
    const errors = validationResult(req)

    // Validate request
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }

    const { name, email, phone, type } = req.body

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save()

        res.json(contact)
    } 
    catch (err) {
        console.error(err.message) 
        res.status(500).send('Server error in addNewContact')
    }
}


exports.updateContact = async (req, res) => {
    const { name, email, phone, type } = req.body

    //Build contact Object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id)

        if(!contact){
            return res.status(404).json({
                message: "Contact Not Found !"
            })
        }

        //Make user user Owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({
                message: "Not Authorized !!"
            })
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true }
        )

        res.json(contact)

    } 
    catch (err) {
        console.error(err.message) 
        res.status(500).send('Server error in updateContact')
    }
}


exports.deleteContact = async (req, res) => { 
    try {
        let contact = await Contact.findById(req.params.id)

        if(!contact){
            return res.status(404).json({
                message: "Contact Not Found !"
            })
        }

        //Make user user Owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({
                message: "Not Authorized !!"
            })
        }

        await Contact.findByIdAndRemove(req.params.id)

        res.json({
            message: "Contact Deleted"
        })

    } 
    catch (err) {
        console.error(err.message) 
        res.status(500).send('Server error in deleteContact') 
    }
}