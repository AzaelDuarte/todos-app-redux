import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export const setFiltro = createAction('[Set Filtro] Set Filtro',
    props<{filtro:filtrosValidos}>()
);
