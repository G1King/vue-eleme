import ApiService from './request'

// 城市列表
export const Get_cityGuess = () => ApiService.get('/v1/cities', {
  params: {
    type: 'guess'
  }
})
// 热门城市
export const Get_hotCity = () => ApiService.get('/v1/cities', {
  params: {
    type: 'hot'
  }

})
// 获取所有城市
export const Get_groupCity = () => ApiService.get('/v1/cities', {
  params: {
    type: 'group'
  }
})
/**
 * 获取当前所在城市
 */
export const Get_currentcity = number => ApiService.get('/v1/cities/' + number)
// 获取搜索地址
export const Get_searchplace = (cityid, value) => ApiService.get('/v1/pois', {
  params: {
    type: 'search',
    city_id: cityid,
    keyword: value
  }

})
// 登录
export const Post_login = (message) => ApiService.post('/v2/login', message)
// 获取msite 页面地址
export const Get_msiteAddress = (geohash) => ApiService.get('/v2/pois/' + geohash)
/**
 * 获取msite页面食品分类列表
 */

export const Get_msiteFoodTypes = geohash => ApiService.get('/v2/index_entry', {
  params: {
    geohash,
    group_type: '1',
    'flags[]': 'F'
  }

})
/**
 * 获取msite商铺列表
 */

export const Get_shopList = (latitude, longitude, offset, restaurant_category_id = '',
  restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  const data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  }
  return ApiService.get('/shopping/restaurants', { params: data })
}
