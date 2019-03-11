interface SpecialMapping {
    [key: string]: string | string[];
}
export declare class Mapper {
    private _specialMappings?;
    constructor(_specialMappings?: SpecialMapping);
    readonly mappings: SpecialMapping;
    map(object1: any, object2: any): any;
}
export declare function classMap(entrada: any, saida: any, force?: boolean): void;
/**
 * @deprecated use map instead
 */
export declare function mapper(entrada: any, saida: any, paths?: any): any;
export declare function map(entrada: any, saida?: any, paths?: SpecialMapping): any;
export {};
