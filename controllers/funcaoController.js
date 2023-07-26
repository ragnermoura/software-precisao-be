const Funcoes = require("../models/tb_funcao")

module.exports = class FuncaoController{


    static async CreateFuncao(req, res){

        const { funcao, descricao  } = req.body

        if(!funcao){
            res.status(422).json({
                success: false,
                message: 'o nome da função não pode ficar vazio '
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

            const FuncaoCad = {

                nome_funcao: funcao,
                descricao_funcao: descricao,
            }

            const createdFuncao = await Funcoes.create(FuncaoCad)

            res.status(200).json({
                success: true,
                message: 'Funçao criada com sucesso',
                funcao: createdFuncao
            })

        } catch (err){
            
            res.status(422).json({
                success: false,
                message: err
            })
            console.log(err)
        }

    }

    static async ListFuncao(req, res){

        const { id_igreja } = req.params

        try{

            const funcoes =  await Funcoes.findAll({
                where: {
                    id_igreja
                }
            })
              res.status(200).json({
                success: true,
                  data: funcoes
              })
  
          } catch (err){
              res.status(422).json({
                success: false,
                message: err
            })
              console.log(err)
          }

    }
    
    static async ListFuncaoById(req, res){

        const { id_funcao } = req.params
        
        try{

            const funcoes =  await Funcoes.findOne({
                where: {
                    id_funcao
                }
            })
              res.status(200).json({
                success: true,
                  data: funcoes
              })
  
  
          } catch (err){
              res.status(422).json({
                success: false,
                message: err
            })
              console.log(err)
          }
      
    }

    static async UpdateFuncao(req, res){

        const { id_funcao } = req?.params
        const { descricao, funcao } = req?.body

        if(!id_funcao){
            res.status(422).json({
                message: 'o Id da função não pode ficar vazio '
            })
            return
        }

        if(!funcao){
            res.status(422).json({
                success: false,
                message: 'o nome da função não pode ficar vazio '
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

            const FuncaoId = await Funcoes.findOne({where: {id_funcao}})

            if(!FuncaoId){
                res.status(422).json({
                    success: false,
                    message: 'Esta função não existe'
                })
                return
            }
    

            const FuncaoCad = {

                nome_funcao: funcao,
                descricao_funcao: descricao,
            }

            await Funcoes.update(FuncaoCad, {
                where : {
                    id_funcao
                }
            })

            res.status(200).json({
                success: true,
                message: 'Funçao atualizada com sucesso',
                funcao: {id_funcao,
                    ...FuncaoCad
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

    static async DeleteFuncao(req, res){

        const { id_funcao } = req?.params

        
        if(!id_funcao){
            res.status(422).json({
                message: 'o Id da função não pode ficar vazia'
            })
            return
        }
        
        try{

            const FuncaoId = await Funcoes.findOne({where: {id_funcao}})

            if(!FuncaoId){
                res.status(422).json({
                    success: false,
                    message: 'Esta função não existe'
                })
                return
            }
    

            const FuncaoCad = {

               status: 'D'
            }

            await Funcoes.update(FuncaoCad, {
                where : {
                    id_funcao
                }
            })

            res.status(200).json({
                success: true,
                message: 'Funçao deletado com sucesso',
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