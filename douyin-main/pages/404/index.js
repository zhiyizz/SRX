
Page({
  data: {
    errText:''
  },
  onLoad: function (e) {
    this.setData({
      errText:e.err
    })
  }
})