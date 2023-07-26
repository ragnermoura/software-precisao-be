module.exports = (schema, req, res, next) =>
{

        schema?.validate(req.body).then(() => next())
        .catch(err => {
            res.status(400).json({
                success: false,
                message: 'Houve um erro',
                err: err?.message
            })
            
        })
      

}