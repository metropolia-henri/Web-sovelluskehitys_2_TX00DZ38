import {RowDataPacket} from 'mysql2';
// interfaces for Animal
interface Animal {
  id: number;
  name: string;
  species: number;
  birthdate: Date;
}

interface GetAnimal extends RowDataPacket, Animal {}

type PostAnimal = Omit<Animal, 'id'>;

export {Animal, GetAnimal, PostAnimal};
