import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../config/firebase';
import { CreateRouteType, RouteInfoType } from "../types";
import { sortRoutesByFavorite } from "../helpers";

export const createRoute = createAsyncThunk(
    'routes/createRoute',
    async (route: CreateRouteType) => {
        const newRouteRef = await addDoc(collection(db, "routes"), route);
        const newRoute = {id: newRouteRef.id, ...route};
        return newRoute;
    }
)

export const getRoutes = createAsyncThunk(
    'routes/getRoutes',
    async () => {
        const routes = await getDocs(collection(db, "routes"));
        const mappedData = routes.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        return mappedData;
    }
)

export const deleteRoute = createAsyncThunk(
    'routes/deleteRoute',
    async (id: string) => {
        const routeDoc = doc(db, "routes", id);
        await deleteDoc(routeDoc);
        return id;
    }
)

export const toggleIsFavorite = createAsyncThunk(
    'routes/toggleIsFavorite',
    async (id: string) => {
        const routes = await getDocs(collection(db, 'routes'));
        const routeRef = routes.docs.filter((doc) => doc.id === id)[0];
        if (routeRef) {
            await updateDoc(routeRef.ref, { isFavorite: !routeRef.data().isFavorite })
        }
                 
        return id;
    })

interface InitialStateType {
    routes: RouteInfoType[],
    error: string | undefined
}

const initialState: InitialStateType = {
    routes: [],
    error: undefined
}

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createRoute.fulfilled, (state, action: PayloadAction<RouteInfoType>) => {
                state.routes.push(action.payload)
            })
            .addCase(createRoute.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getRoutes.fulfilled, (state, action) => {
                //@ts-ignore
                state.routes = sortRoutesByFavorite(action.payload)
            })
            .addCase(getRoutes.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteRoute.fulfilled, (state, action: PayloadAction<string>) => {
                state.routes = state.routes.filter((route) => route.id !== action.payload)
            })
            .addCase(deleteRoute.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(toggleIsFavorite.fulfilled, (state, action) => {
                const routeIndex = state.routes.findIndex((route) => route.id === action.payload);
                const updateRoute = state.routes[routeIndex];
                if (routeIndex !== -1) {
                    state.routes[routeIndex] = {...updateRoute, isFavorite: !updateRoute.isFavorite }
                }
                state.routes = sortRoutesByFavorite(state.routes);
            })
            .addCase(toggleIsFavorite.rejected, (state, action) => {
                state.error = action.error.message;
            })
    } 
})

export default routesSlice.reducer;