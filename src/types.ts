export type InternetConnection = {
  connectionType: string;
  isConnected: boolean;
};

export type User = {
  nickname: string;
  age: number;
};

export type UnknownAction = {
  type: string;
  payload?: any;
};
