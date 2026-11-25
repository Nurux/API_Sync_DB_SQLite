const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                msg: 'Token não informado'
            });
        }

        const token = authHeader.split(' ')[1];

        const decode_token = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = decode_token;
        next();
    } catch {
        res.status(401).send({ mensagem: 'Falha na autenticação' })
    }
}