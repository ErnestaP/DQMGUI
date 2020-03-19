import { SizeProps } from "src/app/interfaces";

export interface ServicesProps {
    title: string;
    href: string;
}

export interface SamplesInterface {
    type: string;
    run: string;
    dataset: string;
    version: string;
    importVersion: string;
}

export interface SampleDataInerface {
    type: string;
    items: SampleDataInerface[];
}

export interface RunInterface {
    id?: string;
    run: string,
    importversion?: string,
    version?: string;
    dataset?: string;
}

export interface ReferenceRowInterface {
    id?: string,
    run: string;
    dataset: string;
    label: string;
}

export interface OverlayRequestProps {
    run: string;
    dataset: string;
    plotName: string;
    size: string;
}

export interface plotInterface {
    name: string;
    size: SizeProps;
    normalize: boolean;
    showStats: boolean;
    jsonRoot: boolean;
}