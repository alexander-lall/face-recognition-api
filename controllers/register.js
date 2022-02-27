const handleRegister = (db, bcrypt) => (req, res) => {
    const {name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(response => {
        return trx('users')
                .returning('*')
                .insert({
                    email: response[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => res.json(user[0]))
                .catch(err => res.status(400).json('unable to register')); 
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });   
}

module.exports = { handleRegister}