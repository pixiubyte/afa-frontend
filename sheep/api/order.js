import request from '@/sheep/request';

export default {
	expressInfo: (data) =>
	  request({
	    url: 'cardorder.order/express_info',
	    method: 'POST',
		data,
	    custom: {
	      showLoading: false
	    },
	  }),
	hascard: (data) =>
	  request({
	    url: 'card.card/is_map_card',
	    method: 'POST',
		data,
	    custom: {
	      showLoading: false
	    },
	  }),
	cardds: (data) =>
	  request({
	    url: 'usercard.usercard/card_discern',
	    method: 'POST',
		data,
	    custom: {
	      showLoading: false
	    },
	  }),
	conorder: (data) =>
	  request({
	    url: 'cardorder.order/confirm',
	    method: 'POST',
	    data,
		custom: {
		  showLoading: true,
		},
	  }),
	neworder: (data) =>
	  request({
	    url: 'cardorder.order/lists',
	    method: 'POST',
	    data,
		custom: {
		  showLoading: false
		},
	  }),
	// 分享加经验
	shareexp: (data) =>
	  request({
	    url: 'card.card/share_log',
	    method: 'POST',
	    data,
		custom: {
		  showLoading: false
		},
	  }),
	// 卡详情
	cardinfos: (data) =>
	  request({
	    url: 'card.card/get_card_info',
	    method: 'POST',
	    data,
		custom: {
		  showLoading: false
		},
	  }),
	// 存手机号
	set_mobile: (data) =>
	  request({
	    url: 'card.card/set_mobile',
	    method: 'POST',
	    data,
		custom: {
		  showLoading: false
		},
	  }),
	// 展示积分
	showexp: (data) =>
	  request({
	    url: 'card.card/get_exp',
	    method: 'POST',
	    data,
		custom: {
		  showLoading: false
		},
	  }),
	// 赠送通知
	ctimeings: (data) =>
	  request({
	    url: 'usercard.usercard/set_give_notice',
	    method: 'POST',
	    data,
		custom: {
		  showError: false,
		  showLoading: false
		},
	  }),
	// 赠送通知
	timeings: (data) =>
	  request({
	    url: 'usercard.usercard/get_give_notice',
	    method: 'POST',
	    data,
		custom: {
		  showError: false,
		  showLoading: false
		},
	  }),
	// 兑换套餐
	sendcards: (data) =>
	  request({
	    url: 'cardorder.order/create',
	    method: 'POST',
	    data,
	  }),
	// 赠送卡
	GiveCards: (params) =>
	  request({
	    url: 'usercard.usercard/give_card',
	    method: 'POST',
	    params,
	  }),
	// 卡信息
	CardInfo: (params) =>
	  request({
	    url: 'usercard.usercard/get_user_card_info',
	    method: 'POST',
	    params,
	  }),
	// 实体卡兑换进卡包
	giveCard: (params) =>
	  request({
	    url: 'usercard.usercard/exchange_card',
	    method: 'POST',
	    params,
		custom: {
		  showError: false,
		},
	  }),
	// 卡支付接口
	cardPay: (params) =>
	  request({
	    url: 'pay/prepay',
	    method: 'POST',
	    params,
	  }),
	// 卡包列表
	userCardList: (params) =>
	  request({
	    url: 'usercard.usercard/user_card_list',
	    method: 'POST',
	    params,
	  }),
	// 买卡创建订单
	createorder: (params) =>
	  request({
	    url: 'card.card/create',
	    method: 'POST',
	    params,
	  }),
	// 是否有默认地址
	hasAddress: (params) =>
	  request({
	    url: 'card.card/is_address',
	    method: 'POST',
	    params,
	  }),
	// 卡片列表
	cardList: (params) =>
	  request({
	    url: 'card.card/card_list',
	    method: 'POST',
	    params,
	  }),
  // 订单详情 
  detail: (id) =>
    request({
      url: 'order.order/detail',
      method: 'GET',
      params: {
        id: id,
      },
    }),
  // 发货通知跳转详情 
  merchant: (params) =>
    request({
      url: 'order.order/detail',
      method: 'GET',
      params,
    }),
  // 发票详情 
  invoice: (id) =>
    request({
      url: 'order.invoice/detail',
      method: 'GET',
      params: {
        id: id,
      },
    }),
  // 获取支付结果
  // payResult: (id) =>
  //   request({
  //     url: 'order/order/' + id,
  //     method: 'GET',
  //     custom: {
  //       showLoading: false,
  //     },
  //   }),
  // 订单item详情
  itemDetail: (params) =>
    request({
      url: 'order.order/itemDetail',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
      },
    }),
  // 订单列表 
  list: (params) =>
    request({
      url: 'order.order',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
      },
    }),
  // 计算订单信息 
  calc: (data) =>
    request({
      url: 'order.order/calc',
      method: 'POST',
      data,
    }),
  // 创建订单 
  create: (data) =>
    request({
      url: 'order.order/create',
      method: 'POST',
      data,
    }),
  //订单可用优惠券 
  coupons: (data) =>
    request({
      url: 'order.order/coupons',
      method: 'POST',
      data,
    }),
  // 确认收货 
  confirm: (id) =>
    request({
      url: 'order.order/confirm',
      method: 'POST',
      params: {
        id: id,
      },
    }),
  // 评价订单 
  comment: (id, data) =>
    request({
      url: 'order.order/comment',
      method: 'POST',
      params: {
        id: id,
      },
      data,
    }),
  // 申请退款 
  applyRefund: (id) =>
    request({
      url: 'order.order/applyRefund',
      method: 'POST',
      params: {
        id: id,
      },
    }),
  // 取消订单
  cancel: (id) =>
    request({
      url: 'order.order/cancel',
      method: 'POST',
      params: {
        id: id,
      },
    }),
  // 删除订单 
  delete: (id) =>
    request({
      url: 'order.order/delete',
      method: 'DELETE',
      params: {
        id: id,
      },
    }),
  // 售后 
  aftersale: {
    // 申请售后
    apply: (data) =>
      request({
        url: 'order.aftersale/add',
        method: 'POST',
        data,
      }),
    list: (params) =>
      request({
        url: 'order.aftersale',
        method: 'GET',
        params,
        custom: {
          showLoading: false,
        },
      }),
    //取消售后
    cancel: (id) =>
      request({
        url: 'order.aftersale/cancel',
        method: 'POST',
        params: {
          id: id,
        },
      }),
    //删除售后单
    delete: (id) =>
      request({
        url: 'order.aftersale/delete',
        method: 'DELETE',
        params: {
          id: id,
        },
      }),
    // 售后详情
    detail: (id) =>
      request({
        url: 'order.aftersale/detail',
        method: 'GET',
        params: {
          id: id,
        },
      }),
  },
  //订单包裹 
  express: {
    detail: (id, orderId) =>
      request({
        url: 'order.express/detail',
        method: 'GET',
        params: {
          id: id,
          order_id: orderId,
        },
      }),
    list: (orderId) =>
      request({
        url: 'order.express',
        method: 'GET',
        params: {
          order_id: orderId,
        },
        custom: {
          showLoading: false,
        },
      }),
  },
};
