import { RESPONSE } from "./db/response";
import { map, of } from "rxjs";

const $res = of(RESPONSE);
let planes: any[] = [];
let coberturas: any[] = [];

const respuesta = $res.pipe(
    map(( res) => res.responseData ),
    map(( { coberturas , caracteristicasOpcion:[ { opciones } ] } ) => ({ coberturas , caracteristicasOpcion:[ ...opciones ] })),
    map(( { coberturas: coverages, caracteristicasOpcion: plans } ) => (  { coverages, plans }  ) )
);



const $plansId = respuesta.subscribe( ( datos ) => {
    planes = datos.plans;
    coberturas= datos.coverages;
});

const $coverturas = of( coberturas);

console.log(planes, coberturas );

// const plansId


//
// console.log($res);
//
// { coberturas: { coberturaId, nombre, descripcion, sumaAseguradaConfig } }

