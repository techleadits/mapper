import * as objectPath from 'object-path';
import * as clone from 'clone';
import {HttpParams} from '@angular/common/http';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;

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


export function classMap(entrada: any, saida: any, force: boolean = true,) {
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
export function mapper(entrada: any, saida: any, paths: any = null) {
  return map(entrada, saida, paths);
}


export function map(entrada: any, saida: any = {}, paths: SpecialMapping = {}) {
  if (!entrada) {
    return saida;
  }

  // no formato atual, saida e um clone completo do objeto passado por referencia. Não alteraremos o mesmo
  let newSaida;
  if (!saida) {
    newSaida = {};
  } else {
    newSaida = clone(saida);
  }
  return _pathMap(entrada, saida, paths);
}

export function listOfParameters(obj: any): HttpParams {
  let parameters = new HttpParams();

  function listOfParameters(obj: any, preId: any) {

    if (obj && typeof obj == 'object') {
      for (var keyid in Object.keys(obj)) {
        let id = Object.keys(obj)[keyid];
        if (obj[id] != null && obj[id] != undefined && typeof obj[id] != 'object') {
          parameters = parameters.append(preId + id, obj[id]);
        } else if (Array.isArray(obj[id])) {
          obj[id].forEach((item: any) => {
            listOfParameters(item, preId + id + '.');
          });
        } else {
          listOfParameters(obj[id], preId + id + '.');
        }
      }
    }

    return parameters;
  }

  return listOfParameters(obj, '');
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

function _object(saida: any, entrada: any, force: boolean = true): any {
  if (Array.isArray(saida) && saida !== null) {
    const newSaida = [];
    for (const id in entrada) {
      if (entrada.hasOwnProperty(id)) {
        if (entrada[id]) {
          newSaida.push(_object(saida[id], entrada[id], force));
        }
      }
    }
    return newSaida;
  } else if (entrada instanceof Date && saida instanceof Date) {
    return entrada;
  } else if (typeof saida === 'object' && saida !== null) {
    const newSaida = {};
    for (const id in saida) {
      if (saida.hasOwnProperty(id)) {
        newSaida[id] = _object(saida[id], entrada[id], force);
      }
    }
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
        const ret = _copyIfNull(saida[id], entrada[id], force);
        if (ret) {
          saida[id] = ret;
        }
      }
    }
  } else if (entrada && (!saida)) {
    return entrada;
  }
}

function _pathMap(entrada: any, saida: any = {}, paths: SpecialMapping = {}) {

  const newEntrada = _object(entrada, saida, true);
  _copyIfNull(newEntrada, saida, true);
  _paths(saida, newEntrada, paths);
  return newEntrada;
}
