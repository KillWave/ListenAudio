import axios from 'axios';
//g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36

export default axios.get("/recommend",{
    params:{
        _:new Date().getTime(),
        g_tk: 5381,
        uin:0,
        format:"json",
        inCharset:"utf-8",
        outCharset:"utf-8",
        notice:0,
        platform:"h5",
        needNewCode:1,
        tpl:10,
        page:"detail",
        type:"top",
        topid:36

    }
});