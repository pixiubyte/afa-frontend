

import request from '@/sheep/request';

export default {
  //获取天气
  getWeather: (data) =>
    request({
      url: '/content/weather/daily',
      method: 'GET',
      data,
	  custom: {
	    showLoading: false
	  }
    }),
};
