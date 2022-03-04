import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

//very important dont forget about this will work on it after frc build season
//need to switch to v2 of the api already changed the key and base url need to change the rest
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'coinranking22a820aba46dc7cd6e2e28af484ba15587c070b42a371444'
}

const baseUrl = 'https://api.coinranking.com/v2';

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),

        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),

        getCryptoHistory: builder.query({
            query: ({coinId, timeperiod}) => createRequest(`coin/${coinId}/history/${timeperiod}`),
        }),

        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        }),
    })
})

export  const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery} = cryptoApi;