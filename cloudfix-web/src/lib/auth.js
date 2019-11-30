import Route from 'next/router';

export const redirect = (ctx = {}, route) => {
    if(ctx.res){
        ctx.res.writeHead(302, {
            Location: route,
        });
        ctx.res.end();
    }else
        Route.push(route);
}