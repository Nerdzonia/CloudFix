import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const renewToken = (name, ctx = {}, minutes) => {
    let value = null;
    if(ctx.res){
        value = ctx.req.headers.cookie;
    } else {
        value = loadToken(name);
    }
    
    const { exp, iat, sub, type } = jwtDecode(value);
    let expires = new Date(!exp ? new Date().getTime() + minutes * 60 * 1000 : exp * 1000);
    
    Cookie.set(name, value, { expires, path: '/' });
}

export const setToken = (name, value, minutes) => {
    let expires = new Date(new Date().getTime() + minutes * 60 * 1000);

    Cookie.set(name, value, { expires, path: '/' });
}

export const loadToken = (name) => {
    if(!!name)
        return Cookie.get(name);
    else
        return null;
}

export const removeToken = (name) => {
    Cookie.remove(name);
}

// receive context from getInitialProps(only server side)
export const checkToken = (ctx = {}, token) => {
    // ctx.req.headers.cookie
    if(ctx.req && ctx.req.headers.cookie){
        return ctx.req.headers.cookie.split('=').some(e => e === 'token');
    }
    else{
        return !!loadToken(token);
    }

}