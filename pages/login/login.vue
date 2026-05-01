<template>
	<view class="content">
		<text class="title">欢迎来到AI健康</text>
		<image src="../../static/b.png" mode="widthFix" class="t"></image>
		<view class="form">
			<view class="label">
				<input type="text" placeholder="手机号" v-model="state.mobile" placeholder-class="s" name="" id="">
			</view>
			<view class="label">
				<input type="text" placeholder="验证码" v-model="state.mobile_code" placeholder-class="s" name="" id="">
				<view @click="send">{{state.s == 60?'发送验证码':`${state.s}s后重试`}}</view>
			</view>
			<view class="reg">
				<view class="fl">
					<view :class="{'on':state.check}" @click="state.check = !state.check">
						<image src="../../static/s_03.jpg" mode="widthFix"></image>
					</view>
					<text>我已阅读<text @click="link('/pages/user/yh')">用户协议</text>和<text @click="link('/pages/user/ys')">隐私协议</text></text>
				</view>
				<text>接收不到验证码</text>
			</view>
			<view class="button" @click="submit">
				<image src="../../static/d.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive
	} from 'vue';
	import {
		onLoad,
		onPageScroll,
		onPullDownRefresh,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	import sheep from '@/sheep';
	import {
		baseUrl
	} from '@/sheep/config';
	import dayjs from 'dayjs';
	import $share from '@/sheep/platform/share';
	const state = reactive({
		dbclick: true,
		mobile: '',
		code: '',
		check: false,
		mobile_code: '',
		invite: '',
		s: 60,
		timer: null
	})
	async function send(){
		if(!state.mobile){
			return uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
		}
		if(state.mobile.length < 11){
			return uni.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			})
		}
		if(state.dbclick && state.s == 60){
			state.dbclick = false;
			let res = await sheep.$api.activity.sendSms({
				// method: 'login',
				method: 'bind',
				mobile: state.mobile
			});
			if (res.code == 0) {
				uni.showToast({
					title: '发送成功'
				})
				state.timer = setInterval(()=>{
					if(state.s > 0){
						state.s-=1;
					}else{
						state.s = 60;
						state.dbclick = true;
						clearInterval(state.timer)
					}
				},1000)
			}
		}
		
	}
	
	function submit(){
		if(!state.mobile){
			return uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
		}
		if(state.mobile.length < 11){
			return uni.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			})
		}
		if(!state.mobile_code){
			return uni.showToast({
				title: '请输入验证码',
				icon: 'none'
			})
		}
		if(!state.check){
			return uni.showToast({
				title: '请同意用户协议',
				icon: 'none'
			})
		}
		uni.login({
			success(res) {
				console.log(res.code)
				state.code = res.code
				wxRegister()
			}
		})
		
	}
	async function wxRegister() {
		let res = await sheep.$api.activity.wxRegister({
			js_code: state.code,
			mobile_code: '',
			mobile: state.mobile,
			code: state.mobile_code,
			invite: ''
		});
		if (res.code == 0) {
			uni.showToast({
				title:"注册成功",
				duration: 1500
			})
			uni.setStorageSync('user_login', res.data)
			uni.setStorageSync('token', res.data.access_token)
			setTimeout(()=>{
				uni.switchTab({
					url: '/pages/index/index'
				})
			},1500)
		}else{
			uni.showToast({
				title: res.message,
				icon: 'none',
				duration: 1500
			})
			setTimeout(()=>{
				uni.navigateTo({
					url: '/pages/login/wxlogo'
				})
			},1500)
		}
	}
	function link(url){
			uni.navigateTo({
				url,
			})
		
	}

	onShow(() => {

	});
	onHide(() => {

	});
	onLoad((options) => {
		
		
	});

	// 下拉刷新
	onPullDownRefresh(() => {

	});

	onPageScroll(() => {});
</script>
<style lang="scss">
	$c: #ad7561;
	view, text, textarea, input{
		box-sizing: border-box;
	}
	image{
		display: block;
		height: auto;
	}
	.content{
		width: 100%;
		min-height: 100vh;
		background-color: #F9F9F9;
		background-image: url('https://mmgpt-1313548374.cos.ap-shanghai.myqcloud.com/mp/static/userbg.jpg');
		background-size: 100%;
		background-repeat: no-repeat;
		padding: 140rpx 46rpx;
		.title{
			display: block;
			font-size: 44rpx;
			color: #000;
			font-weight: bold;
		}
		.t{
			width: 178rpx;
			margin-top: 94rpx;
		}
		.form{
			width: 100%;
			margin-top: 56rpx;
			.button{
				width: 100%;
				overflow: hidden;
				margin-top: 64rpx;
				image{
					width: 100%;
				}
			}
			.reg{
				display: flex;
				align-items: center;
				justify-content: space-between;
				& > text{
					font-size: 24rpx;
					color: #666;
				}
				.fl{
					display: flex;
					align-items: center;
					& > text{
						font-size: 24rpx;
						color: #666;
						text{
							color: #A76A54;
							margin: 0 3rpx;
						}
					}
					view{
						width: 38rpx;
						height: 38rpx;
						overflow: hidden;
						border-radius: 50%;
						border: 1px solid #A76A54;
						margin-right: 10rpx;
						&.on{
							border: none;
							image{
								display: block;
							}
						}
						image{
							width: 100%;
							height: 100%;
							display: none;
						}
					}
				}
			}
			.label{
				width: 100%;
				height: 116rpx;
				position: relative;
				border-radius: 20rpx;
				background: #fff;
				margin-bottom: 30rpx;
				input{
					width: 100%;
					height: 100%;
					font-size: 30rpx;
					color: #333;
					padding-left: 33rpx;
				}
				view{
					height: 100%;
					font-size: 30rpx;
					color: #A76A54;
					padding: 0 26rpx;
					display: flex;
					align-items: center;
					position: absolute;
					right: 0;
					top: 0;
					z-index: 99;
				}
				.s{
					color: #666;
				}
			}
		}
	}
</style>
