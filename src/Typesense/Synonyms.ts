import ApiCall from './ApiCall'
import Collections from './Collections'
import { SynonymSchema } from './Synonym'

const RESOURCEPATH = '/synonyms'

export interface SynonymCreateSchema {
  synonyms: string[]
  root?: string
}

export interface SynonymsRetrieveSchema {
  synonyms: SynonymSchema[]
}

export default class Synonyms {
  constructor(private collectionName: string, private apiCall: ApiCall) {}

  async upsert(synonymId: string, params: SynonymCreateSchema): Promise<SynonymSchema> {
    return await this.apiCall.put<SynonymSchema>(this.endpointPath(synonymId), params)
  }

  async retrieve(): Promise<SynonymsRetrieveSchema> {
    return await this.apiCall.get<SynonymsRetrieveSchema>(this.endpointPath())
  }

  private endpointPath(operation?: string) {
    return `${Collections.RESOURCEPATH}/${this.collectionName}${Synonyms.RESOURCEPATH}${
      operation === undefined ? '' : '/' + operation
    }`
  }

  static get RESOURCEPATH(): string {
    return RESOURCEPATH
  }
}
