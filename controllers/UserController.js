
/* const bcrypt = require('bcrypt') */
/* const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-token') */
const User = require('../models/tb001_user')
const { Op } = require('sequelize')

module.exports = class UserController {

    /* static async SignIn(req, res){

        const { nome_user, sobrenome_user, email_user, senha_user } = req.body;

        if(!nome_user){
            res.status(422).json({message: 'O nome é obrigatório'});
            return
        };

        if(!sobrenome_user){
            res.status(422).json({message: 'O sobrenome é obrigatório'});
            return
        };

        if(!email_user){
            res.status(422).json({message: 'O e-mail é obrigatório'});
            return
        };

        if(!senha_user){
            res.status(422).json({message: 'A senha é obrigatória'});
            return
        };

        if(email_user == undefined){

            res.status(400).json({message: 'O e-mail é invalido'});
            return
        };
        
        const userExists = await User.findOne({where: { email_user: email_user }});

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha_user, salt)
        
        const user = {
            nome_user,
            sobrenome_user,
            email_user,
            senha_user: passwordHash
        };


        if (userExists) {
        res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
        return
        };

        try{
            await User.create(user)
            await createUserToken(user, req, res)
        } catch(err){
            res.status(500).json({ message: err })
        }
    }

    static async Login(req, res){
        const {email_user, senha_user} = req.body

        
        if(!email_user){
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }
        
        if(!senha_user){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        const user = await User.findOne({where: {email_user: email_user}})
        if(!user){
            res.status(422).json({message: 'Não há usuário cadastrado com este e-mail!'})
            return
        }


        const passwordMatch = bcrypt.compareSync(senha_user, user.senha_user)

        if(!passwordMatch){
            res.status(422).json({message: 'Senha incorreta'})
            return
        }

        await createUserToken(user, req, res)
    } */

    static async GetClient(req, res){

        try{

          const users =  await User.findAll({
                where: {
                 id_user: {[Op.gte]: 1}
                }
            })

            console.log('Users',users)

            res.status(200).json({
                data: users
            })


        } catch (err){
            res.status(422).json({message: err})
            console.log(err)
        }

    }


}