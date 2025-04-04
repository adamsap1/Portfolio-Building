const ContactMssg = require('../model/contactModel');

const getAllContactMssgs = async (req, res) => {
    try {
        let pageNumber = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        pageNumber = !isNaN(pageNumber) && pageNumber >= 0 ? pageNumber : 0;
        size = !isNaN(size) && size > 0 ? size : 10;
        const sortField = req.query.sort || 'createdAt';
        const sortDirection = req.query.direction === 'desc' ? -1 : 1;
        const totalElements = await ContactMssg.countDocuments();
        const contactMssgs = await ContactMssg.find()
            .sort({ [sortField]: sortDirection })
            .skip(pageNumber * size)
            .limit(size);
        const totalPages = Math.max(Math.ceil(totalElements / size), 1);

        return res.status(200).send({
            data: contactMssgs,
            totalPages,
            totalElements,
            last: pageNumber >= totalPages - 1,
            size,
            pageNumber,
            sort: {
                empty: !contactMssgs.length,
                sorted: true,
                unsorted: false
            },
            message: "Success"
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

// const getContactMssg = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const contactMssgs = await ContactMssg.findById(id);

//         return res.status(200).send({
//             data: contactMssgs,
//             message: "Message retrieved successfully"
//         })
//     } catch (error) {
//         return res.status(500).send({
//             message: error.message
//         })
//     }
// }

const saveContactRequest = async (req, res) => {
    try {
        const contactReq = await ContactMssg.create(req.body);

        if (contactReq) {
            return res.status(200).send({
                // data: contactReq,
                message: 'Message sent successfully'
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
};

const deleteContactMssg = async (req, res) => {
    const { id } = req.params
    try {
        const mssgToRemove = await ContactMssg.findByIdAndDelete(id);

        if (mssgToRemove) {
            return res.status(200).send({
                message: 'Message deleted successfully'
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    getAllContactMssgs,
    // getContactMssg,
    saveContactRequest,
    deleteContactMssg
}