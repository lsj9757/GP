const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: '用户列表',
        key: '/userManage'
    },
    {
        title: '订单管理',
        key: '/order',
    },
    {
        title: '员工管理',
        key: '/workerManage'
    },
    {
        title: '车辆地图',
        key: '/bikeMap'
    },
    {
        title: '数据统计',
        key: '/echarts',
        children: [
            {
                title: '各类单车订单分布',
                key: '/echarts/bikeOrder'
            },
            {
                title: '全国城市订单分布',
                key: '/echarts/cityOrder'
            },
            {
                title: '订单时间分布折线',
                key: '/echarts/timeOrder'
            },
        ]
    }
];
export default menuList;