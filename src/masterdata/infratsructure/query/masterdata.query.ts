export interface MasterdataQuery {
  findRole: () => Promise<any>;
  findStore: () => Promise<any>;
  findPartner: () => Promise<any>;
}
