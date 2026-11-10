require('dotenv').config();
const express=require('express'),path=require('path');
const app=express(); app.use(express.static(path.join(__dirname,'public')));
const KEY=process.env.GAMEBRAIN_API_KEY,PORT=process.env.PORT||3000;
async function gb(url){
 if(!KEY) throw new Error('Falta GAMEBRAIN_API_KEY en .env');
 const r=await fetch(url,{headers:{'x-api-key':KEY,'Accept':'application/json'}});
 const d=await r.json().catch(()=>({}));
 if(!r.ok) throw new Error(d.message||d.error||`GameBrain respondió ${r.status}`);
 return d;
}
app.get('/api/search',async(req,res)=>{try{
 const q=(req.query.q||'').trim(); if(!q)return res.json({results:[]});
 const d=await gb('https://api.gamebrain.com/v1/games?query='+encodeURIComponent(q)+'&limit=12');
 res.json({results:d.results||[],total:d.total_results||0});
}catch(e){res.status(500).json({error:e.message})}});
app.get('/api/game/:id',async(req,res)=>{try{res.json(await gb('https://api.gamebrain.com/v1/games/'+encodeURIComponent(req.params.id)))}catch(e){res.status(500).json({error:e.message})}});
app.get('/api/videos',async(req,res)=>{try{
 const q=(req.query.q||'').trim(); if(!q)return res.json({items:[]});
 // YouTube API opcional: si no hay clave, la ficha usa el gameplay que entregue GameBrain
 if(!process.env.YOUTUBE_API_KEY)return res.json({items:[]});
 const r=await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=4&q='+encodeURIComponent(q+' trailer gameplay')+'&key='+encodeURIComponent(process.env.YOUTUBE_API_KEY));
 const d=await r.json(); if(!r.ok)throw new Error(d.error?.message||'YouTube no respondió'); res.json(d);
}catch(e){res.status(500).json({error:e.message})}});
app.listen(PORT,()=>console.log('PLAYDEX listo en http://localhost:'+PORT));
