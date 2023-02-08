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
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface UserContextInterface {
  user: User;
  updateUser: (updatedObj: User) => void;
}

export interface Schedule {
  id: number | null;
  userid: string;
  dayOffs: string;
}
