const database = require('../models')

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try {
      const umaPessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })
      return res.status(200).json(umaPessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const pessoaCriada = await database.Pessoas.create(novaPessoa)
      return res.status(200).json(pessoaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } })
      return res.status(200).json(pessoaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } })
      return res.status(200).json(`A pessoa de id ${id} foi apagada, não se encontram mais registros sobre a mesma.`)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  // http://localhost:3000/pessoas/estudanteId/matriculas/matriculaId

  static async pegaTodasAsMatriculas(req, res) {
    const { id } = req.params
    try {
      const todasAsMatriculas = await database.Matriculas.findAll({ where: { estudante_id: Number(id) } })
      return res.status(200).json(todasAsMatriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await database.Matriculas.findOne({ where: { id: Number(matriculaId),
      estudante_id: Number(estudanteId) } })
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaUmaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const matriculaCriada = await database.Matriculas.create(novaMatricula)
      return res.status(200).json(matriculaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      await database.Matriculas.update(novasInfos, { where: { id: Number(matriculaId) } })
      const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } })
      return res.status(200).json(matriculaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
      return res.status(200).json(`A matricula de id ${matriculaId} foi apagada, não se encontram mais registros sobre a mesma.`)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = PessoaController