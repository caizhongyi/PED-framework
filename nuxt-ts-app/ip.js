var os = require('os');
var IPv4,hostName;
hostName=os.hostname();
let ips = os.networkInterfaces()['以太网'];
for(var i=0;i<ips.length;i++){
  if(ips[i].family=='IPv4'){
    IPv4=ips[i].address;
  }
}
console.log('----------local IP: '+IPv4);
console.log('----------local host: '+hostName);
console.log(os.cpus())
for(let item of os.cpus()){
  console.log('CPU' + item.model + ':' + item.speed  + 'hz');
}
//console.log('你的剩余内存/M:'+ os.freemem()/1024/1024 + 'M');
console.log('你的剩余内存:'+ (os.freemem()/os.totalmem() * 100 ) + '%');
