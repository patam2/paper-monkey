import { CookieData } from "../src/models/authmodels";

declare namespace Express {
    interface Request {
      user?: CookieData;
    }
  }
