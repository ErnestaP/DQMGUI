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
    run: string,
    importversion: string,
    version: string;
}