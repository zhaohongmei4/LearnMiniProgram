//index.js
//获取应用实例
const app = getApp()
console.log(app.globalData.name)
console.log(app.globalData.age)

Page({  //Page叫对象的字面量
  data: {
    motto: 'Hello World',
    students: [

      { id: 1, name: "李四", age: 14 },
      { id: 2, name: "王五", age: 30 },
      { id: 3, name: "张三", age: 30 },
    ],
    counter:0,
    my:"mama",
    userInfo: {},
    list:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    const _this = this;
    wx.request({
      
      url: 'http://123.207.32.32:8000/recommend',
      // success:(res)=>{
      //   console.log(res);
      //   const data=res.data.data.list;
      //   this.setData({
      //     list:data
      //   })
      // }
      //如果不用箭头，而用function  —this跟上面的this用法不一样
      success:function(res){
        const data = res.data.data.list;
        _this.setData({
           list:data
         })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tapName: function (event) {
    console.log(event)
  },
  handleButtonClick(){
    this.setData({//给页面中的值赋值
      counter:this.data.counter+1
    })
    
    
  },
  //监听页面滚动
  onPageScroll(obj){
    //console.log(obj)
  },
  onReachBottom(){
    console.log("=============")
  }
})
