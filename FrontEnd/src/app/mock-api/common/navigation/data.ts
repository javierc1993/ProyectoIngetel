/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/inicio',
    },
    {
        id: 'uploadFiles',
        title: 'Cargar archivos',
        type: 'basic',
        icon: 'heroicons_outline:upload',
        link: '/subirArchivos',
    },
    {
        id: 'Archivos',
        title: 'Archivos',
        type: 'collapsable',
        icon: 'heroicons_outline:table',
        children:[
            {
                id: 'example',
                title: 'Ver producción',
                type: 'basic',
                link: '/archivoProduccion',
            },
            {
                id: 'billingStatus',
                title: 'Ver facturación',
                type: 'basic',
                link: '/archivoFacturacion',
            },
            {
                id: 'poStatus',
                title: 'Ver estado PO',
                type: 'basic',
                link: '/ordenesCompra',
            }
        ]
        
    },    
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
