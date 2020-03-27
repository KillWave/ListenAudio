
 import axios from 'axios'
/*
   p：页数，从1开始
   n：每一页显示的条数
   w：搜索关键字
 */
export function search(args, callback) {
    axios.get(`/serch?p=${args.p}&n=${args.n}&w=${args.word}`).then(res => {
        callback(res.data);
    })
}