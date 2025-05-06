//import { genSaltSync, hashSync } from "bcrypt-ts";
import { z } from "zod";
import { genSaltSync, hashSync } from 'bcrypt-ts';


const UserCredentialsSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string().min(10, "Password length too low"),
  name: z.string().optional(),
});

type UserCredentials = z.infer<typeof UserCredentialsSchema>;

class BaseForm {
  protected hash_password(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
}

export class LoginUser extends BaseForm {
  public email: string;
  public password: string;

  constructor(credentials: UserCredentials) {
    super();
    const result = UserCredentialsSchema.omit({ name: true }).safeParse(credentials);
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map(e => e.message).join(", ")}`);
    }
    this.email = credentials.email;
    this.password = credentials.password;
  }

  public static createFromForm(formData: unknown) {
    const result = UserCredentialsSchema.omit({ name: true }).safeParse(formData);
    if (!result.success) {
      return { errors: result.error.errors.map(e => e.message) };
    }
    return new LoginUser(result.data);
  }
}

export class SignUpUser extends BaseForm {
  public email: string;
  public name: string;
  public password: string;

  constructor(credentials: UserCredentials) {
    super();
    const result = UserCredentialsSchema.safeParse(credentials);
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map(e => e.message).join(", ")}`);
    }
    this.email = credentials.email;
    this.name = credentials.name ?? "";
    this.password = this.hash_password(credentials.password);
  }

  public static createFromForm(formData: unknown) {
    const result = UserCredentialsSchema.safeParse(formData);
    if (!result.success) {
      return { errors: result.error.errors.map(e => e.message) };
    }
    return new SignUpUser(result.data);
  }
}



export interface CookieData {
    userid: number,
    name: string 
}