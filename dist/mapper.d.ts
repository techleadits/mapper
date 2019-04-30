interface SpecialMapping {
    [key: string]: string | string[];
}
export declare class Mapper {
    private _specialMappings?;
    constructor(_specialMappings?: SpecialMapping);
    readonly mappings: SpecialMapping;
    map(object1: any, object2: any): any;
}
export declare function classMap(saida: any, entrada: any, force?: boolean): void;
/**
 * @deprecated use map instead
 */
export declare function mapper(saida: any, entrada: any, paths?: any): any;
export declare function map(saida: any, entrada: any, paths?: SpecialMapping): any;
export {};
