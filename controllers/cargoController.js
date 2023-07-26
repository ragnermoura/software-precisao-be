const Cargo = require('../models/tb_cargo')

module.exports = class CargoController{


    static async CreateCargo(req, res){

      
        const { cargo, descricao  } = req.body

        if(!cargo){
            res.status(422).json({
                success: false,
                message: 'o nome do cargo não pode ficar vazio '
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

            const CargoCad = {

                nome_cargo: cargo,
                descricao_cargo: descricao,
            }

            const cargoCreated = await Cargo.create(CargoCad)

            res.status(200).json({
                success: true,
                message: 'Cargo criado com sucesso',
                cargo: cargoCreated
            })

        } catch (err){
            
            res.status(422).json({
                success: false,
                message: err
            })
            console.log(err)
        }

    }

    static async ListCargo(req, res){

        const { id_igreja } = req.params

        try{

            const cargos =  await Cargo.findAll({
                where: {
                    id_igreja
                }
            })
              res.status(200).json({
                success: true,
                  data: cargos
              })
  
          } catch (err){
              res.status(422).json({
                success: false,
                message: err
            })
              console.log(err)
          }

    }
    
    static async ListCargoById(req, res){

        
        const { id_cargo } = req.params
        
        try{

            const cargos =  await Cargo.findOne({
                where: {
                    id_cargo
                }
            })
              res.status(200).json({
                success: true,
                  data: cargos
              })
  
  
          } catch (err){
              res.status(422).json({
                success: false,
                message: err
            })
              console.log(err)
          }

    }

    static async UpdateCargo(req, res){

        
        const { id_cargo } = req?.params
        const { descricao, cargo } = req?.body

        if(!id_cargo){
            res.status(422).json({
                message: 'o Id do cargo não pode ficar vazio '
            })
            return
        }

        if(!cargo){
            res.status(422).json({
                success: false,
                message: 'o nome do cargo não pode ficar vazio '
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

            const cargoId = await Cargo.findOne({where: {id_cargo}})

            if(!cargoId){
                res.status(422).json({
                    success: false,
                    message: 'Este cargo não existe'
                })
                return
            }
    

            const cargoCad = {

                nome_cargo: cargo,
                descricao_cargo: descricao,
            }

            await Cargo.update(cargoCad, {
                where : {
                    id_cargo
                }
            })

            res.status(200).json({
                success: true,
                message: 'cargo atualizado com sucesso',
                cargo: {id_cargo,
                    ...cargoCad
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

    static async DeleteCargo(req, res){

        
        const { id_cargo } = req?.params

        
        if(!id_cargo){
            res.status(422).json({
                message: 'o Id do cargo não pode ficar vazio '
            })
            return
        }
        
        try{

            const cargoId = await Cargo.findOne({where: {id_cargo}})

            if(!cargoId){
                res.status(422).json({
                    success: false,
                    message: 'Este cargo não existe'
                })
                return
            }
    

            const CargoCad = {

               status: 'D'
            }

            await Cargo.update(CargoCad, {
                where : {
                    id_funcao
                }
            })

            res.status(200).json({
                success: true,
                message: 'Cargo deletado com sucesso',
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