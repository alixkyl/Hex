export class Hex {
  public i: number;
  public j: number;
  public q: number;
  public r: number;
  public height: number;
  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
    this.r = i;
    this.q = j - Math.floor(i / 2);
  }
}
