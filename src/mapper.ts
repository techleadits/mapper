import * as objectPath from 'object-path';

interface SpecialMapping {
  [key: string]: string | string[];
}

export class Mapper {
  constructor(private _specialMappings?: SpecialMapping) {
  }

  get mappings() {
    return this._specialMappings;
  }

  map(object1: any, object2: any) {
    return mapper(object1, object2, this._specialMappings);
  }
}


export function classMap(saida: any,entrada: any, force: boolean = true,) {
  const newSaida: any = {};
  for (const id in saida) {
    if (saida.hasOwnProperty(id)) {
      newSaida[id] = undefined;
    }
  }
}


/**
 * @deprecated use map instead
 */
export function mapper(saida: any,entrada: any, paths: any = null) {
  return map(entrada, saida, paths);
}


export function map(saida: any = {},entrada: any, paths: SpecialMapping = {}) {
  if (!entrada) {
    return saida;
  }

  // no formato atual, saida e um clone completo do objeto passado por referencia. Não alteraremos o mesmo
  return _pathMap(entrada, saida, paths);
}

function isPrimitive(test: any) {
  return (test !== Object(test));
}

function _paths(saida: any, entrada: any, paths: SpecialMapping) {
  for (const id in paths) {
    if (paths.hasOwnProperty(id)) {
      let pathsPossibilities: string[];
      if (!Array.isArray(paths[id])) {
        pathsPossibilities = [<string>paths[id]];
      } else {
        pathsPossibilities = <string[]>paths[id];
      }
      pathsPossibilities.forEach((element: any) => {
        const data = objectPath.get(entrada, element);
        if (data !== undefined && data !== null) {
          objectPath.set(saida, id, data);
          return;
        }
      });
    }
  }
}

function isFile(obj:any){
  try{
    return obj instanceof window.Blob || obj instanceof window['File'];
  }catch{
    return false;
  }
}

// não ordenado
function keyList(...args: any[]): Set<string> {
  const newArg = new Set<string>()
  args.forEach(arg =>{
    if(arg){
      const keys = Object.keys(arg)
      keys.forEach(key =>{
        newArg.add(key);
      })
    }
  })
  
  return newArg;
}

// ordenado
function objectKeyList(...args: any[]): PathKey {
  const newArg = {};
  args.forEach(arg =>{
    if(arg){}
    const keys = Object.keys(arg)
    keys.forEach(key =>{
      newArg[key] = undefined;
    })
  })

  return newArg;
}

function _object(saida: any, entrada: any, paramList: string[] | Set<string>, force: boolean = true): any {
  
  if(entrada == null || entrada == undefined){
    return saida;
  }

  if(saida == null || saida == undefined ){
    return entrada;
  }

  paramList = keyList(saida,entrada,paramList);
  

  if (isFile(saida)) {
   return entrada;
  } else if (Array.isArray(saida) && saida !== null && Array.isArray(entrada) && entrada !== null) {
    const newSaida = [];
    for (const id in entrada) {
      if (entrada.hasOwnProperty(id) && entrada[id]) {
        newSaida.push(_object(saida[id], entrada[id],undefined, force));
      }
    }
    return newSaida;
  } else if (entrada instanceof Date && saida instanceof Date) {
    return entrada;
  } else if ( typeof saida === 'object' && saida !== null && typeof entrada === 'object' && entrada !== null) {
    const newSaida = {};
    paramList.forEach(id => {
      newSaida[id] = _object(saida[id], entrada[id],undefined, force);
    })
    // for (const id in paramList) {
    //   if (saida.hasOwnProperty(id)) {
    //     newSaida[id] = _object(saida[id], entrada[id], force);
    //   }
    // }
    return newSaida;
  } else if (isPrimitive(saida) && (!saida || typeof entrada === typeof saida )) {
    return entrada;
  } else if (isPrimitive(saida) && (entrada instanceof Date && typeof saida === 'string' || saida instanceof Date && typeof entrada === 'string' )) {
    return entrada;
  } else {
    return saida;
  }
}

// set undefined propertys in saida
function _copyIfNull(saida: any, entrada: any, force: boolean = true): any {


  if (typeof entrada === 'object' && !Array.isArray(entrada)) {
    for (const id in entrada) {
      if (entrada.hasOwnProperty(id)) {
        if(saida == undefined){
          saida = entrada;
        }else{
          const ret = _copyIfNull(saida[id], entrada[id], force);
          if (ret) {
            saida[id] = ret;
          }
        }
      }
    }
  } else if (entrada && (!saida)) {
    return entrada;
  }
}

function _pathMap(entrada: any, saida: any = {}, paths: SpecialMapping = {}) {

  const newEntrada = _object(saida, entrada,undefined, true);
  _copyIfNull(newEntrada, saida, true);
  _paths(saida, newEntrada, paths);
  return newEntrada;
}

interface  PathKey{
  [key: string]: PathKey | string  | undefined
}