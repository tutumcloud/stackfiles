import { RegistryController } from './registry.ctrl';
import { RegistryService } from './registry.svc';
import { Loader } from './registry-loader';

let ctrl = RegistryController;
let svc = RegistryService.factory;
let loader = Loader.factory;

export { ctrl };
export { svc };
export { loader };
