'use strict';
import reqwest from 'reqwest';
import $ from 'jquery';


import apimap from 'utils/apimap';

let apienv = window.apienv || 'local';

/*apienv的可选值 local,development,production */
let Tools = {

  str: function() {
    var str = '<div class="mask"></div><div class="spinner"><div class="spinner-container container1"><div class="circle1">&nbsp;</div><div class="circle2">&nbsp;</div><div class="circle3">&nbsp;</div><div class="circle4">&nbsp;</div></div>' +
      '<div class="spinner-container container2"><div class="circle1">&nbsp;</div><div class="circle2">&nbsp;</div><div class="circle3">&nbsp;</div><div class="circle4">&nbsp;</div></div>' +
      '<div class="spinner-container container3"><div class="circle1">&nbsp;</div><div class="circle2">&nbsp;</div><div class="circle3">&nbsp;</div><div class="circle4">&nbsp;</div></div></div>';
    return str;
  },

 
  goPath: function(path, res) {
    if (path) {
      if (res) {
        window.location.href = LinkTools[path] + res
      } else {
        window.location.href = LinkTools[path];
      }

    }
  },
  formatNum: function(num,toFixed) {
    //每隔三位小数加逗号
    if (!num || num == '' || num == '0' || num == 0) {
      return 0;
    }
    if(!toFixed){
      toFixed = 0;
    }
    //console.log(toFixed)
    var result = '',
      floatNum = '';
    if (num.toString().indexOf('.') > 0) {
      num = num.toFixed(toFixed);
    }

    var nums = num.toString().split('.')[0];
    if (num.toString().split('.')[1]) {
      floatNum = '.' + num.toString().split('.')[1];
    }


    while (nums.length > 3) {
      result = ',' + nums.slice(-3) + result;
      nums = nums.slice(0, nums.length - 3);
    }
    if (nums) {
      result = nums + result + floatNum;
    }
    return result;
  },
  DateDiff: function(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式 
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式 
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
    return iDays
  },
  aClickGo:function(href,target){
    var a = document.createElement('a');
    var nodeName = 'GO_ALIPAY_AUTO';
    a.style.display = 'none';
    a.setAttribute('href', href);
    a.setAttribute('target', target || '_blank');
    a.setAttribute('id', nodeName);
    // 防止反复添加
    if(!document.getElementById(nodeName) || document.getElementById(nodeName).length == 0){
      document.body.appendChild(a);
    }
    a.click();
    if(document.getElementById(nodeName)){
      document.body.removeChild(document.getElementById(nodeName));
    }
  },
  ajax: function(param, suc, err) {
    /*在demo html中修改window.apienv实现不同环境的数据接口切换*/
    param.url = apimap[apienv][param.api];
    param.type = 'json';
    var startTime = new Date().getTime();
    return reqwest(param).then((res) => {
      var endTime = new Date().getTime();
      if (res.code === 200) { //默认接口请求成功的判断条件，可以自行修改,也可以按照自己约定来做判断
        suc && suc(res);
        console.log(`接口请求成功`, res);
      } else { //在这里可以统一自定义错误返回码异常处理
        //TODO:接口统一异常处理
        err && err(res);
        console.error(`接口请求失败`, res);
      }
      return res;
    }).catch((error) => { //接口异常处理，返回response.status 非20x或者1223时会进入这里
      var endTime = new Date().getTime();
      throw new Error(`接口${param.api}调用失败！服务端异常！${error.message}`);
    })
  },
  totalDates: function() {
    let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      d = new Date(year, month, 0),
      dayList = [];
    for (let i = 1; i <= d.getDate(); i++) {
      dayList.push(i <= 9 ? '0' + i + '号' : i + '号')
    }
    return dayList;
  },
  getArrays: function(keys, day, data) {
    //console.log(keys,data)
    let result = [],
      self = this,
      newResult = [];
    if (keys && data) {
      data = this.arrarSort(data);
      data.map((item, index) => {
        //console.log( new Date(item.countTime).getDate() - 1,item.countTime)
        result.push({
          val: item[keys],
          day: new Date(item.countTime).getDate(),
          index: index
        })
      });
    }
    //console.log(data)
    if (result.length > 0) {
      for (let i = 0; i < day; i++) {
        newResult[i] = 0;
      }
      //console.log(result)
      result.map(function(v, k) {
        //console.log(v)
        newResult[v.index] = v.val;
      });
    };
    //console.log(newResult)
    return newResult
  },
  getKeyArrays: function(key, val, data) {
    //console.log(key,val,data)
    let result = null;
    if (key && val && data) {
      data.map((item, index) => {
        if (item[key] == val) {
          //console.log(index)
          result = data[index]
        }

      });
    }

    return result

  },
  ojax: function(cmd, params, url) {
    
    let v, urlMap = '';
    if (cmd && params && url) {
      for (v in params) {
        urlMap+='&'+v+'='+encodeURI(params[v]);
      }
      window.open(apimap[apienv][url] + '?cmd=' + cmd + '&sellerId=' + this.sellerId()+urlMap);
    }
    
  },
  getVals: function(val,key, data) {
    //console.log(key,val,data)
    let result = 0;
    if (key && data) {
      data.map((item, index) => {
        //console.log(item)
        if(val == item[key]){
          result = item['num'] || 0;
        }
      });
    }

    return result

  },
  arrarSort: function(array) {
    //条件组排序
    let i = 0,
      len = array.length,
      j, arr;
    for (i = 0; i < len; i++) {
      for (j = 0; j < len; j++) {
        if (new Date(array[i].countTime).getTime() < new Date(array[j].countTime).getTime()) {
          arr = array[j];
          array[j] = array[i];
          array[i] = arr;
        }
      }
    }
    return array;
  },

  arrarKey: function(key, array, boolean) {
    //条件组排序 boolean[true]降序
    let i = 0,
      len = array.length,
      j, arr;
    if (key && array) {
      for (i = 0; i < len; i++) {
        for (j = 0; j < len; j++) {
          if (boolean) {
            if (array[i][key] > array[j][key]) {
              arr = array[j];
              array[j] = array[i];
              array[i] = arr;
            }
          } else {
            if (array[i][key] < array[j][key]) {
              arr = array[j];
              array[j] = array[i];
              array[i] = arr;
            }
          }

        }
      }
    }
    return array;
  },
  stringToObject: function(data) {
    var results = null,
      index = 0;
    if (data && data != '' && data != '""') {
      results = data;
    } else {
      return;
    }
    while (typeof results === 'string') {
      index++;
      if (results.indexOf('{') > -1 && results.lastIndexOf('}') > -1) {
        results = JSON.parse(results);
      } else {
        break;
      }
    };
    return results;
  },
  pjax: function(cmd, params, url, method, async) {
    /*
     *   cmd:命令制;
     *   params:入参
     *   //callback:成功回调
     *   method:[post || get]
     *   url:线上接口config
     *   eg：Tools.pjax(cmd,params,...).then(fn(res),fn(error))
     **/
    //console.log(cookie.get('tc_seller_id'))
    //console.log(this.dds('rHDr2J58gHbmkgCzVIpPEA=='))
    //console.log(this.ees('749864544'))
    // if(true){
    //   this.intercept();
    // }
    

    var self = this,
      times = new Date().getTime(),
      snew;
    snew = url ? apimap[apienv][url] : apimap[apienv]['TestUrl'];
    snew = snew + '?cmd=' + cmd + '&sellerId=' + self.sellerId() + '&_t=' + times;
    //console.log(snew)
    let keys = Object.keys(params);
    if (keys.length == 1) {
      let name = keys[0];
      
      if(name != 'sellerId'){
        params.sellerId =  self.sellerId();
      }else if ((!params[name] || !params[name].sellerId) && typeof(params[name]) === 'object') {
        params[name].sellerId = self.sellerId();
      }
    }else{
      if (!params.sellerId) {
        params.sellerId = self.sellerId();
      }
    }
    //console.log(params)
    // if(!params.sellerId){
    //   params.sellerId = self.sellerId();
    // }
    //console.log(params); 
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: snew,
        type: method || 'post',
        data: JSON.stringify(params),
        xhrFields: {
          withCredentials: true
        },
        async: async || true,
        beforeSend: function(diss) {
          //禁用提交按钮
          if ($('.spinner').length == 0) {
            $('body').append(self.str())
          }
        },
        success: function(res) {
          $('.spinner,.mask').remove();
          let req = self.stringToObject(res);
          if(req.stat == 'noPhoneAndSign'){
              if(self.temporary.sign == ''){
                  self.temporary.sign = store.get('Tc_User_ShopName');
              }
              if(req.seller){
                self.intercept(req.seller.shopName || req.seller.sellernick || '无');
              }else{
                self.intercept(store.get('Tc_User_ShopName') || '无');
              }
              
              //console.log('此处接入首次登陆校验...',req.stat);
          }
          resolve(req);
        },
        error: function(error) {
          if (reject) {
            reject(error)
          }
        }
      })
    })
  },
  
  getDays: function(day) {
    var dd = new Date();
    dd.setDate(dd.getDate() + day); //获取day天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    if (day == 0) {
      return y + "-" + m + "-" + d + ' 23:59:59';
    } else {
      return y + "-" + m + "-" + d + ' 00:00:00';
    }

  },
  getDay: function(day) {
    var today = new Date();
    var seconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(seconds);
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + "年" + tMonth + "月" + tDate + '日';
  },
  doHandleMonth: function(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  },
  getDaysLine: function(day) {
    var result = [],
      self = this;
    for (var i = 0; i < day; i++) {
      result.unshift(self.getDay(-i));
    };
    return result;
  },
  httpString: function(s) {
    //var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    //var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;
    //var reg = /((https?|ftp|file):\/\/|)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    //var reg= /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
    //v = v.replace(reg, "<a href='$1$2'>$1$2</a>"); //这里的reg就是上面的正则表达式
    //s = s.replace(reg, "$1$2"); //这里的reg就是上面的正则表达式
    var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
    s = s.match(re);
    //console.log(s)
    return (s)
  },
  IsURL: function(strUrl) {
    var strRegex = "((https|http|ftp|rtsp|mms)?://)" +
      "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
      +
      "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
      +
      "|" // 允许IP和DOMAIN（域名）
      +
      "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
      +
      "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
      +
      "[a-z]{2,6})" // first level domain- .com or .museum 
      +
      "(:[0-9]{1,4})?" // 端口- :80 
      +
      "((/?)|" // a slash isn't required if there is no file name 
      +
      "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)";
    var re = new RegExp(strRegex);
    //re.test()


    if (re.test(strUrl)) {
      //console.log(re.test(strUrl))
      if (strUrl.match(re)) {
        var urlMap = strUrl.match(re)[0];
        //console.log(urlMap,strUrl,strUrl.indexOf(urlMap)-1,strUrl.indexOf(urlMap)+urlMap.length+1)
        var mbURL = strUrl.slice(strUrl.indexOf(urlMap) > 0 ? strUrl.indexOf(urlMap) - 1 : strUrl.indexOf(urlMap), strUrl.indexOf(urlMap) + urlMap.length + 1);
        var regs = /^\s{1}((.|\n)*\S)?\s{1}$/;
        var flag = regs.test(mbURL);
        return {
          isContainUrl: true,
          isContainSpace: flag,
          isMatchUrl: mbURL,
          isMatch: urlMap
        };
      }


    } else {
      return {
        isContainUrl: false
      };
    }
  },
  unique: function(arr) {
    var len = arr.length;
    arr.sort();
    for (var i = len - 1; i > 0; i--) {
      if (arr[i] == arr[i - 1]) {
        arr.splice(i, 1);
      }
    }
    arr.map((item,index)=>{
      if (item == '' || item == 0) {
        arr.splice(index, 1);
      }
      
    })
    return arr;
  },
  isPhoneNumber: function(phone) {
    if (!phone || phone == '') {
      return {
        isSuccess: true,
        length: 0
      };
    }
    var self  = this;
    var phones = phone.trim().replace(/(\”)|(\“)|(\")|(\')/g, '');
    phones = phones.replace(/(\r\n)|(\n)|(\，)|(\/)/g, ',');
    var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //验证规则
    //console.log(phones)
    if (phones == '') {
      return {
        isSuccess: true,
        length: 0
      };
    } else {
      var flag = false;
      var l = 0;
      try {
        if (phones) {
          //console.log(phones)
          phones.split(',').forEach(function(v, i) {
            //console.log(v,reg.test(v))
            if (!reg.test(v) && v != '') {
              flag = false;
              return {
                isSuccess: flag,
                length: l
              };
              foreach.break = new Error("Stop");
            } else {
              if (v != '') {
                l++;
              }

              flag = true;
              //console.log('号码正确')
              return {
                isSuccess: flag,
                length: self.unique(phones.split(',')).length
              };
              //foreach.break = new Error("success")
            }
          })

        } else {
          flag = false;
        };

      } catch (e) {
        //console.log(e)
        if (e.message === "foreach is not defined") {
          return {
            isSuccess: false,
            length: 0
          };
        } else throw e;
      }
      return {
        isSuccess: flag,
        length: self.unique(phones.split(',')).length
      };

    };
  },
  isPhone: function(phone) {
    //console.log(this.state.blackType)
    if (!phone || phone == '') {
      return true;
    }

    var phones = phone.trim().replace(/(\”)|(\“)|(\")|(\')/g, '');
    phones = phones.replace(/(\r\n)|(\n)|(\，)|(\/)/g, ',')
    var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //验证规则
    //console.log(phones)
    if (phones == '') {
      return true;
    } else {
      var flag = false;
      try {
        if (phones) {
          phones.split(',').forEach(function(v, i) {
            //console.log(v,i)
            if (!reg.test(v) && v != '') {
              flag = false;
              return false;
              foreach.break = new Error("Stop");
            } else {
              flag = true;
              //console.log('号码正确')
              return true;
              //foreach.break = new Error("success")
            }
          })
        } else {
          flag = false;
        };

      } catch (e) {
        //console.log(e)
        if (e.message === "foreach is not defined") {
          return false;
        } else throw e;
      }
      return flag;

    };
  },
  isDoubleNumber: function(str, isBoolean) {
    //isBoolean[true仅整数,false浮点型整数]
    var reg, Booleans = [],
      tags = false;
    if (str && str != '') {
      if (isBoolean) {
        reg = /(^[0-9]\d*$)/;
      } else {
        reg = /(^[0-9]+\.?[0-9]*$)/;
      };
    } else {
      return false;
    }
    //console.log(reg.test(str[0] * 1))
    if (typeof(str) == 'object') {
      str.forEach(function(v, k) {
        Booleans[k] = reg.test(v * 1)
      });
      if (Booleans.join(',').indexOf('false') < 0) {
        tags = true;
      }
    } else {
      tags = reg.test(str * 1);
    }

    return tags;
  },
  insertAtCursor: function(myField, myValue) {
    //IE support
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      //sel.select();
      myField.focus();
    }
    //MOZILLA/NETSCAPE support 
    else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      // save scrollTop before insert www.keleyi.com
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
      /* if (restoreTop > 0) {
           myField.scrollTop = restoreTop;
       }*/
      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
      myField.scrollTop = restoreTop;
    } else {
      myField.value += myValue;
      myField.focus();
    }

    return myField.value
  },

  isLocal: function() {
    var host = window.location.host;
    return host.indexOf('127.0.0.1') > -1 || host.indexOf('localhost') > -1 || host.indexOf('192.168.1.15') > -1;
  },
  getUrlParam: function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.href);
    return results == null ? "" : decodeURIComponent(results[1]);
  },
  evalDate: function(str) {
    if (str == 'undefined' || str == undefined || str == null) {
      return null;
    } else {
      var tmp = /\d+(?=\+)/.exec(str);
      return tmp[0] * 1;
    }

  },

  isArray: function(object) {
    return object instanceof Array;
  },
  isWindow: function(obj) {
    return obj != null && obj == obj.window;
  },
  isDocument: function(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
  },
  isObject: function(obj) {
    return this._type(obj) == 'object';
  },
  isFunction: function(fn) {
    return this._type(fn) == 'function';
  },
  isPlainObject: function(obj) {
    return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  },
  _type: function(obj) {
    var class2type = {};
    var toString = class2type.toString;
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || 'object';
  },
  isString: function(str) {
    return typeof str === 'string';
  },
  extend: function(target, source) {
    target = target || {};
    source = source || {};
    for (var key in source) {
      target[key] = source[key];
    }
    return target;

  },
  namespace: function(name) {
    return function(v) {
      return name + '-' + v;
    };
  },
  formatDate: function(date, fmt) {
    //console.log(date)
    if (this.isObject(date) == false || !date) {
      return date;
    }
    date = new Date(date);
    if (fmt === undefined) {
      fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;

  },
  getDateMs: function(date) {
    //console.log(date)
    if (date) {
      return new Date(this.formatDate(date)).getTime();
    }
  },
  getDateMsNull: function(date) {
    //console.log(date)
    if (date) {
      return new Date(this.formatDate(date)).getTime();
    } else {
      return null
    }
  },
  randomNum: function(text) {
    if(!text){
        text = '营销任务'
    }
    const nowData = new Date();
    let tMonth = nowData.getMonth() + 1,
      ttoday = nowData.getDate();
    if (tMonth < 10) {
      tMonth = '0' + tMonth;
    }
    if (ttoday < 10) {
      ttoday = '0' + ttoday;
    }

    let mm = Math.random();
    let six = "";
    if (mm > 0.1) {
      six = Math.round(mm * 1000000);
    } else {
      mm += 0.1;
      six = Math.round(mm * 1000000);
    }
    six = text + nowData.getFullYear() + tMonth + ttoday + six;
    return six;
  },
  randomNumber: function() {
    const nowData = new Date();
    let tMonth = nowData.getMonth() + 1,
      ttoday = nowData.getDate();
    if (tMonth < 10) {
      tMonth = '0' + tMonth;
    }
    if (ttoday < 10) {
      ttoday = '0' + ttoday;
    }

    let mm = Math.random();
    let six = "";
    if (mm > 0.1) {
      six = Math.round(mm * 1000000);
    } else {
      mm += 0.1;
      six = Math.round(mm * 1000000);
    }
    // six =  nowData.getFullYear() + tMonth + ttoday + six;
    return six;
  },
  seq: function() {
    return Math.ceil(Math.random() * 1000000);
  },
  sellerId: function() {
    if(!cookie.get('tc_seller_id') || cookie.get('tc_seller_id') == '' ){
      if(this.isLocal()){
        cookie.set('tc_seller_id','191771208')
      }else{
        console.log('非法登陆...');
      }
      
      return '0';
    }else{
      return cookie.get('tc_seller_id') ? cookie.get('tc_seller_id') * 1 : 0;
    }
    
  }

};
export const ajax = Tools.ajax.bind(Tools);
export const pjax = Tools.pjax.bind(Tools);
export const formatNum = Tools.formatNum.bind(Tools);
export const totalDates = Tools.totalDates.bind(Tools);
export const getArrays = Tools.getArrays.bind(Tools);
export const getKeyArrays = Tools.getKeyArrays.bind(Tools);
export const isDoubleNumber = Tools.isDoubleNumber.bind(Tools);


export const getDaysLine = Tools.getDaysLine.bind(Tools);
export const insertAtCursor = Tools.insertAtCursor.bind(Tools);
export const getDays = Tools.getDays.bind(Tools);
export const stringToObject = Tools.stringToObject.bind(Tools);
export const getUrlParam = Tools.getUrlParam.bind(Tools);
export const formatDate = Tools.formatDate.bind(Tools);
export const nameSpace = Tools.namespace.bind(Tools);
export const randomNum = Tools.randomNum.bind(Tools);
export const evalDate = Tools.evalDate.bind(Tools);
export const randomNumber = Tools.randomNumber.bind(Tools);
export const sellerId = Tools.sellerId.bind(Tools);
export const IsURL = Tools.IsURL.bind(Tools);
export default Tools;