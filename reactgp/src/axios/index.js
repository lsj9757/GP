import JSONP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JSONP(options.url, {
                param:'callback'
            }, function(err, response){
                if (response.status === '1') {
                    resolve(response)
                } else {
                    reject(response.message)
                }
            })
        })
    }
    static ajax(options, state=false){
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = state ? 'https://www.easy-mock.com/mock/5c9235393cffed483bb0a20e/mockapi' : 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'; //这边用的是easymock的数据格式
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200){
                    let res = response.data;
                    if (res.code == 0){ //这边用的是easymock的数据格式
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}