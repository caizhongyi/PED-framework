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
