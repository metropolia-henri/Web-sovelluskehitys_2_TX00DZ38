import {RowDataPacket} from 'mysql2';
// interfaces for Species
interface Species {
  id: number;
  name: String;
  category: number;
  image: string;
}

interface GetSpecies extends RowDataPacket, Species {}

type PostSpecies = Omit<Species, 'id' | 'image'>;

export {Species, GetSpecies, PostSpecies};
