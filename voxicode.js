const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js")
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = 'eu+' //PREFİXİNİZİ GİRİNİZ.

client.on("ready", async () => {
client.user.setActivity(`+yardım`, { type: "WATCHING" });
  console.log("`");
});

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const De = Linkler.map(Revenge => Revenge.url)
De.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.MessageEmbed()
    .setColor('PURPLE')
    .setDescription(`
    
    **Link Sistemde Zaten Bulunuyor. <a:emoji_4:860313503032934400>** 

    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const success = new Discord.MessageEmbed()
    .setColor('PURPLE')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    
    ** Yazdığınız Site Başarıyla Uptime Sistemimize Eklendi. <a:emoji_4:860313503032934400>**
    `)
    .addField(prefix+'linkler','Komutunu Kullanarak Ekledigin Linkleri Görebilirsin!')//voxic code uptime
    .setTimestamp()
    message.channel.send(success)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const dijitaluptime = new Discord.MessageEmbed()
  .setColor('PURPLE')
  .setDescription(`

  ** Lütfen Bir Uptime Edeceğim URL'yi Girin! <a:emoji_4:860313503032934400>**

  `)
  .setThumbnail(message.author.avatarURL)
  message.channel.send(dijitaluptime)
  })
  }

  



  if(Split[0] == prefix+'say') {
  const say = new Discord.MessageEmbed()
  .setColor('PURPLE')
  .setThumbnail(message.author.avatarURL)
  .setDescription(`
  
** Evolve Uptime  Şuanda  \`${db.get('Proje')}\` URL'yi Sorunsuz Bir Şekilde 7/24 Aktif Tutuyor. <a:emoji_4:860313503032934400>**

**  Evolve Uptime  Bu Linklerden Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tane Senin URl'ni Uptime ediyor!📣 **
`)
  message.channel.send(say)
  }

  if(Split[0] == prefix+'yardım') {
  const pxd = new Discord.MessageEmbed()
  .setColor('PURPLE')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setDescription(`


`)
  .addField('** Evolve Uptime  - Komutları**',`
» <a:ottoman778758782121541632:861726441795747851> **+ekle (Glitch Show Linki)** = Botunuzu 7/24 Aktif Tutar.
» <a:ottoman778758782121541632:861726441795747851> **+linkler** = 7/24 Tuttuğum linkleri gösterir.
» <a:ottoman778758782121541632:861726441795747851> **+say** = Tüm Uptime edilmiş bot sayısını gösterir.
`)
  .addField('**Evolve Uptime Bot - Hakkında**',`
» **Prefixim** = **${prefix}**
» <:ottoman778758782121541632:861724553772400640> [Destek Sunucu](https://discord.gg/czY4HCZKY6)
» <:ottoman778758782121541632:861724553772400640> [Evolve Uptime Botu Ekle](https://discord.com/oauth2/authorize?client_id=798692228624941117&scope=bot&permissions=805314622)
» <:ottoman778758782121541632:861724553772400640> Yapımcım = <@778758782121541632>
» <:ottoman778758782121541632:861724553772400640>**NOT: Botu İster Sunucusunda İster Özelden Kullanabilirsiniz Tercih Sizin**`)

  message.channel.send(pxd)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor('PURPLE').setDescription(`**Hiç link eklememişsin. Üzdün Beni Dostum Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor('PURPLE').setDescription(`**7/24 Aktfi Tuttuğum botlarınızın linklerini daha güvenli olduğunda DM üzerinden gönderdim ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.MessageEmbed().setColor('PURPLE').setDescription(`** Normal Linklerin:** <a:emoji_3:860313279041634314>\n\n\``+Linkleri.join('\n')+`\``).setThumbnail(message.author.avatarURL))
    }


   //voxic code uptime
})




client.on('ready', () => {
client.user.setActivity(`+ekle (Kısa Link)`, { type: '' })
client.user.setStatus('dnd')
  
  //client.user.setStatus('online') -> çevrimiçi -> PARADOX DEVELOPMENT
  //client.user.setStatus('dnd') -> rahatsız etmeyin -> PARADOX DEVELOPMENT
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["509417115439071233"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}
//tokenininizi giriniz.
client.login(process.env.token);


client.on("ready", () => {
  client.channels.cache.get("861662391813406730").join();
})

//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.
//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.
//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.//Voxic tarafından kodlanmıştır.
