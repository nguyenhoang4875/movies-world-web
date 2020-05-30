export class Description {
  public id: number;
  public timeLimit: string;
  public premiere: Date;
  public artist: string;
  public director: string;
  public content: string;
  public nation: string;

  constructor(init?: Partial<Description>) {
    Object.assign(this, init);
  }
}
