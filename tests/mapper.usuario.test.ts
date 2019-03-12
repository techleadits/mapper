import { expect, assert } from "chai";
import {mapper} from '../src/index';
import * as objectPath from 'object-path';

import * as fs from "fs-extra";

const baseFolder='./tests/usuario';
const entradaPromise = fs.readJSON(`${baseFolder}/entrada.json`);
const saidaPromise =  fs.readJSON(`${baseFolder}/saida.json`);
let entrada = undefined ,saida = undefined;
let entradaSaida = undefined;
before(done => {
    Promise.all([entradaPromise,saidaPromise]).then((array)=>{
        try{
            entradaSaida = mapper(array[0],array[1]); 
            fs.writeJSON(`${baseFolder}/result/entrada-saida.json`,entradaSaida,{spaces:2});
        }catch(err){
            done(err);
        }
        done();
    }).catch(err =>{
        done(err)
    })
});

describe('mapper usuario: entrada -> saida', function() {
    it('mapping is not empty or null', function() {
        expect(entradaSaida).exist;
    })
    it('has cargo with id', function() {
        expect(objectPath.has(entradaSaida,'pessoa.cargo.id')).to.be.true;
    })
    it('has setor with id', function() {
        expect(objectPath.has(entradaSaida,'pessoa.setor.id')).to.be.true;
    })
}); 