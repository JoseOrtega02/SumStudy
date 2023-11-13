import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'
import { UserRepository } from 'src/User/Infra/Repositories/UserRepository'
import express from 'express'
import { GetAllUseCase } from 'src/User/App/UseCases/GetAllUseCase'
import { GetOneUseCase } from 'src/User/App/UseCases/GetOneUseCase'
import { UpdateUseCase } from 'src/User/App/UseCases/UpdateUseCase'
import { CreateUseCase } from 'src/User/App/UseCases/CreateUseCase'
import { DeleteUseCase } from 'src/User/App/UseCases/DeleteUseCase'
import { UserController } from '../Controllers/UserController'
export function UserHandler() {
  const repositoryInstance: IUserRepository<User> = new UserRepository()
  const controller: UserController = new UserController()
  const router = express.Router()
  router.get('/', (req, res) => {
    const paginator = controller.getAllUsers(repositoryInstance)
    res.json(paginator)
  })
  router.get('/:id', (req, res) => {
    const id = req.params.id
    const paginator = controller.getOne(id, repositoryInstance)
    if (paginator) {
      res.json(paginator)
    } else {
      res.status(404).json({ message: 'Elemento no encontrado' })
    }
  })

  router.post('/', (req, res) => {
    const data = req.body
    const paginator = controller.createUser(data, repositoryInstance)
    if (data.name && data.email && data.password) {
      res.status(201).json()
    } else {
      res.status(400).json({ error: 'El cuerpo de la solicitud no es-NLS' })
    }
  })

  router.delete('/:id', (req, res) => {
    const id = req.params.id
    const paginator = controller.deleteUser(id, repositoryInstance).then((paginator) => {
      if (paginator !== -1) {
        res.send('Elemento borrado correctamente')
      } else res.status(404).json({ message: 'Elemento no encontrado' })
    })
  })

  router.post('/:id', (req, res) => {
    const data = req.body
    const paginator = controller.updateUser(data, repositoryInstance).then((updatedUser) => {
      if (updatedUser !== -1) {
        res.send('Elemento actualizado correctamente: ' + JSON.stringify(updatedUser))
      } else res.status(404).json({ message: 'Elemento no encontrado' })
    })
  })
  return router
}
