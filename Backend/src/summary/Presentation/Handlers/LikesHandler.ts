import { Summary } from 'src/summary/Domain/Entities/Summary'
import { ILikesRepository } from 'src/summary/Infra/Repositories/ILikesRepository'
import LikeRepository from 'src/summary/Infra/Repositories/LikesRepository'
import { LikeController } from 'src/summary/Presentation/Controllers/LikeController'
import express from 'express'
export function LikeHandler() {
  const repositoryInstance: ILikesRepository<Summary> = new LikeRepository()
  const controller = new LikeController()
  const router = express.Router()

  router.get('/', (req, res) => {
    let summaryId: string
    if (typeof req.query.summaryId === 'string') {
      summaryId = req.query.summaryId
    } else {
      summaryId = ''
    }

    const paginator = controller.getLikes(repositoryInstance, summaryId).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else res.json(paginator)
    })
  })

  router.post('/', (req, res) => {
    const userId = req.body.user_id
    const summaryId = req.body.summary_id

    const paginator = controller.addLike(repositoryInstance, req.body).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator, message: 'Error al dar like' })
      else res.json(paginator)
    })
  })

  router.delete('/', (req, res) => {
    const userId = req.body.user_id
    const summaryId = req.body.summary_id
    const paginator = controller.removeLike(repositoryInstance, userId, summaryId).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else res.json(paginator)
    })
  })
  return router
}
