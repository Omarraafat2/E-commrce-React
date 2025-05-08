// src/features/auth/types.ts

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  