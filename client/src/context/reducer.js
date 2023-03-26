import {
    TEST,
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCESS,
    LOGIN_USER_FAIL,
    SIGNIN_USER_BEGIN,
    SIGNIN_USER_SUCESS,
    SIGNIN_USER_FAIL,
    GET_ALL_POST_BEGIN,
    GET_ALL_POST_SUCESS,
    GET_ALL_POST_FAIL,
    GET_USER_POST_BEGIN,
    GET_USER_POST_SUCESS,
    GET_USER_POST_FAIL,
    DELETE_USER_POST
} from './action'

const reducer =(state,action)=>{
    if(action.type===TEST){
        return {...state}
    }
    if(action.type===GET_USER_BEGIN||action.type===SIGNIN_USER_BEGIN || action.type===GET_ALL_POST_BEGIN || action.type===GET_USER_POST_BEGIN){
        return{
            ...state,
            isLoading:true         
        }
    }
    if(action.type===GET_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
        }
    }
    if(action.type===GET_USER_FAIL || action.type===GET_ALL_POST_FAIL || action.type===GET_USER_POST_FAIL){
        return {
            ...state,
            isLoading:false,
        }
    }
    if(action.type===LOGOUT_USER){
        return {
            ...state,
            user:null,
            isAuthenticated:false
        }
    }
    if(action.type===LOGIN_USER_BEGIN){
        return {
            ...state,
            isLoading: true,
          };
    }
    if(action.type===LOGIN_USER_SUCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,

        }
    }
    if(action.type==LOGIN_USER_FAIL || action.type===SIGNIN_USER_FAIL){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:false,
            user:null,
        }
    }
    if(action.type===SIGNIN_USER_SUCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
        }
    }
    if(action.type===GET_ALL_POST_SUCESS){
        return {
            ...state,
            isLoading:false,
            allPosts:action.payload
        }
    }
    if(action.type===GET_USER_POST_SUCESS){
        return {
            ...state,
            isLoading:false,
            userPosts:action.payload
        }
    }
    if(action.type===DELETE_USER_POST){
        return {
            ...state,
            userPosts:[]
        }
    }
    throw new Error(`no such action : ${action.type}`)
}
export default reducer;