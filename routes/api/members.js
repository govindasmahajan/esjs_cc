const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const members = require("../../Members");

router.get("/", (req, res) => res.json(members));

/**Get One Member by ID */
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res
            .status(400)
            .json({ msg: `No member with the id of ${req.params.id} is present.` });
    }
});

/** Create a member */
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: `Please include a name & email` })
    } else {
        members.push(newMember);
        res.json(members);
        /* res.redirect('/'); */
    }
});
/** Update a member */
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updateMember = req.body;

        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: `memmber was upadted`, member })
            }
        })
    } else {
        res
            .status(400)
            .json({ msg: `No member with the id of ${req.params.id} is present.` });
    }
});
/**Delete Member by ID */
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res
            .status(400)
            .json({ msg: `No member with the id of ${req.params.id} is present.` });
    }
});
module.exports = router;
