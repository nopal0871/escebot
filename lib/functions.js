const fetch = require('node-fetch')
const uploadFile = require('./uploadFile')
const FormData = require('form-data')
const axios = require('axios')


async function whtanime(buffer) {
if (!buffer) throw `Buffer is undefined`
try {
let { url } = (await uploadFile(buffer)).result
const response = await fetch(`https://api.trace.moe/search?anilistInfo&url=${url}`)
if (response.status !== 200) throw { status: response.status, message: response.statusText, data: await response.text() }
json = await response.json()
res = json.result[0]
result = {
title: {
synonyms: res.anilist.synonyms,
english: res.anilist.title.english,
romaji: res.anilist.title.romaji,
native: res.anilist.title.native
},
timestamp: `${new Date(res.from * 1000).toISOString().substr(11, 8)} - ${new Date(res.to * 1000).toISOString().substr(11, 8)}`,
similarity: (res.similarity * 100).toFixed(1) + '%',
video: res.video,
ecchi: res.anilist.isAdult,
episode: res.episode
}
return { status: 200, result }
  
} catch (e) {
  
throw e
}
  
}

async function whatmusic(buffer) {
return new Promise(async (resolve, reject) => {
const bodyForm = new FormData();
bodyForm.append('audio', buffer, 'music.mp3');
bodyForm.append('apikey', 'rikkabotwa');
axios('https://api.zeks.me/api/searchmusic', {
method: 'POST',
headers: {
"Content-Type": "multipart/form-data",
...bodyForm.getHeaders()
},
data: bodyForm
  })
 .then(({data}) =>{
  resolve(data)
 }).catch(() => {
 reject('Lagu Tidak Ditemukan Atau Terjadi Masalah!')
})
})				
}

function runtime(seconds = process.uptime()) { 
seconds = Number(seconds); 
var d = Math.floor(seconds / (3600 * 24)); 
var h = Math.floor(seconds % (3600 * 24) / 3600); var m = Math.floor(seconds % 3600 / 60); 
var s = Math.floor(seconds % 60); 
var dDisplay = d > 0 ? d + (d == 1 ? " Hari,":" Hari,") : ""; 
var hDisplay = h > 0 ? h + (h == 1 ? " Jam,":" Jam,") : ""; 
var mDisplay = m > 0 ? m + (m == 1 ? " Menit,":" Menit,") : ""; 
var sDisplay = s > 0 ? s + (s == 1 ? " Detik":" Detik") : ""; 
return dDisplay + hDisplay + mDisplay + sDisplay; 
}

module.exports = { whatanime: whtanime, whatmusic, runtime }
