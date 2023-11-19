import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import SummaryRepository from 'src/summary/Infra/Repositories/SummaryRepository'
import express from 'express'
import { SummaryController } from '../Controllers/SummaryController'
import { ILikesRepository } from 'src/summary/Infra/Repositories/ILikesRepository'
import LikeRepository from 'src/summary/Infra/Repositories/LikesRepository'
import { LikeController } from '../Controllers/LikeController'
export function SummaryHandler() {
  const repositoryInstance: IsummaryRepo<Summary> = new SummaryRepository()
  const controller = new SummaryController()
  const router = express.Router()

  router.get('/', (req, res) => {
    let name: string
    let limit = req.query.limit || 10
    let offset = req.query.offset || 0
    if (typeof req.query.searchTerm === 'string') {
      name = req.query.searchTerm
    } else {
      name = ''
    }

    let paginator
    if (name !== '') {
      paginator = controller.searchSummaries(name, repositoryInstance)
    } else {
      paginator = controller.getAllSumaries(repositoryInstance, limit.toString(), offset.toString())
    }
    paginator.then((paginator) => {
      res.json(paginator)
    })
  })

  router.get('/author/:id', (req, res) => {
    const id = req.params.id
    const paginator = controller.getSummariesByAuthorId(id, repositoryInstance)
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
