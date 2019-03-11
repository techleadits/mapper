import { expect, assert } from "chai";
import {mapper} from '../src/index';

import * as fs from "fs-extra";

const baseFolder='./tests/usuario';
const entrada = fs.readJSON(`${baseFolder}/entrada.json`);
const saida =  fs.readJSON(`${baseFolder}/saida.json`);

describe('mapper', function() {
    it('map with inner objects and arrays', function(done) {
        Promise.all([saida,entrada]).then((array)=>{
            let saida = undefined;
            try{
                saida = mapper(array[0],array[1]);
                expect(saida).exist;
                done();

                fs.writeJSON(`${baseFolder}/result/saida-entrada.json`,saida,{spaces:2});
                
            }catch(err){
                done(err);
            }
        }).catch(err =>{
            done(err)
        })
    }); 

    it('map with inner objects and arrays on reverse order', function(done) {
        Promise.all([entrada,saida]).then((array)=>{
            let saida = undefined;
            try{
                saida = mapper(array[0],array[1]);
                expect(saida).exist;
                done();

                fs.writeJSON(`${baseFolder}/result/entrada-saida.json`,saida,{spaces:2});
                
            }catch(err){
                done(err);
            }
        }).catch(err =>{
            done(err)
        })
    }); 
  });

  