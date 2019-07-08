'use strict';

/**
 * API MAP 对象
 * 页面上所有ajax请求统一在这里管理.
 */
export default {
  //本地开发环境,一般可以mock数据
  local: {
    TestUrl: 'http://192.168.1.15:30003/tccore',
    HeadInfo: 'http://192.168.1.15:8080/admin/HeadInfo.json',
    socketUrl:'ws://192.168.1.15:30005/tcws',
    Export:'http://192.168.1.15:8080/ExportGetData.json',
    uploadUrl:'http://192.168.1.15:8080',
    shortUrlPath:'r.tmp8.cn/',
    upLoadvshop:'ws://192.168.1.15:20020'
  },
  //daily环境,可重写base定义的接口
  development: {
    TestUrl: '',
    HeadInfo: '/admin/HeadInfo.json',
    socketUrl:'',
    Export:'',
    uploadUrl:'',
    shortUrlPath:'',
    upLoadvshop:''
  },
  //线上环境
  production: {
    //这里填入线上的host
    _HOST: ''
  }
}