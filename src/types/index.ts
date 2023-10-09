export interface RouteMarkerType {
    lat: number;
    lng: number;
}

export interface RouteInfoType {
    title: string,
    shortDescription?: string,
    fullDescription: string,
    markers: RouteMarkerType[]
    distance: number,
    isFavorite?: boolean,
    id?: string
}