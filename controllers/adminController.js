const server = require('../server');
const bcrypt = require('bcrypt');
exports.login = async (req, res) => {
    console.log(req.params);
   
    const q = `select * from admins where username='${req.params.username}'`;
    server.connection.query(q, async (error, rows, fields) => {
        if (error) {
           console.log(error);
           return;
        }
        if(rows.length) {
            const password = rows[0].password
            const value = await bcrypt.compare(req.params.password, password);
            res.status(200).json({
                status: 'succes',
                message:value
            });
        } else {
            res.status(200).json({
                status: 'succes',
                message:false
            });
        } 
    });

}


exports.signup = async (req, res) => {
    try {
        const data = req.body
    
        data.password = await bcrypt.hash(data.password, 12);

        server.connection.query('INSERT INTO admins SET ?', data, (err, result) => {

            if (err) {
            
                res.status(500).json({
                    status: 'failure'
                });
                return
            }
            res.status(200).json({
                status: 'succes'
            });

        });
    } catch (err) {
        console.log(err)
    }
};