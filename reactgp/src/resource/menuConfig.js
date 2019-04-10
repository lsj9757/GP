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
        title: '客户',
        key: '/client',
        children: [
            {
                title: '登陆',
                key: '/client/clientLogin'
            },
            {
                title: '饼图',
                key: '/echarts/pie'
            },
            {
                title: '折线图',
                key: '/echarts/line'
            },
        ]
    },
    {
        title: '城市管理',
        key: '/city'
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
        key: '/user'
    },
    {
        title: '车辆地图',
        key: '/bikeMap'
    },
    {
        title: '图标',
        key: '/echarts',
        children: [
            {
                title: '柱形图',
                key: '/echarts/bar'
            },
            {
                title: '饼图',
                key: '/echarts/pie'
            },
            {
                title: '折线图',
                key: '/echarts/line'
            },
        ]
    },
    {
        title: '权限设置',
        key: '/permission'
    },
];
export default menuList;