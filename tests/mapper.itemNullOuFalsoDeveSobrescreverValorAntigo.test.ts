import { expect, assert } from "chai";
import {mapper, map} from '../src/index';
import {genReport} from '../src/report';
import * as objectPath from 'object-path';

import * as fs from "fs-extra";

const baseFolder='./tests/itemNullOuFalsoDeveSobrescreverValorAntigo';
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



describe('mapper: teste de saída nos casos da entrada ser FALSE, NULL ou UNDEFINED', function() {
    
    it('verificar se existe o arquivo de entrada/saida', function() {
        expect(entradaSaida).exist;
    });

    it('deve transformar o valor de saida para false, caso o valor de entrada seja falso', function() {
        const val = objectPath.get(entradaSaida, 'objeto');
        expect(val.isTrue).to.be.equal(false);
    })
    
    it('deve manter o valor de saída, caso o valor de entrada seja NULL', function() {
        const entrada = {
            'isTrue' : null
        }

        const saida = {
            'isTrue' : false
        }

        const val = map(saida, entrada);
        expect(val.isTrue).to.be.equal(false);
    })

    it('deve manter o valor de saída, caso o valor de entrada seja UNDEFINED', function() {
        const entrada = {
            'isTrue' : undefined
        }

        const saida = {
            'isTrue' : false
        }

        const val = map(saida, entrada);
        expect(val.isTrue).to.be.equal(false);
    })

}); 
