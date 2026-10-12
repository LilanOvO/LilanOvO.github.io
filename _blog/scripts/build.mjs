import {spawnSync} from 'node:child_process';
import {existsSync,mkdirSync,writeFileSync,chmodSync} from 'node:fs';
import path from 'node:path';
const version='0.147.9';
const cache=path.resolve('.cache/hugo');
let binary=process.env.HUGO_BIN || 'hugo';
if(spawnSync(binary,['version'],{encoding:'utf8'}).status!==0){
 binary=path.join(cache,'hugo');
 if(!existsSync(binary)){
  const os={linux:'linux',darwin:'darwin'}[process.platform];
  const arch={x64:'amd64',arm64:'arm64'}[process.arch];
  if(!os||!arch)throw new Error('Install Hugo 0.147.9 or newer and add it to PATH.');
  mkdirSync(cache,{recursive:true});
  const url=`https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_${version}_${os}-${arch}.tar.gz`;
  const response=await fetch(url);if(!response.ok)throw new Error(`Hugo download failed: ${response.status}`);
  const archive=path.join(cache,'hugo.tar.gz');writeFileSync(archive,Buffer.from(await response.arrayBuffer()));
  const extract=spawnSync('tar',['-xzf',archive,'-C',cache],{stdio:'inherit'});if(extract.status!==0)process.exit(1);
  chmodSync(binary,0o755);
 }
}
const result=spawnSync(binary,['--minify','--gc','--cleanDestinationDir',...(process.env.SITE_BASE_URL?['--baseURL',process.env.SITE_BASE_URL]:[])],{stdio:'inherit'});
process.exit(result.status ?? 1);
