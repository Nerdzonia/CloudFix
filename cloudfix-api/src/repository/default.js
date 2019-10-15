const update = (model, body, res) => {
    model.findById(body.id, async (err, doc) => {
        if(err)
            return res.status(400).send({error: `Error on search ticket ${err}`});

        Object.assign(doc, body);
        
        doc.save((err, doc) =>{
            if(err)
                return res.status(400).send({error: `Error on atualize ticket ${err}`});

            return res.send(doc);
        });
    });
}

const listAll = async (model, res, populate = {}) => {
    try {
        const result = await model.find().populate(Object.entries(populate).length !== 0 ? populate : '');
        return res.send(result);
    } catch (error) {
        return res.status(400).send({ error: `Could't list clients. Error: ${error}` });
    }
}



module.exports = {
    update,
    listAll
}