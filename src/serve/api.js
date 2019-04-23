import ApiService from './request'

//城市列表
export const Get_cityGuess = () => ApiService.get('/v1/cities', {
  params: {
    type: 'guess'
  }
});
//热门城市
export const Get_hotCity = () => ApiService.get('/v1/cities',{
  params: {
    type: 'hot'
  }
  
});
//获取所有城市
export const Get_groupCity = () => ApiService.get('/v1/cities',{params:{type:'group'}});
/**
 * 获取当前所在城市
 */
export const Get_currentcity = number => ApiService.get('/v1/cities/' + number);
//获取搜索地址
export const Get_searchplace = (cityid, value) => ApiService.get('/v1/pois', {
     params: {
        type: 'search',
        city_id: cityid,
        keyword: value
      }
 
});
//登录 
export const Post_login = (message) => ApiService.post('/v2/login', message)
//获取msite 页面地址
export const Get_msiteAddress = (geohash) => ApiService.get('/v2/pois/' + geohash);
