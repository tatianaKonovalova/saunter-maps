import { RouteInfoType } from "../types";

export function sortRoutesByFavorite(routes: RouteInfoType[]) {
    const isFavorite = routes.filter(route => route.isFavorite);
    const notFavorite = routes.filter(route => !route.isFavorite);

    return [...isFavorite, ...notFavorite];
}