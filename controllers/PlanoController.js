const { Op } = require('sequelize')
const Planos = require('../models/tb002_plano')

module.exports = class PlanosController {

    

    static async GetPlanos(req, res){

        try{

          const planos =  await Planos.findAll({
                where: {
                 id_plano: {[Op.gte]: 1}
                }
            })

            res.status(200).json({
                data: planos
            })


        } catch (err){
            res.status(422).json({message: err})
            console.log(err)
        }

    }

    static async GetPlanosById(req, res){

        const { id_plano } = req.params
        
        const planoId =  await Planos.findOne({
            where: {
             id_plano: id_plano
            }
        })

        if(!planoId){
            res.status(422).json({
                message: 'Plano não existente'
            })
        }

        try{

          const planos =  await Planos.findOne({
                where: {
                 id_plano: id_plano
                }
            })


            res.status(200).json({
                data: planos
            })


        } catch (err){
            res.status(422).json({message: err})
            console.log(err)
        }

    }

    static async CadPlanos(req, res){
        
        const { plano, descricao, valor  } = req.body

        if(!plano){
            res.status(422).json({
                message: 'o Plano não pode ficar vazio '
            })
            return
        }
        if(!descricao){
            res.status(422).json({
                message: 'A descrição não pode ficar vazia'
            })
            return
        }
        if(!valor || valor <= 0){
            res.status(422).json({
                message: 'o Valor não pode ficar vazio ou ser igual á 0'
            })
            return
        }

        try{

            const planoCad = {

                nome_plano: plano,
                descricao_plano: descricao,
                valor_plano: valor
            }

            await Planos.create(planoCad)
            res.status(200).json({
                message: 'Plano cadastrado com sucesso',
                planoCriado: planoCad
            })

        } catch (err){
            res.status(422).json({message: err})
            console.log(err)
        }

    }

    static async DeletePlano(req, res){
        
        const { id_plano  } = req.body

       
        if(!id_plano){
            res.status(422).json({
                message: 'o Id do plano não pode ficar vazio '
            })
            return
        }

        const planoId =  await Planos.findOne({
            where: {
             id_plano: id_plano
            }
        })

        if(!planoId){
            res.status(422).json({
                message: 'Plano não existente'
            })
        }

        try{
            

            await Planos.destroy( {
                where: {
                    id_plano : id_plano
                }
            })
            res.status(200).json({
                message: 'Plano deletado com sucesso',
            })

        } catch (err){
            res.status(422).json({message: err})
            console.log(err)
        }

    }
    static async AtualizaPlano(req, res){
        
        const { plano, descricao, valor, id_plano  } = req.body

        if(!plano){
            res.status(422).json({
                message: 'o Plano não pode ficar vazio '
            })
            return
        }
        if(!id_plano){
            res.status(422).json({
                message: 'o Id do plano não pode ficar vazio '
            })
            return
        }
        if(!descricao){
            res.status(422).json({
                message: 'A descrição não pode ficar vazia'
            })
            return
        }
        if(!valor || valor <= 0){
            res.status(422).json({
                message: 'o Valor não pode ficar vazio ou ser igual á 0'
            })
            return
        }

        const planoId =  await Planos.findOne({
            where: {
             id_plano: id_plano
            }
        })

        if(!planoId){
            res.status(422).json({
                message: 'Plano não existente'
            })
        }

        try{
            const planoCad = {

                nome_plano: plano,
                descricao_plano: descricao,
                valor_plano: valor
            }

            await Planos.update(planoCad, {
                where: {
                    id_plano : id_plano
                }
            })
            res.status(200).json({
                message: 'Plano cadastrado com sucesso',
                planoCriado: planoCad
            })

        } catch (err){
            res.status(422).json({message: err})
            console.log(err)
        }

    }


}