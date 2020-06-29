const server = require('../server');

exports.getAllClients = (req, res, next) => {
    const q = `SELECT * FROM clients;`;
    server.connection.query(q, (error, rows, fields) => {
        if (error) {
            res.sendStatus(500);
            res.end();
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

exports.createClient = async (req, res, next) => {
    try {
        const data = await req.body;
        server.connection.query('INSERT INTO clients SET ?', data, (err, result) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'email sau telefon deja folosite',
                    error: err
                });
                return
            }
           server.connection.query(`UPDATE clients SET data_programarii = DATE_ADD('${data.data_programarii}', INTERVAL 1 DAY) WHERE email = "${data.email}"`, (err, result) => {
                if (err) throw err
                res.status(201).json({
                    status: "succes"
                });
            })
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getASpecificUser = async (req, res, next) => {
    try {
        const param = await req.params.id;
        const parsedParam = param.replace(/:/g, '');
        server.connection.query('select * from clients where Id=?', [parsedParam], function (error, rows, fields) {
            if (error) throw error;
            console.log(rows)
            res.status(201).json({
                status: "succes",
                data: {
                    rows
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

exports.updateClient = async (req, res, next) => {
    try {
        const param = await req.params.id;
        const parsedParam = param.replace(/:/g, '');
        const data = await req.body;
        console.log(req.params.id)
        console.log(data);
        server.connection.query(`UPDATE clients SET ? WHERE ID=${parsedParam}`, data, (err, result) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'email sau telefon deja folosite',
                    error: err
                });
                return
            }
            server.connection.query(`UPDATE clients SET data_programarii = DATE_ADD('${data.data_programarii}', INTERVAL 1 DAY) WHERE ID = ${parsedParam}`, (err, result) => {
                if (err) throw err
                res.status(201).json({
                    status: "succes"
                });
            })
        });
    } catch (err) {
        console.log(err)
    }
}

exports.deleteClient = async (req, res, next) => {
    try {
        const param = await req.params.id;
        const parsedParam = param.replace(/:/g, '');
        server.connection.query(`DELETE FROM clients  WHERE ID=${parsedParam}`, (err, result) => {
            if (err) throw err
            res.status(201).json({
                status: "succes"
            });
        });
    } catch (err) {
        console.log(err)
    }
}

exports.getNumberAndTotal = (req, res, next) => {
    const q = `SELECT Count(*) AS numar_total_useri ,SUM(suma_totala_plata) As suma_totala FROM clients;`; //query catre db in care se numara utilizatorii din db si se calculeaza suma totala de plata
    server.connection.query(q, (error, data, fields) => {
        if (error) {
            res.sendStatus(500);
            res.end();
            return
        }
        res.status(200).json({ // se afiseaza rezultatele 
            results: data.length,
            status: 'succes',
            data
        });
    });
}
exports.getSortare = (req, res, next) => {
    let q = ``;
    
    if (req.params.id == 'azi') {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        dd = dd + 1;
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = `${yyyy}-${mm}-${dd}`;
        q = `SELECT * FROM clients where data_programarii = "${today}" order by ora_programarii;`
    }
    if (req.params.id == 'nume') {
        q = `SELECT * FROM clients order by nume,prenume;`
    }
    if (req.params.id == 'valoare_total') {
        q = `SELECT * FROM clients order by suma_totala_plata;`
    }
    if (req.params.id == 'data_programarii') {
        q = `SELECT * FROM clients order by data_programarii,ora_programarii;`
    }
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

exports.getClientsByName = (req, res, next) => {
    q = `SELECT * FROM clients WHERE nume LIKE '%${req.params.id}%';`;
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