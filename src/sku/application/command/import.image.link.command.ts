import { ICommand } from '@nestjs/cqrs';
import { SaveImageLinkRequestDTO } from 'src/sku/presentation/dto/save.image.link.request.dto';

export class ImportImageLink implements ICommand {
  constructor(readonly body: SaveImageLinkRequestDTO[]) {}
}
