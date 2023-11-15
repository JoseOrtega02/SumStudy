import { getAllSummariesUC } from 'src/summary/App/UseCases/GetAllSummariesUC'
import createSummaryUC from 'src/summary/App/UseCases/createSummaryUC'
import { deleteSummaryUC } from 'src/summary/App/UseCases/deleteSummaryUC'
import { getSummaryByIdUC } from 'src/summary/App/UseCases/getSummaryBiIdUC'
import { UpdateSummaryUC } from 'src/summary/App/UseCases/updateSummaryUC'
import { Isummary } from 'src/summary/Domain/Entities/Isummary'
import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import { IDSummarySchemaValidation } from 'src/summary/Infra/Validations/IDSchemaValidation'
import { UploadSummarySchemaValidation } from 'src/summary/Infra/Validations/UploadSchemaValidation'

export class SummaryController {
  public async getAllSumaries(repositoryInstance: IsummaryRepo<Summary>) {
    const useCase = new getAllSummariesUC(repositoryInstance)
    const items = useCase.getAllSumaries()
    return await items
  }
  //to do : add pagination, sort and filter
  //to do : add search summaries
  //to do : add summaries by author
  public async getSummaryById(id: string, repositoryInstance: IsummaryRepo<Summary>) {
    const useCase = new getSummaryByIdUC(repositoryInstance)
    const validation = IDSummarySchemaValidation.safeParse({ id })
    if (validation.success) {
      const item = useCase.getSummaryById(validation.data.id)
      return await item
    } else {
      return validation.error
    }
  }
  public async createSummary(data: Isummary, repositoryInstance: IsummaryRepo<Summary>) {
    const validation = UploadSummarySchemaValidation.safeParse(data)

    const useCase = new createSummaryUC(repositoryInstance)
    if (validation.success) {
      const newItem = useCase.cresateSummary(validation.data)
      return newItem
    } else {
      return validation.error
    }
  }

  public async deleteSummary(id: string, repositoryInstance: IsummaryRepo<Summary>) {
    const useCase = new deleteSummaryUC(repositoryInstance)
    const validation = IDSummarySchemaValidation.safeParse({ id })
    if (validation.success) {
      const item = await useCase.deleteSummary(validation.data.id)
      return { afectedRows: item[0].affectedRows }
    } else {
      return validation.error
    }
  }

  public async updateSummary(id: string, name: string, repositoryInstance: IsummaryRepo<Summary>) {
    const validation = IDSummarySchemaValidation.safeParse({ id: id })
    if (validation.success && name) {
      const useCase = new UpdateSummaryUC(repositoryInstance)
      const updatedSummary = await useCase.updateSummary(validation.data.id, name)
      return { afectedRows: updatedSummary[0].affectedRows }
    } else {
      if (!validation.success) {
        return validation.error
      }
    }
  }
}
