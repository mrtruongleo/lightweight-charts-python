import { Logical, Time } from '@mrtruongleo/lightweight-charts';

export interface Point {
  time: Time | null;
  logical: Logical;
  price: number;
}

export interface DiffPoint {
  logical: number;
  price: number;
}
