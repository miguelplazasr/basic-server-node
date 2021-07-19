import {RESPONSE} from "./db/response";
import {flatMap, from, groupBy, interval, map, mergeAll, mergeMap, of, pluck, reduce, take, toArray, zip} from "rxjs";

const res$ = of(RESPONSE);

let planes: any[] = [];
let coberturas: any[] = [];
let formatPlans: exportModel[] = [];
let finalPlan: exportModel[] = [];

const respuesta = res$.pipe(
    map((res) => res.responseData),
    map(({coberturas, caracteristicasOpcion: [{opciones}]}) => ({coberturas, caracteristicasOpcion: [...opciones]})),
    map(({coberturas: coverages, caracteristicasOpcion: plans}) => ({coverages, plans}))
);


const plansId$ = respuesta.subscribe((datos) => {
    planes = datos.plans;
    coberturas = datos.coverages;
});

const coverturas$ = of(coberturas);

const resFrmt: exportModel[] = [];

const casi$ = coverturas$.pipe(
    // map<any, exportModel[]>((cover) => {
    //     return cover.map(({nombre, descripcion, sumaAseguradaConfig: {valores: val}}) => {
    //
    //
    //         val.map((valor) => resFrmt.push( {name: nombre, description: descripcion, planId: valor.planPaqueteId, txt: valor.textoAsociado} ));
    //
    //         // return resFrmt;
    //
    //     })
    //
    //
    // }),
    // reduce(((acc, value) => acc.concat(value)))
).subscribe((cover) => {
    return cover.map(({nombre, descripcion, sumaAseguradaConfig: {valores: val}}) => {
        val.map((valor) => resFrmt.push({
            name: nombre,
            description: descripcion,
            planId: valor.planPaqueteId,
            txt: valor.textoAsociado
        }));
    })
});


console.log(resFrmt);


of(resFrmt).pipe(
    mergeMap( res => res),
    groupBy( plan => plan.planId ),
    mergeMap( group => zip(of(group.key), group.pipe(toArray())))
).subscribe(console.log);

//ToDo: Funciona pero hay que revisar
// from(resFrmt).pipe(
//     groupBy(plan => plan.planId),
//     mergeMap(group => group.pipe(toArray()))
//     // map((data) => groupBy(data, item => item.planId)
// )
//     .subscribe(console.log);

//
// const formatPlans$ = of(formatPlans);
//
//
// formatPlans$.pipe(
//
//     reduce((acc, val) => acc.concat(val))
//
// ).subscribe(console.log)

// formatPlans$.pipe(
//     mergeMap( (pl) => of(pl).pipe(
//         reduce( (pln, val) => pln.concat(val))
//     ))
// ).subscribe({
//     next: val => console.log('next:', val),
//     complete: () => console.log('Complete')
// });


// console.log(resFrmt);

// const plansId


//
// console.log($res);
//
// { coberturas: { coberturaId, nombre, descripcion, sumaAseguradaConfig } }

export interface exportModel {

    name: string;
    description: string;
    planId: number;
    txt: string;

}
