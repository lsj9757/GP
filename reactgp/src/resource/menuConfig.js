const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: '登录',
        key: '/login'
    },
    {
        title: '用户列表',
        key: './userManage'
    },
    {
        title: '客户',
        key: '/client',
        children: [
            {
                title: '登陆',
                key: '/client/clientLogin'
            },
            {
                title: '注册',
                key: '/client/clientRes'
            },
            {
                title: '折线图',
                key: '/client/clientNow'
            },
        ]
    },
    {
        title: '订单管理',
        key: '/order',
        btnList: [
            {
                title: '订单详情',
                key: 'detail'
            }
        ]
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
    },
    {
        title: '权限设置',
        key: '/permission'
    },
];
export default menuList;