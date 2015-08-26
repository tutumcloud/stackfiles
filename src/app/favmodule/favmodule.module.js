import { FavController } from './favmodule.ctrl';
import { FavService } from './favmodule.svc';

let ctrl = FavController;
let svc = FavService.factory;

export { ctrl };
export { svc };
