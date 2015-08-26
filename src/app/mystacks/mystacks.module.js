import { MyStackController } from './mystacks.ctrl';
import { MyStackService } from './mystacks.svc';

let ctrl = MyStackController;
let svc = MyStackService.factory;

export { ctrl };
export { svc };
