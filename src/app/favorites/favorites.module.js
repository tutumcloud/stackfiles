import { FavoriteController } from './favorites.ctrl';
import { FavoriteService } from './favorites.svc';

let ctrl = FavoriteController;
let svc = FavoriteService.factory;

export { ctrl };
export { svc };
