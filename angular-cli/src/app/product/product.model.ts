export class Product{
  constructor(
    public _id:string,
    public name:string,
    public model_no:string,
    public category:string,
    public price:number ,
    public seller:string,
    public size :string[],
    public images:string[],
    public quantity:number
  ){}
}
