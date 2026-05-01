
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
	//每日小知识
	getTip: (data) =>
	  request({
	    url: '/content/daily/tip',
	    method: 'GET',
	    data,
		  custom: {
		    showLoading: false
		  }
	  }),
	  //每日金句
	  getWords: (data) =>
	    request({
	      url: '/content/daily/words',
	      method: 'GET',
	      data,
	  	  custom: {
	  	    showLoading: false
	  	  }
	    }),
	//获取文章分类
	getArticleType: (data) =>
	  request({
	    url: '/content/article/categories',
	    method: 'GET',
	    data,
		  custom: {
		    showLoading: false
		  }
	  }),
	  //获取分类文章列表
	  getArticle: (data) =>
	    request({
	      url: `/content/article/category/${data.category_id}`,
	      method: 'GET',
	      data: data.body,
	  	  custom: {
	  	    showLoading: true
	  	  }
	    }),
		//获取文章
		getArticleInfo: (data) =>
		  request({
		    url: `/content/article/${data.articleId}`,
		    method: 'GET',
			  custom: {
			    showLoading: true
			  }
		  }),
		  
		  //获取文件上传签名密钥
		  getPutsign: (data) =>
		    request({
		      url: `/common/file/put-sign`,
		  			  data,
		      method: 'POST',
		  	  custom: {
		  	    showLoading: false
		  	  }
		    }),
		  
		  //新增肤测记录
		  addSkintest: (data) =>
		    request({
		      url: `/tool/skintest`,
			  data,
		      method: 'POST',
		  	  custom: {
		  	    showLoading: true
		  	  }
		    }),
			//获取肤测列表
			getSkintest: (data) =>
			  request({
			    url: `/tool/skintests`,
				data,
			    method: 'GET',
				  custom: {
				    showLoading: true
				  }
			  }),
			  //获取肤测记录
			  getSkintestInfo: (data) =>
			    request({
			      url: `/tool/skintest/${data.id}`,
			      method: 'GET',
			  	  custom: {
			  	    showLoading: true
			  	  }
			    }),
				//获取肤测美丽方案
				getSolution: (data) =>
				  request({
				    url: `/tool/skintest/solution/${data.id}`,
				    method: 'GET',
					  custom: {
					    showLoading: true
					  }
				  }),
				  
				  
				  //获取AI机器人
				  getAirbots: (data) =>
				    request({
				      url: `/chat/airobots`,
				      method: 'GET',
				  	  custom: {
				  	    showLoading: true
				  	  }
				    }),
					//获取聊天记录（机器人id）
					getChat: (data) =>
					  request({
					    url: `/chat/history/${data.id}`,
						data: data.form,
					    method: 'GET',
						  custom: {
						    showLoading: true
						  }
					  }),
					  //聊天sse
					  messageSee: (data) =>
					    request({
					      url: `/chat/robot/message/sse`,
					  	data,
					      method: 'POST',
					  	  custom: {
					  	    showLoading: true
					  	  }
					    }),
						
						
						
						//获取用户详情
						getUserinfo: (data) =>
						  request({
						    url: `/user/profile`,
							data,
						    method: 'GET',
							  custom: {
							    showLoading: false
							  }
						  }),
						  //更新用户资料
						  upUserinfo: (data) =>
						    request({
						      url: `/user/info`,
						  	data,
						      method: 'POST',
						  	  custom: {
						  	    showLoading: true
						  	  }
						    }),
							//任务 - 列表
							getMissionBase: (data) =>
							  request({
							    url: `/user/mission/base`,
								data,
							    method: 'GET',
								  custom: {
								    showLoading: false
								  }
							  }),
							  //任务 - 执行状况
							  getMissionDaily: (data) =>
							    request({
							      url: `/user/mission/daily`,
							  	data,
							      method: 'GET',
							  	  custom: {
							  	    showLoading: false
							  	  }
							    }),
								
								//全部排行榜
								getRank: (data) =>
								  request({
								    url: `/health/total/rank`,
									data,
								    method: 'GET',
									  custom: {
									    showLoading: true
									  }
								  }),
								  //邀请排行榜
								  getShareRank: (data) =>
								    request({
								      url: `/health/invite/rank`,
								  	data,
								      method: 'GET',
								  	  custom: {
								  	    showLoading: true
								  	  }
								    }),
									//我的分享
									getSharePhoto: (data) =>
									  request({
									    url: `/user/mission/ai-share`,
										data,
									    method: 'GET',
										  custom: {
										    showLoading: true
										  }
									  }),
									  //用户签到
									  checkIn: (data) =>
									    request({
									      url: `/user/mission/check-in`,
									  	data,
									      method: 'POST',
									  	  custom: {
									  	    showLoading: true
									  	  }
									    }),
										//用户签到查询
										getCheckIn: (data) =>
										  request({
										    url: `/user/mission/check-in`,
											data,
										    method: 'GET',
											  custom: {
											    showLoading: false
											  }
										  }),
										  //积分等级
										  getPointsLevels: (data) =>
										    request({
										      url: `/user/points/levels`,
										  	data,
										      method: 'GET',
										  	  custom: {
										  	    showLoading: false
										  	  }
										    }),
											//用户积分
											getPoints: (data) =>
											  request({
											    url: `/user/points`,
												data,
											    method: 'GET',
												  custom: {
												    showLoading: false
												  }
											  }),
											  //积分记录
											  getPointsRecord: (data) =>
											    request({
											      url: `/user/points/record`,
											  	data,
											      method: 'GET',
											  	  custom: {
											  	    showLoading: true
											  	  }
											    }),
												
												
												//产品列表
												getProductList: (data) =>
												  request({
												    url: `/product/v1/list`,
													data,
												    method: 'GET',
													  custom: {
													    showLoading: true
													  }
												  }),
												  //产品详情
												  getProductInfo: (data) =>
												    request({
												      url: `/product/v1/detail/${data.id}`,
												      method: 'GET',
												  	  custom: {
												  	    showLoading: true
												  	  }
												    }),
													
													
													//小程序-注册
													wxRegister: (data) =>
													  request({
													    url: `/auth/mini/register`,
														data,
													    method: 'POST',
														  custom: {
														    showLoading: true
														  }
													  }),
													  //小程序-登录
													  wxLogin: (data) =>
													    request({
													      url: `/auth/mini`,
														  data,
													      method: 'POST',
													  	  custom: {
													  	    showLoading: true
													  	  }
													    }),
														//发送短信验证码
														sendSms: (data) =>
														  request({
														    url: `/common/sms/send`,
															data,
														    method: 'POST',
															  custom: {
															    showLoading: true
															  }
														  }),
														  //获取租户配置
														  gitConfigs: (data) =>
														    request({
														      url: `/common/configs`,
															  data,
														      method: 'GET',
														  	  custom: {
														  	    showLoading: false
														  	  }
														    }),
															
															//记录文章观看
															articleView: (data) =>
															  request({
															    url: `/content/article/${data.articleId}/view`,
															    method: 'POST',
																  custom: {
																    showLoading: false
																  }
															  }),
															  
															  //上传图片开始分析
															  analysis: (data) =>
															    request({
															      url: `/vision/analysis/type/${data.type}`,
															      method: 'POST',
																  data: data.form,
															  	  custom: {
															  	    showLoading: true
															  	  }
															    }),
																//获取图片分析报告
																analysisResult: (data) =>
																  request({
																    url: `/vision/analysis/result/${data.result_id}`,
																    method: 'GET',
																	  custom: {
																	    showLoading: true
																	  }
																  }),
																  //每日任务清单
																  getTodeList: (data) =>
																    request({
																      url: `/todo/list`,
																      method: 'GET',
																  	  custom: {
																  	    showLoading: true
																  	  }
																    }),
																	//每日任务提交
																	submitTodeDown: (data) =>
																	  request({
																	    url: `/todo/done`,
																	    method: 'POST',
																		  custom: {
																		    showLoading: true
																		  }
																	  }),
																	  //获取问卷调查列表
																	  getQuestionList: (data) =>
																	    request({
																	      url: `/tool/questionnaires`,
																	      method: 'GET',
																	  	  custom: {
																	  	    showLoading: true
																	  	  }
																	    }),
																		//获取问卷调查内容
																		getQuestionInfo: (data) =>
																		  request({
																		    url: `/tool/questionnaire/dynamic/${data.id}`,
																		    method: 'GET',
																			  custom: {
																			    showLoading: true
																			  }
																		  }),
																		  //上传问卷调查结果
																		  upQuestion: (data) =>
																		    request({
																		      url: `/tool/questionnaire/${data.id}`,
																		      method: 'POST',
																			  data: data.form,
																		  	  custom: {
																		  	    showLoading: true
																		  	  }
																		    }),
																			//问卷调查方案内容
																			getSolutions: (data) =>
																			  request({
																			    url: `/tool/questionnaire/solution/${data.id}`,
																			    method: 'GET',
																				  custom: {
																				    showLoading: true
																				  }
																			  }),
																			  //获取类型最新报告
																			  getReports: (data) =>
																			    request({
																			      url: `/tool/physical-exam/report/${data.type}`,
																			      method: 'POST',
																			  	  custom: {
																			  	    showLoading: true
																			  	  }
																			    }),
																			//我的健康方案
																			getsSolutionList: (data) =>
																			  request({
																			    url: `/health/solution/list`,
																				data,
																			    method: 'GET',
																				  custom: {
																				    showLoading: false
																				  }
																			  }),
																			  //我的问卷列表
																			  getQuessolu: (data) =>
																			    request({
																			      url: `/tool/questionnaire/solutions`,
																			  	data,
																			      method: 'GET',
																			  	  custom: {
																			  	    showLoading: false
																			  	  }
																			    }),
																				//相关协议
																				getagreement: (data) =>
																				  request({
																				    url: `/common/agreement/${data.type}`,
																				    method: 'GET',
																					  custom: {
																					    showLoading: true
																					  }
																				  }),
									
};
