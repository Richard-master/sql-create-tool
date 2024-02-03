import {reactive, ref} from "vue";
import {useMD5} from '@/assets/MD5'
import axios from 'axios';
import axiosJsonp from 'axios-jsonp';

const {MD5} = useMD5();
let tableEnglishName = ref('')

var appid = '20240201001956967';
var key = 'Nj4y3qNWlmDspooEatIz';
var salt = (new Date).getTime();
var query = ref('');
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = 'zh';
var to = 'en';
var str;
var sign;

export const useTranslate = () => {
    const translate = function (query){
        console.log(query);
        const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
        const str = appid + query + salt + key;
        const sign = MD5(str);

        return new Promise((resolve, reject) => {
            axios({
                url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
                params: {
                    q: query,
                    appid: appid,
                    salt: salt,
                    from: from,
                    to: to,
                    sign: sign
                },
                adapter: axiosJsonp,
            })
                .then(response => {
                    console.log(response.data);
                    const translatedText = response.data.trans_result[0].dst;
                    resolve(translatedText);
                })
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }

    return { translate };
}
