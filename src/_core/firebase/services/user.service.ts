import { FirebaseAuthenticationService } from "../base/firebase-authentication.service";
import { UserModel } from "../models/user.model";

export class UserService extends FirebaseAuthenticationService {
  _model = new UserModel();

  constructor() {
    super();
  }
}
