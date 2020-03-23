
export function clickVkey(data){
    const guid = 126548448;
    const songmid = data.songmid;
    const filename = "C400"+data.songmid+".m4a";
    const url = `/vkey?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=${filename}&guid=${guid}`;
    return url;
}