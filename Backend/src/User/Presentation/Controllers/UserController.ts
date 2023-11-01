import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'
import { UserRepository } from 'src/User/Infra/Repositories/UserRepository'
import express from 'express'
import { GetAllUseCase } from 'src/User/App/UseCases/GetAllUseCase'
import { GetOneUseCase } from 'src/User/App/UseCases/GetOneUseCase'
import { UpdateUseCase } from 'src/User/App/UseCases/UpdateUseCase'
import { CreateUseCase } from 'src/User/App/UseCases/CreateUseCase'
import { DeleteUseCase } from 'src/User/App/UseCases/DeleteUseCase'
export function UserController() {
  const repositoryInstance: IUserRepository<User> = new UserRepository()
  const router = express.Router()
  router.get('/', (req, res) => {
    const useCase = new GetAllUseCase(repositoryInstance)
    const Users = useCase.getAll()
    res.json(Users)
  })
  router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const useCase = new GetOneUseCase(repositoryInstance)
    const Users = useCase.getOne(id)
    if (Users) {
      res.json(Users)
    } else {
      res.status(404).json({ message: 'Elemento no encontrado' })
    }
  })
  router.post('/', (req, res) => {
    // Manejo de error si req.body no contiene la propiedad 'name' cambiar
    //luego por zod
    const useCase = new CreateUseCase(repositoryInstance)
    if (typeof req.body === 'object' && 'name' in req.body) {
      const name = (req.body as { name: string }).name
      const email = (req.body as { email: string }).email
      const password = (req.body as { password: string }).password
      const newUser = useCase.createUser(name, email, password)
      res.status(201).json(newUser)
    } else {
      // Manejo de error si req.body no contiene la propiedad 'name'
      res.status(400).json({ error: 'El cuerpo de la solicitud no es-NLS' })
    }
  })
  router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const useCase = new DeleteUseCase(repositoryInstance)
    const deletedUser = useCase.delete(id)
    if (deletedUser !== -1) {
      res.send('Elemento borrado correctamente')
    } else res.status(404).json({ message: 'Elemento no encontrado' })
  })
  router.post('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const name = req.body.name
    const password = req.body.password
    const useCase = new UpdateUseCase(repositoryInstance)
    const updatedUser = useCase.update(id, name, password)
    if (updatedUser !== -1) {
      res.send('Elemento actualizado correctamente: ' + JSON.stringify(updatedUser))
    } else res.status(404).json({ message: 'Elemento no encontrado' })
  })
  return router
}
