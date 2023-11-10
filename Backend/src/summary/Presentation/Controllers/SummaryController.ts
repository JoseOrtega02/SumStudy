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
export function SummaryController() {
  const repositoryInstance: IsummaryRepo<Summary> = new SummaryRepository()
  const router = express.Router()
  router.get('/', (req, res) => {
    const useCase = new getAllSummariesUC(repositoryInstance)
    const items = useCase.getAllSumaries()
    items.then((items) => {
      res.json(items)
    })
  })
  router.get('/:id', (req, res) => {
    const id = req.params.id //req.params.id
    const useCase = new getSummaryByIdUC(repositoryInstance)
    const validation = IDSummarySchemaValidation.safeParse({ id: id })
    if (validation.success) {
      const item = useCase.getSummaryById(validation.data.id)
      item?.then((item) => {
        res.json(item)
      })
    } else {
      res.status(404).json({ message: 'Elemento no encontrado' })
    }
  })

  router.post('/', (req, res) => {
    const validation = UploadSummarySchemaValidation.safeParse(req.body)
    if (validation.success) {
      const useCase = new createSummaryUC(repositoryInstance)
      const newItem = useCase.cresateSummary(
        validation.data.name,
        validation.data.pdf,
        validation.data.sum_desc,
        validation.data.subject,
        validation.data.career,
        validation.data.lenght,
        validation.data.up_date,
        validation.data.likes
      )
      res.status(201).json(newItem)
    } else {
      res.status(400).json({ error: 'El cuerpo de la solicitud no es válido' })
    }
  })

  router.delete('/:id', (req, res) => {
    const id = req.params.id
    const validation = IDSummarySchemaValidation.safeParse({ id: id })
    if (validation.success) {
      const useCase = new deleteSummaryUC(repositoryInstance)
      const deletedSummary = useCase.deleteSummary(id)
      res.send('Elemento borrado correctamente')
    } else res.status(404).json({ message: 'Elemento no encontrado' })
  })

  router.post('/:id', (req, res) => {
    const id = req.params.id
    const validation = IDSummarySchemaValidation.safeParse({ id: id })
    if (validation.success && req.body.name) {
      const useCase = new UpdateSummaryUC(repositoryInstance)
      const updatedSummary = useCase.updateSummary(validation.data.id, req.body.name)
      res.send('Elemento actualizado correctamente: ' + JSON.stringify(updatedSummary))
    } else res.status(404).json({ message: 'Elemento no encontrado' })
  })
  return router
}
