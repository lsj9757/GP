import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

export default {  
    //计算时间
    formateDate(time, type=false) {
        if (!time) return ''
        let date = new Date(time)
        // 格式化
        let y = date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear()
        let m = (date.getMonth()+1) < 10 ? `0${(date.getMonth()+1)}` : (date.getMonth()+1)
        let d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        let s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
        
        return type ? `${h}:${min}:${s}` : `${y}-${m}-${d} ${h}:${min}:${s}`
    },
    //分页
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
            showQuickJumper:true //跳页
        }
    },
    // 分解多个options
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
    // 计时格式
    programTime(time) {
        // 获取时分秒
        let h = parseInt(time/3600)
        let m = parseInt((time - h*3600) / 60)
        let s = time - h*3600 - m*60

        // 格式化
        h = h < 10 ? `0${h}` : h
        m = m < 10 ? `0${m}` : m
        s = s < 10 ? `0${s}` : s

        // 输出时间
        let programTime = `${h}:${m}:${s}`
        return programTime
    }
}