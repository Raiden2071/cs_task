import { Car } from "./auto";

export interface Owner {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  aCars: Car[];
}