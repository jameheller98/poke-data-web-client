export interface IRules {
  required?: boolean;
  notBlank?: boolean;
  min?: number;
  max?: number;
  matchPassword?: IMatchPassword;
}

export interface IMatchPassword {
  active: boolean;
  valueConfirm: string;
}

export interface IValid {
  valid: boolean;
  message: string;
}
