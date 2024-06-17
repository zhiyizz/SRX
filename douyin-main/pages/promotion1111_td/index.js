// /Users/zhangfutian/Documents/topsrx/抖音/小程序/别克抖音小程序/pages/testdrive/testdrive.js
Page({
  data: {
    kv:'https://m.buick.com.cn/douyinapp/promotion1111_2/testdrive/kv.jpg?'+new Date().getTime(),
    td:'https://m.buick.com.cn/douyinapp/promotion1111_2/testdrive/td.jpg?'+new Date().getTime(),
    locationData:null,
    series:[],
    seriesIdx:0,
    dealer:null,
    province:null,
    provinceIdx:1,
    city:null,
    cityIdx:0,
    district:null,
    districtIdx:null,
    filteredIdx:0,
    check:false,
    currentLocation:{
    province: "北京",
    city:"北京"
    },
    name:null,
    mobile:null,
    privacy:false,
  },
   bindSeriesChange(e) {
     this.setData({
       seriesIdx: e.detail.value,
     });
   },
   bindPrivacy(){
    this.setData({
      privacy:!this.data.privacy
    })
   },
   processDealerData(data, isService = false, isHotline = false) {
    function sortById(a, b) {
      return a.id - b.id
    }
    if (!data) {
      return []
    }
    let newData = []
    // let csv = []
    data.forEach(obj => {
      if (!isHotline) {
       //  if (isService && !obj.isopen) {
       //    return
       //  }
       //  if (!isService && !obj.url) {
       //    return
       //  }
       if (isService && (!obj.lat || !obj.lng)) {
         return
       }
      }
      let province = newData.find(function(item) {
        return obj.provinceId == item.id
      });//BUICK.searchFrom(newData, obj.provinceId, "id")
      if (!province) {
        province = {
          id: obj.provinceId,
          name: obj.provinceName,
          city: [],
          dealer: [],
          index: newData.length,
        }
        newData.push(province)
      }
      let city = province.city.find(function(item) {
        return obj.cityId == item.id
      });//BUICK.searchFrom(province.city, obj.cityId, "id");
      if (!city) {
        city = {
          id: obj.cityId,
          name: obj.cityName,
          district: [],
          index: province.city.length,
        };
        province.city.push(city)
      }
      var district = city.district.find(function(item) {
        return obj.districtId == item.id
      });//BUICK.searchFrom(city.district, obj.districtId, "id");
      if (!district) {
        district = {
          id: obj.districtId,
          name: obj.districtName,
          index: city.district.length,
        }
        city.district.push(district)
      }
      const dealer = {
        city: obj.cityId,
        cityName: obj.cityName,
        district: obj.districtId,
        address: obj.address,
        code: obj.dealerCode,
        name: obj.dealerName,
        lat: obj.lat,
        lng: obj.lng,
        referred: obj.referred,
        tel: obj.tel,
        url: obj.url,
        verson: obj.verson,
      }

      if (isHotline && obj.dealerTelephone) {
        delete dealer.referred
        delete dealer.url
        delete dealer.verson
        dealer.tel = obj.dealerTelephone
        dealer.ext = obj.dealerExtensionNumber
      }

      if (!isService) {
        dealer.id = obj.id
      }

      province.dealer.push(dealer)
    })
    newData.sort(sortById).forEach((p, idx) => {
      p.index = idx
      p.city.sort(sortById).forEach((c, idx) => {
        c.index = idx
        c.district.sort(sortById).forEach((d, idx) => {
          d.index = idx
        })
      })
    })
    return newData
  },
   async getCurrentPosition(callback){
    tt.showNavigationBarLoading();
    callback(this.data.currentLocation)

     if(this.data.locationData){
    
      tt.request({
        url: 'https://m.buick.com.cn/buickapi/officialsite/Ip/LocationNew',
        timeout:600000,
        success: (res) => {
          let gprov = res.data.regionName
          let gcity = res.data.city
          if (gprov && gcity) {
            this.setData({
              currentLocation:{
                 province: gprov,
                 city:gcity
              }
            })
            callback(this.data.currentLocation)
          } 
          
       //    else {
       //      this.setData({
       //        currentLocation:{
       //          province: "北京",
       //          city:"北京"
       //        }
       //      })
       //      callback(this.data.currentLocation)
       //  }
      },
      complete: tt.hideNavigationBarLoading,
        fail: (res) => {
       
        },
      });
 
     }
  
    
   },
   filteredFn(){
   let hasDistance = false
   const filtered = this.data.province && this.data.province.dealer.filter(item => {
     
     
     if (this.data.city) {
       if (item.city != this.data.city.id) {
         return false
       }
     }

     if (this.data.district) {
       if (item.district != this.data.district.id) {
         return false
       }
     }
  
     if (this.data.locationData) {
      let point = {lng:item.lng, lat:item.lat}
       item.namekm = null
       item.distance = this.distanceBetweenPoint({lat:this.data.locationData.latitude,lng:this.data.locationData.longitude}, point)
       hasDistance = true
       item.namekm = item.distance ? item.name + `(${item.distance}KM)` : item.name

     }else{
      item.namekm =  item.name
     }
     
     // TODO: search by keyword
   
     return true
   }) || []

   
   if (hasDistance) {
     filtered.sort((a, b) => a.distance - b.distance)
   }
   filtered.forEach((f, i) => f.index = i)
   this.setData({
     filtered:filtered
   })
   },
  toRad(degree) {
   return (degree * Math.PI) / 180
 },
 distanceBetweenPoint(lng1, lat1, lng2, lat2) {
   switch (arguments.length) {
     case 2:
       if (typeof lng1 == 'object' && typeof lat1 == 'object') {
         lng2 = lat1.lng || 0
         lat2 = lat1.lat || 0
         lat1 = lng1.lat || 0
         lng1 = lng1.lng || 0
       } else {
         return NaN
       }
       break
     case 3:
       if (typeof lng1 == 'object') {
         lat2 = lng2 || 0
         lng2 = lat1 || 0
         lat1 = lng1.lat || 0
         lng1 = lng1.lng || 0
       } else {
         return NaN
       }
       break
     case 4:
       break
     default:
       return NaN
   }
   if (!lng1 || !lat1 || !lng2 || !lat2) {
     return NaN
   }
   const R = 6371
   // Radius of the earth in km
   let dLat = this.toRad(lat2 - lat1)
   // Javascript functions in radians
   let dLon = this.toRad(lng2 - lng1)
   let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
   let d = R * c
   // Distance in km
   return Math.round(d * 10) / 10
 },
 bindProvinceChange(e)  {
   //省份
   this.setData({
 
     province:this.data.dealer[e.detail.value],
     provinceIndex:e.detail.value,
     cityIdx:0,
     city: this.data.dealer[e.detail.value].city[0],
     district:null,
     districtIdx:null,
     filteredIdx:0
   })
   this.filteredFn();
 },
 bindCityChange(e){
   //城市
   this.setData({
     cityIdx:e.detail.value,
     city:this.data.province.city[e.detail.value],
     district:null,
     districtIdx:null,
     filteredIdx:0
   })
   this.filteredFn();
 
 },
 bindDistrictChange(e){
   //区
   this.setData({
      districtIdx:e.detail.value,
      district:this.data.city.district[e.detail.value],
      filteredIdx:0
   })
   this.filteredFn();
 },
 bindDealerChange(e){
  //经销商
  this.setData({
    filteredIdx:e.detail.value,
  })

},
bindNameChange(e){
  this.setData({
    name:e.detail.value
  })
},
bindMobileChange(e){
  this.setData({
    mobile:e.detail.value
  })
},
checkboxChange(){
  this.setData({
    check:!check,
  })
},
checkboxChange(){
  this.setData({
    check:!check,
  })
},
getPhoneNumberHandler(e) {

  const _that = this;
  if(e.detail.encryptedData && e.detail.iv) {
    tt.showLoading({
      title:'获取授权中...',
      icon:'loading'
    });
    tt.request({
      url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/DecryptUserMobile`,
      method:"POST",
      data:{
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openid: _that.openid
      },
      success: (res) => {
        console.log('res',res)
        if(res.data.code==1000){
          tt.hideLoading();
          _that.setData({
            mobile:res.data.result.purePhoneNumber
          })
  
          // tt.navigateTo({
          //   url: `../century_td/index?utm_campaign=${_that.data.utm_campaign}&utm_content=${_that.data.utm_content}&utm_medium=${_that.data.utm_medium}&utm_source=${_that.data.utm_source}&utm_term=${_that.data.utm_term}&phone=${res.data.result.purePhoneNumber}`,
          //   success(res) {
          //     console.log('success执行了', res);
          //   },
          //   fail(err) {
          //     console.log('fail执行了', err);
          //   },
          //   complete(res) {
          //     console.log('complete执行了', res);
          //   }
          // });
  
  
        }
      },
      fail: (res) => {
  
      },
    });
  }

  console.log('data',{
    encryptedData: e.detail.encryptedData,
    iv: e.detail.iv,
    openid: _that.openid
  })


  // tt.getLocation({
  //   withCredentials:true,
  //   success:(data) => {
  //     console.log(data)
     
      
  //    },
  // })

},
formSubmit(e){
  const name = e.detail.value.name;
  const mobile = e.detail.value.phone;
  if(!name){
    tt.showToast({
      title:'请填写姓名',
      icon:"fail"
    })
    return;
  }
  if(!mobile){
    tt.showToast({
      title:'请填写手机号',
      icon:"fail"
    })
    return;
  }
  if(mobile.length < 11){
    tt.showToast({
      title:'手机号错误',
      icon:"fail"
    })
    return;
  }
  if(e.detail.value.check.length <= 0){
    tt.showToast({
      title:'请同意隐私协议',
      icon:"fail"
    })
    return;
  }
  this.setData({
    name: name,
    mobile: mobile,
  });
  console.log(this.data)
  const params = {
    realName:e.detail.value.name,
    mobile:e.detail.value.phone,
    tryCar:this.data.series[this.data.seriesIdx].name,
    carId:this.data.series[this.data.seriesIdx].carId,
    province:this.data.province.name,
    provinceId:this.data.province.id,
    city:this.data.province.city[this.data.cityIdx].name,
    cityId:this.data.province.city[this.data.cityIdx].id,
    dealerId:0,
    dealerName:this.data.filtered[this.data.filteredIdx].name,
    dealerCode:this.data.filtered[this.data.filteredIdx].code,
    dealerAddress:this.data.filtered[this.data.filteredIdx].address,
    dealerTel:this.data.filtered[this.data.filteredIdx].tel,
    utmSource:this.data.utmSource,
    utmMedium:this.data.utmMedium,
    utmCampaign:this.data.utmCampaign,
    utmContent:this.data.utmContent,
    utmTerm:this.data.utmTerm
  }
  tt.request({
   url: 'https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/Submit',
   method: 'POST',
   header: {
       'content-type':'application/json'
   },
   data:JSON.stringify(params) ,
   success:(res => {
      tt.showToast({
       title:'提交中...',
      })

      if(res.data.code===1000){
        this.setData({
          name: '',
          mobile: '',
        })

        tt.showToast({
          title:'提交试驾成功',
         })
      }
   })
  }) 
},

   onLoad: function (e) {
     this.setData({
      utmSource:e.utm_source,
      utmMedium:e.utm_medium,
      utmCampaign:e.utm_campaign,
      utmContent:e.utm_content,
      utmTerm:e.utm_term,
      mobile:e.phone
     })
     let _that = this;
     tt.request({
       url: 'https://static.buick.com.cn/resource/vehicleSeries.json',
       success: (res) => {
         //获取车型列表
         tt.showLoading({
          title:' loading...',
          icon:'loading'
        })
         if(res.statusCode === 200){
          tt.hideLoading();
           let arr = [];
           for(let i of res.data){
             if(i.flags.testdrive && i.code !== 'century'){
               arr.push(i)
             }
           }
           this.setData({
             series:arr
           })
         }
       },
       fail: (res) => {
      
       },
     });

     tt.getLocation({
       //获取用户信息
       withCredentials:true,
       success:(data) => {
        this.setData({
         locationData:data
        })
        if(data.city){
          this.filteredFn()
        }
        
       },
       complete:(data) => {
          tt.request({
            url: 'https://static.buick.com.cn/resource/dealer.json',
            timeout:600000,
            success: (res) => {
              //获取经销商
              tt.showLoading({
               title:'loading...',
               icon:'loading'
              })
            
              const data =   this.processDealerData(res.data);
              if(data){
               tt.hideLoading();
              }
                this.getCurrentPosition(function callback(ip){
                 
                  if (Array.isArray(data)) {
                    _that.setData({
                      dealer:data
                    });
                    const province = ip.province 
                    const city = ip.city
                    const regexProv = new RegExp(`^${province}`)
                    const prov = data.find(item => item.name == province || regexProv.test(item.name))
                    if (prov) {
                      _that.setData({
                        province:prov
                      })
                     // setProvince(prov)
                      const regexCity = new RegExp(`^${city}`)
                      const c = prov.city.find(item => item.name == city || regexCity.test(item.name))
                      
                      _that.setData({
                          city:c
                        })
                       _that.filteredFn()
                    }
                
                  }
                })
            },
            fail: (res) => {
           
            },
          });

       },
       fail:(data) => {
        console.log('fail',data)
       }  
     })

     this.getPhone();

   },

   getPhone(){
     let  _that = this;
     console.log(1111)
     /*获取手机号码 */
     tt.getStorage({
      key: 'openid', complete(res) {
        //获取本地储存openid
        const openid = res.data;
       //  _that.setData({
       //    openid: openid
       //  })
       _that.openid = openid;
        if (openid) {

          tt.checkSession({
            success() {
              console.log(`session 未过期`);
            },
            fail() {
              console.log(`session 已过期，需要重新登录`);
              tt.login({
                success: (res) => {
                  //二次登录
                  tt.request({
                    url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/GetSeesionKey?code=${res.code}`,
                    method: 'GET',
                    success: (res) => {
                      console.log('login', res)
                      if (res.data.code === 1000) {
                        const id = res.data.result;
                        tt.setStorage({
                          key: "openid",
                          data: id,
                          success(res) {
                            //首次保存openid
                           //  _that.setData({
                           //    openid: openid
                           //  })
                           _that.openid = id
                          },
                          fail(res) {
                            console.log(`setStorage调用失败`);
                          },
                        });
                      }

                    },
                    fail: (res) => {

                    },
                  });


                },
                fail: (err) => {
                  console.log("登录失败", err);
                },
              });
            },
          });
  

        } else {

           //未储存
           tt.login({
            success: (res) => {
              //首次登录
              console.log('第一次登录')
              tt.request({
                url: `https://www.buick.com.cn/buickact/activityapi/BuickDouYinMiniApp/GetSeesionKey?code=${res.code}`,
                method: 'GET',
                success: (res) => {
                  console.log('login', res)
                  if (res.data.code === 1000) {
                    const id = res.data.result;
                    tt.setStorage({
                      key: "openid",
                      data: id,
                      success(res) {
                        //首次保存openid
                       //  _that.setData({
                       //    openid: openid
                       //  })
                       _that.openid = id
                      },
                      fail(res) {
                        console.log(`setStorage调用失败`);
                      },
                    });
                  }

                },
                fail: (res) => {

                },
              });
            },
            fail: (err) => {
              console.log("登录失败", err);
            },
          });

        }
      }
    });




    tt.checkSession({
      success() {
        console.log(`session 未过期`);
      },
      fail() {
        console.log(`session 已过期，需要重新登录`);

      },
    });
   }

  //  onShow:() => {

  //    this.filteredFn()
  //  }

})