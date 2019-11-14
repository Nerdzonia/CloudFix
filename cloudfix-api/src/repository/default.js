const update = (model, body, res) => {
    model.findById(body.id, async (err, doc) => {
        if(err)
            return res.status(400).send({error: `Erro ao atualizar ${err}`});

        Object.assign(doc, body);
        
        doc.save((err, doc) =>{
            if(err)
                return res.status(400).send({error: `Ocorreu um erro ao tentar atualizar ${err}`});

            return res.send({doc});
        });
    });
}

const listAll = async (model, res, populate = {}) => {
    try {
        const data = await model.find().populate(Object.entries(populate).length !== 0 ? populate : '');

        return res.send({data});
    } catch (error) {
        return res.status(400).send({ error: `Erro ao tentar listar: ${error}` });
    }
}

const findById = async (model, id,  res, populate) => {
    try{
        const data = await model.findById(id).populate(Object.entries(populate).length !== 0 ? populate : '');
            
        return res.send({data});
    }catch(err){
        return res.status(400).send({error: 'Erro ao procurar'});
    }
}

const save = async (model, data, res) => {
    try {
        const result = await model.create(data);

        return res.send({result});
    } catch (error) {
        console.log(error)
        return res.status(400).send({error: 'Erro ao salvar.'});
    }
}

const removeOne = async (model, id, res) => {
    try{
        const result = await model.findOneAndRemove({_id: id});

        return res.send({result});
    }catch(error){
        console.log(error)
        return res.status(400).send({error: 'Erro ao apagar'});
    }
}

module.exports = {
    update,
    listAll,
    findById,
    save,
    removeOne
}