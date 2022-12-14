import React, { useContext, createContext, useReducer, useEffect } from 'react';
import { getMoviesFetch } from '../api/data';

const DataContext = createContext({});

const initialData = { data: [] };

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        data: action.payload.data,
      };
    case 'UPDATE_MOVIES':
      return {
        ...state,
        data: state.data.map((sMov) =>
          sMov.id === action.payload.data.id ? action.payload.data : sMov,
        ),
      };

    default:
      return state;
  }
}

function DataProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    const downdata = async () => {
      const dataresp = await getMoviesFetch('lego', 1);
      dispatch({
        type: 'SET_MOVIES',
        payload: { data: dataresp },
      });
    };
    downdata();
  }, []);

  const ctx = { data: data.data, dispatch };

  return <DataContext.Provider value={ctx}>{children}</DataContext.Provider>;
}

export function useDataCtx() {
  return useContext(DataContext);
}

export default DataProvider;
