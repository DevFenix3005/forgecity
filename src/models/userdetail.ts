export interface UserBase {
  email: string;
  username: string;
  fullname: string;
  birthday: string;
  color: string;
}

export interface UserDetail extends UserBase {
  uid: string;
  picUrl?: string;
}
