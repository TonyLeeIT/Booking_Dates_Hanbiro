export enum Sign {
  Up = "Up",
  In = "In",
}

export interface User {
  id: number | null;
  userid: string;
  password: string;
  displayName: string;
  photoUrl: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface AuthResponseContextInterface {
  authResponse: AuthResponse | null;
  updateAuthResponse: (updatedObj: AuthResponse) => void;
}
