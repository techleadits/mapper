import { expect, assert } from "chai";
import {mapper} from '../src/index';
import {genReport} from '../src/report';
import * as objectPath from 'object-path';

import * as fs from "fs-extra";

const baseFolder='./tests/entradaMaiorQueSaida';
const entradaPromise = fs.readJSON(`${baseFolder}/entrada.json`);
const saidaPromise =  fs.readJSON(`${baseFolder}/saida.json`);
let entrada = undefined ,saida = undefined;
let entradaSaida = undefined;
before(done => {
    Promise.all([entradaPromise,saidaPromise]).then((array)=>{
        try{
            entradaSaida = mapper(array[0],array[1]); 
            genReport(baseFolder,'entrada-saida',entradaSaida);
        }catch(err){
            done(err);
        }
        done();
    }).catch(err =>{
        done(err)
    })
});

describe('mapper entrada maior que saida: entrada -> saida', function() {
    it('deve ser um objeto válido', () => 
        expect(entradaSaida).exist
    );

    it('deve incluir o "id" conforme o valor da saida', () => 
        expect(objectPath.get(entradaSaida,'id')).to.be.equal(302)
    );

    it('deve atualizar "descricao" para o valor da entrada', () => 
        expect(objectPath.get(entradaSaida,'descricao')).to.be.equal("desc nova")
    );

    it('deve incluir "informação adicional" existente em saida', () => 
        expect(objectPath.get(entradaSaida,'informacaoAdicional')).to.be.equal("info com coluna nova")
    );

    it('deve atualizar objeto "tipo existente" para o valor da entrada', () => 
        expect(objectPath.get(entradaSaida,'tipo')).to.be.equal("tipo novo")
    )

    it('deve incluir objeto "atualizaColuna" para o valor da entrada', () => 
        expect(objectPath.get(entradaSaida,'atualizaColuna')).to.exist
    );

    it('deve atualizar "atualizarColuna.id" para o valor da saida',() => 
        expect(objectPath.get(entradaSaida,'atualizaColuna.id')).to.be.equal(-1)
    );

    it('deve atualizar o valor de "atualizaColuna.desc" para o valor da entrada', () => 
        expect(objectPath.get(entradaSaida,'atualizaColuna.desc')).to.be.equal("sub desc nova")
    );

    it('deve incluir o valor de "atualizaColuna.novaColunaObjeto" para o valor da entrada',() => 
        expect(objectPath.get(entradaSaida,'atualizaColuna.novaColunaObjeto')).to.exist
    );

    it('deve incluir o valor de "atualizaColuna.novaColunaObjeto.id" para o valor da entrada', () => 
        expect(objectPath.get(entradaSaida,'atualizaColuna.novaColunaObjeto.id')).to.be.equal(2)
    );

    it('deve incluir o valor de "atualizaColuna.novaColunaObjeto.desc" para o valor da entrada', () => 
        expect(objectPath.get(entradaSaida,'atualizaColuna.novaColunaObjeto.desc')).to.be.equal("sub sub desc nova")
    );
    // it('has atualizaColuna', function() {
    //     expect(objectPath.get(entradaSaida,'id')).to.be.equal(302);
    // })

    // it('has atualizaColuna', function() {
    //     expect(objectPath.get(entradaSaida,'id')).to.be.equal(302);
    // })
}); 