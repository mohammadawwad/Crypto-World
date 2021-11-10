import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'ce36cbfb59msh03c6c477bae5e26p15ecf9jsn460f27813b92'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: newsApiHeaders})

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({newsCatagory, count}) => createRequest(`/news/search?q=${newsCatagory}&safeSearch=Off&textFormat=Raw&reshness=Day&count=${count}`),
        })
    })
})

export const {useGetNewsQuery} = newsApi;