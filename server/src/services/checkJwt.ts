import jwt,{ JwtPayload } from "jsonwebtoken";

export  function checkJwt(accessToken:string): JwtPayload|null{
    try{
        const payload:string|JwtPayload =  jwt.verify(accessToken,<string>process.env.JWT_PRIVATE);
        if(!payload){
            return null;
        }
        if(typeof payload === "string"){
            return null;
        }
        return <JwtPayload>payload;
    }catch(error){
        return null;
    }
}