export class User {
  constructor(
    public id: number,
    public userName: string,
    public name: string,
    public email: string,
    public phone: number,
    public isChecked: boolean = false,
  ) {}
}
