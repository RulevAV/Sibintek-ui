export interface User {
  userName: string
}

export interface File{
  id:number
  name:string;
  dateAdd: string;
  sender: string;
}

export interface PageFile{
  count:number,
  page:number,
  files:Array<File>
}

export interface ExistHash {
  message?: boolean
}
