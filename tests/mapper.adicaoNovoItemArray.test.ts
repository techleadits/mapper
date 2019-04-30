import { expect, assert } from "chai";
import {mapper, map} from '../src/index';
import {genReport} from '../src/report';
import * as objectPath from 'object-path';

import * as fs from "fs-extra";

const baseFolder='./tests/adicaoNovoItemArray';
const entradaPromise = fs.readJSON(`${baseFolder}/entrada.json`);
const saidaPromise =  fs.readJSON(`${baseFolder}/saida.json`);
let entrada = undefined ,saida = undefined;
let entradaSaida = undefined;
before(done => {
    Promise.all([saidaPromise,entradaPromise]).then((array)=>{
        try{
            entradaSaida = map(array[0],array[1]); 
            genReport(baseFolder,'entrada-saida',entradaSaida);
        }catch(err){
            done(err);
        }
        done();
    }).catch(err =>{
        done(err)
    })
});

describe('mapper adicionar novo item no array: entrada -> saida', function() {
    it('mapping is not empty or null', function() {
        expect(entradaSaida).exist;
    });

    it('ver se item novo existe na saida', function() {
        const val =objectPath.get(entradaSaida,'arr.1');
        expect(val).to.be.equal("novo");
    })
    // it('has cargo with id', function() {
    //     expect(objectPath.has(entradaSaida,'pessoa.cargo.id')).to.be.true;
    // })
    // it('has setor with id', function() {
    //     expect(objectPath.has(entradaSaida,'pessoa.setor.id')).to.be.true;
    // })
}); 