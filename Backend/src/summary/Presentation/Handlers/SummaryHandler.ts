import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import SummaryRepository from 'src/summary/Infra/Repositories/SummaryRepository'
import express from 'express'
import { getAllSummariesUC } from 'src/summary/App/UseCases/GetAllSummariesUC'
import createSummaryUC from 'src/summary/App/UseCases/createSummaryUC'
import { getSummaryByIdUC } from 'src/summary/App/UseCases/getSummaryBiIdUC'
import { deleteSummaryUC } from 'src/summary/App/UseCases/deleteSummaryUC'
import { UpdateSummaryUC } from 'src/summary/App/UseCases/updateSummaryUC'
import { UUID } from 'crypto'
import { IDSummarySchemaValidation } from 'src/summary/Infra/Validations/IDSchemaValidation'
import { UploadSummarySchemaValidation } from 'src/summary/Infra/Validations/UploadSchemaValidation'
import { SummaryController } from '../Controllers/SummaryController'
export function SummaryHandler() {
  const repositoryInstance: IsummaryRepo<Summary> = new SummaryRepository()
  const controller = new SummaryController()
  const router = express.Router()

  router.get('/', (req, res) => {
    const paginator = controller.getAllSumaries(repositoryInstance)
    paginator.then((paginator) => {
      res.json(paginator)
    })
  })

  router.get('/:id', (req, res) => {
    const id = req.params.id

    const paginator = controller.getSummaryById(id, repositoryInstance)
    paginator.then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else if (paginator === undefined) res.status(404).json({ message: 'Elemento no encontrado' })
      else res.json(paginator)
      console.log(paginator)
    })
  })

  router.post('/', (req, res) => {
    const paginator = controller.createSummary(req.body, repositoryInstance).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else res.json(paginator)
    })
  })

  router.delete('/:id', (req, res) => {
    const id = req.params.id
    const paginator = controller.deleteSummary(id, repositoryInstance)
    paginator.then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else if (paginator.afectedRows === 0) res.status(404).json({ message: 'Elemento no encontrado' })
      else res.json(paginator)
    })
  })

  router.post('/:id', (req, res) => {
    const id = req.params.id
    const paginator = controller.updateSummary(id, req.body.name, repositoryInstance)
    paginator.then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else if (paginator?.afectedRows === 0) res.status(404).json({ message: 'Elemento no encontrado' })
      else if (paginator?.afectedRows === 1) res.json('Elemento actualizado')
      else res.json(paginator)
    })
  })
  return router
}
