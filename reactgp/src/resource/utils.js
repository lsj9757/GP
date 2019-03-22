export default {  
    //计算时间
    formateDate(time) {
        if (!time) return ''
        let date = new Date(time)
        return `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page, 
            //这边用的是antd table里的pagination自定义(也可以直接用antd里的pagination插件),接受的是easymock的数据格式
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },
}