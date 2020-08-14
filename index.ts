import {EventEmitter} from "events";
import fse from "fs-extra"
import path from "path"


export type Filter = (path:string) => boolean | Promise<boolean>;

export type LookupType = "dir" | "file"

export interface LookupOptions {
  filter?: Filter,
  root: string,
  type: LookupType
}

export class Walk extends EventEmitter{

  _filter:Filter = ()=>true;

  constructor(root:string){
    super();
    this.go(root)
    .then(()=>this.emit('end'))
    .catch(err=>this.emit('error', err, root));
  }


  filter = (fn:Filter) => {
    if(fn){
      this._filter = fn;
    }
    return this;
  }

  go = async (directory: string) => {
    let list: string[] = [];
  
    const files = await fse.readdir(directory);
    for (const file of files) {

      const p = path.join(directory, file);
      const stat = await fse.lstat(p)
      const isdir = stat.isDirectory();

      if(await this._filter(p)){
        this.emit(isdir ? 'dir' : 'file', p, stat);
      }

      if (isdir) {
        list = [...list, ...(await this.go(p))];
      }

    }

    return list;
  }

  static go(root:string){
    return new Walk(root);
  }
}

export function lookup(opts: LookupOptions){
  return new Promise<string[]>((resolve, reject)=> {
    const list = [];
    Walk.go(opts.root)
    .filter(opts.filter)
    .on(opts.type, p => list.push(p))
    .on('error', function(err){
      reject(err);
    })
    .on('end', function(){
      resolve(list)
    })
  })
}