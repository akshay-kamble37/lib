import {json} from './_session.js';
export default function handler(req,res){if(req.method!=='POST')return json(res,405,{error:'Method not allowed'});return json(res,200,{ok:true},{'Set-Cookie':'sggs_admin_session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; Secure'})}
