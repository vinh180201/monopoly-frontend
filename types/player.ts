export interface Player {
  id: number;
  name: string;
  avatar: string;
  color: string;
  position: number;
  money: number; 
  properties: number[];
  turnLeft: number;
  isBot: boolean;
  turnInJail: number; 
}