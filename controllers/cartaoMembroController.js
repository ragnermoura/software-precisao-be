const ConfigCartaoMembro = require("../models/tb_config_CartaoMembro")


module.exports = class CartaoMembroController{


    static async CreateCartaoMembro(req, res){

        const { cor_frontal, cor_traseira, orientacao, } = req.body

        if(!cor_frontal){

             res.status(422).json({
                success: false,
                message: 'a cor frontal do cartão não pode ficar vazia'
            })
            return

        }

        if(!cor_traseira){

             res.status(422).json({
                success: false,
                message: 'a cor traseira do cartão não pode ficar vazia'
            })
            return

        }

        if(!orientacao){

             res.status(422).json({
                success: false,
                message: 'a orientação do cartão não pode ficar vazia'
            })
            return

        }

        
        try{

            const CardMembro = {

                
                cor_frontal_config: cor_frontal,
                cor_traseira_config: cor_traseira,
                orientacao_config: orientacao,
            }

            const createdCardConfig = await ConfigCartaoMembro.create(CardMembro)

            res.status(200).json({
                success: true,
                message: 'Configuração do cartão criada com sucesso',
                cardConfig: createdCardConfig
            })

        } catch (err){
            
            res.status(422).json({
                success: false,
                message: err
            })
            console.log(err)
        }

        
    }

    static async ListCartaoMembro(req, res){}
    
    static async ListCartaoMembroById(req, res){}

    static async UpdateCartaoMembro(req, res){}

    static async DeleteCartaoMembro(req, res){}

}