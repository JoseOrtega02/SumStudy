import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import SummaryRepository from 'src/summary/Infra/Repositories/SummaryRepository'
import express from 'express'
import { getAllSummariesUC } from 'src/summary/App/UseCases/GetAllSummariesUC'
import createSummaryUC from 'src/summary/App/UseCases/createSummaryUC'
import { getSummaryByIdUC } from 'src/summary/App/UseCases/getSummaryBiIdUC'
import { deleteSummaryUC } from 'src/summary/App/UseCases/deleteSummaryUC'
import { UpdateSummaryUC } from 'src/summary/App/UseCases/updateSummaryUC'
export function SummaryController() {
  const repositoryInstance: IsummaryRepo<Summary> = new SummaryRepository()
  const router = express.Router()
  router.get('/', (req, res) => {
    const useCase = new getAllSummariesUC(repositoryInstance)
    const items = useCase.getAllSumaries()
    res.json(items)
  })
  router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const useCase = new getSummaryByIdUC(repositoryInstance)
    const item = useCase.getSummaryById(id)
    if (item) {
      res.json(item)
    } else {
      res.status(404).json({ message: 'Elemento no encontrado' })
    }
  })

  router.post('/', (req, res) => {
    // Manejo de error si req.body no contiene la propiedad 'name' cambiar
    //luego por zod
    if (typeof req.body === 'object' && 'name' in req.body) {
      const name = (req.body as { name: string }).name
      const useCase = new createSummaryUC(repositoryInstance)
      const newItem = useCase.cresateSummary(name)
      res.status(201).json(newItem)
    } else {
      // Manejo de error si req.body no contiene la propiedad 'name'
      res.status(400).json({ error: 'El cuerpo de la solicitud no es válido' })
    }
  })
  router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const useCase = new deleteSummaryUC(repositoryInstance)
    const deletedSummary = useCase.deleteSummary(id)
    if (deletedSummary !== -1) {
      res.send('Elemento borrado correctamente')
    } else res.status(404).json({ message: 'Elemento no encontrado' })
  })
  router.post('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const name = req.body.name
    const useCase = new UpdateSummaryUC(repositoryInstance)
    const updatedSummary = useCase.updateSummary(id, name)
    if (updatedSummary !== -1) {
      res.send('Elemento actualizado correctamente: ' + JSON.stringify(updatedSummary))
    } else res.status(404).json({ message: 'Elemento no encontrado' })
  })
  return router
}
