import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'
import { UserRepository } from 'src/User/Infra/Repositories/UserRepository'
import express from 'express'
import { UserController } from '../Controllers/UserController'
export function UserHandler() {
  const repositoryInstance: IUserRepository<User> = new UserRepository()
  const controller: UserController = new UserController()
  const router = express.Router()
  router.get('/', (req, res) => {
    const paginator = controller.getAllUsers(repositoryInstance).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else res.json(paginator)
    })
  })
  router.get('/:id', (req, res) => {
    const id = req.params.id
    const paginator = controller.getOne(id, repositoryInstance).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else if (paginator === undefined) res.status(404).json({ message: 'Elemento no encontrado' })
      else res.json(paginator)
    })
  })

  router.post('/', (req, res) => {
    const data = req.body
    const paginator = controller.createUser(data, repositoryInstance).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else res.json(paginator)
    })
  })

  router.delete('/:id', (req, res) => {
    const id = req.params.id
    const paginator = controller.deleteUser(id, repositoryInstance).then((paginator) => {
      if (paginator instanceof Error) res.status(404).json({ paginator })
      else if (paginator.afectedRows === 0) res.status(404).json({ message: 'Elemento no encontrado' })
      else res.json(paginator)
    })
  })

  router.post('/:id', (req, res) => {
    const data = req.body
    const paginator = controller.updateUser(data, repositoryInstance).then((updatedUser) => {
      if (updatedUser instanceof Error) res.status(404).json({ paginator })
      else if (updatedUser?.afectedRows === 0) res.status(404).json({ message: 'Elemento no encontrado' })
      else if (updatedUser?.afectedRows === 1) res.json('Elemento actualizado')
      else res.json(updatedUser)
    })
  })
  return router
}
