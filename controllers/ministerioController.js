const Ministerio= require('../models/tb_ministerio')

module.exports = class MinisterioController{


    static async CreateMinisterio(req, res){

        const { ministerio, descricao  } = req.body

        if(!ministerio){
            res.status(422).json({
                success: false,
                message: 'o nome do ministério não pode ficar vazio '
            })
            return
        }
        if(!descricao){
            res.status(422).json({
                success: false,
                message: 'A descrição não pode ficar vazia'
            })
            return
        }

        try{

            const ministerioCad = {

                nome_ministerio: ministerio,
                descricao_ministerio: descricao,
            }

            const createdministerio = await Ministerio.create(ministerioCad)

            res.status(200).json({
                success: true,
                message: 'Funçao criada com sucesso',
                ministerio: createdministerio
            })

        } catch (err){
            
            res.status(422).json({
                success: false,
                message: err
            })
            console.log(err)
        }

    }

    static async ListMinisterio(req, res){

        
        const { id_igreja } = req.params

        try{

            const ministerio =  await Ministerio.findAll({
                where: {
                    id_igreja
                }
            })
              res.status(200).json({
                success: true,
                  data: ministerio
              })
  
          } catch (err){
              res.status(422).json({
                success: false,
                message: err
            })
              console.log(err)
          }

    }
    
    static async ListMinisterioById(req, res){

        
        const { id_ministerio } = req.params
        
        try{

            const Ministerio =  await Ministerio.findOne({
                where: {
                    id_ministerio
                }
            })
              res.status(200).json({
                success: true,
                  data: Ministerio
              })
  
  
          } catch (err){
              res.status(422).json({
                success: false,
                message: err
            })
              console.log(err)
          }

    }

    static async UpdateMinisterio(req, res){

        
        const { id_ministerio } = req?.params
        const { descricao, ministerio } = req?.body

        if(!id_ministerio){
            res.status(422).json({
                message: 'o Id do ministerio não pode ficar vazio '
            })
            return
        }

        if(!ministerio){
            res.status(422).json({
                success: false,
                message: 'o nome do ministerio não pode ficar vazio '
            })
            return
        }
        if(!descricao){
            res.status(422).json({
                success: false,
                message: 'A descrição não pode ficar vazia'
            })
            return
        }

        try{

            const ministerioId = await Ministerio.findOne({where: {id_ministerio}})

            if(!ministerioId){
                res.status(422).json({
                    success: false,
                    message: 'Este ministerio não existe'
                })
                return
            }
    

            const ministerioCad = {

                nome_ministerio: ministerio,
                descricao_ministerio: descricao,
            }

            await Ministerio.update(ministerioCad, {
                where : {
                    id_ministerio
                }
            })

            res.status(200).json({
                success: true,
                message: 'Funçao atualizada com sucesso',
                ministerio: {id_ministerio,
                    ...ministerioCad
                }
            })

        } catch (err){
            
            res.status(422).json({
                success: false,
                message: err
            })
            console.log(err)
        }


    }

    static async DeleteMinisterio(req, res){

        
        const { id_ministerio } = req?.params

        
        if(!id_ministerio){
            res.status(422).json({
                message: 'o Id do ministerio não pode ficar vazia'
            })
            return
        }
        
        try{

            const ministerioId = await Ministerio.findOne({where: {id_ministerio}})

            if(!ministerioId){
                res.status(422).json({
                    success: false,
                    message: 'Este ministerio não existe'
                })
                return
            }
    

            const ministerioCad = {

               status: 'D'
            }

            await Ministerio.update(ministerioCad, {
                where : {
                    id_ministerio
                }
            })

            res.status(200).json({
                success: true,
                message: 'Ministerio deletado com sucesso',
            })

        } catch (err){
            
            res.status(422).json({
                success: false,
                message: err
            })
            console.log(err)
        }


    }

}