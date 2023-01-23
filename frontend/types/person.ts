import { IProfession } from "./profession";

export interface IPerson{
  _id?: string;
  imageUrl: string;
  name: string;
  phone: string;
  email: string;
  profession: IProfession;
}