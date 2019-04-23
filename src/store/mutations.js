import {
  SAVE_GEOHASH,
  RECORD_ADDRESS
} from './mutations.type';

export  default{
//存储经纬度
  [RECORD_ADDRESS](state,payload){
     state.latitude = payload.latitude;
     state.longitude = payload.longitude;
  },
  //存储hash值
 [SAVE_GEOHASH](state,payload){
    state.geohash = payload
 }
}