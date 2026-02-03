export type IdProductAndIdBox = {
    idProduct: string;
    idBox: string;
}

export type ResponseReport = {
    StartDate: string;
    EndDate: string;
    boxes: BoxesReport[];
};

export type BoxesReport = {
    name: string;
    products: string[];
};
