import {RowDataPacket} from 'mysql2';
// interfaces for Species
interface Species {
  id: number;
  name: string;
  category: number;
  image: string;
}

interface GetSpecies extends RowDataPacket, Species {}

type PostSpecies = Omit<Species, 'id' | 'image'>;

type ImageSpecies = Omit<Species, 'id'>;

export {Species, GetSpecies, PostSpecies, ImageSpecies};
