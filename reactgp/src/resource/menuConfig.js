const menuList = [
    {
        title: '首页',
        key: '/admin/home'
    },
    {
        title: '用户列表',
        key: '/admin/userManage'
    },
    {
        title: '订单管理',
        key: '/admin/order',
    },
    {
        title: '员工管理',
        key: '/admin/workerManage'
    },
    {
        title: '车辆地图',
        key: '/admin/bikeMap'
    },
    {
        title: '数据统计',
        key: '/admin/echarts',
        children: [
            {
                title: '各类单车订单分布',
                key: '/admin/echarts/bikeOrder'
            },
            {
                title: '全国城市订单分布',
                key: '/admin/echarts/cityOrder'
            },
            {
                title: '订单时间分布折线',
                key: '/admin/echarts/timeOrder'
            },
        ]
    }
];
export default menuList;