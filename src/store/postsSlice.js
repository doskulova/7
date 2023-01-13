import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



export const getPosts = createAsyncThunk(
    'getPosts',
    async function(info, {dispatch, rejectWithValue}) {
        try{
            dispatch(preloaderOn())
            const response = await fetch ('https://jsonplaceholder.typicode.com/posts')
            if(response.status === 200){
                const posts = await response.json()
                dispatch(postsInfo(posts))
            }
            else if(response.status === 404){
                throw 'url not found'
            }
        } catch (e){

            dispatch(setError(e))
        }finally {
            dispatch(preloaderOff())

        }

    }
)

export const getOnePost = createAsyncThunk(
    'getOnePost',
    async function (id,{dispatch, rejectWithValue}){
        const response = await fetch (`https://jsonplaceholder.typicode.com/posts/${id}`)
        const post= await response.json()
        dispatch(onePostInfo(post))
        console.log(post)
    }
)

const postsSlice = createSlice({
    name: 'postsSlice',
    initialState: {
        post:{},
        posts: [],
        preloader: false,
        error: ''
    },
    reducers: {
        postsInfo: (state, action) => {
            state.posts = action.payload
            state.error = ''
        },
        postsDelete: (state, action) => {
            state.posts = []
        },
        preloaderOn:( state, action)=> {
            state.preloader = true
        },
        preloaderOff:( state, action)=> {
            state.preloader = false
        },
        setError: (state, action) => {
            state.error = action.payload
            state.posts = []
        },
        onePostInfo:(state,action) => {
            state.post = action.payload
        }
    }
})

export const {postsInfo , postsDelete, preloaderOn, preloaderOff, setError, onePostInfo} = postsSlice.actions;

export  default  postsSlice.reducer

