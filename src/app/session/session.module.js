import { SessionController } from './session.ctrl';
import { SessionService } from './session.svc';

let ctrl = SessionController;
let svc = SessionService.factory;

export { ctrl };
export { svc };
