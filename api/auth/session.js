import {getCookie,verifyToken,json} from './_session.js';
export default function handler(req,res){const s=verifyToken(getCookie(req,'sggs_admin_session'));return s?json(res,200,{authenticated:true,user:{id:'u1',name:'Library Admin',email:s.email,role:'admin'}}):json(res,401,{authenticated:false})}
