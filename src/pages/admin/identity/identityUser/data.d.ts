import { ExtensibleFullAuditedEntityDto } from '@potatoabo/types'


export interface IdentityUserDto extends ExtensibleFullAuditedEntityDto<string>{
  id:string;

}
