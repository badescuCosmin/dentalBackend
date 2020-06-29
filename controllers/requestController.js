const server = require('../server');

exports.postMesaj = async (req, res) => {
    try {
        const data = await req.body;
        server.connection.query('INSERT INTO requests SET ?', data, (err, result) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'database error',
                    error: err
                });
                return
            }
            res.status(201).json({
                status: "succes"
            });
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getMessages = async (req, res) => {
   const q = `SELECT * FROM requests;`;
    server.connection.query(q, (error, rows, fields) => {
        if (error) {
            res.sendStatus(500);
            res.end();
            console.log('internal error');
            return
        }
        res.status(200).json({
            results: rows.length,
            status: 'succes',
            data: {
                rows
            }
        });
    });
}

exports.deleteMessage = async (req, res) => {
    try {
        const param = await req.params.id;
        const parsedParam = param.replace(/:/g, '');
        server.connection.query(`DELETE FROM requests WHERE ID=${parsedParam}`, (err, result) => {
            if (err) throw err
            res.status(201).json({
                status: "succes"
            });
        });
    } catch (err) {
        console.log(err)
    }
}