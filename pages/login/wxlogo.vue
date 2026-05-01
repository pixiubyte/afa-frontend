<template>
	<view class="content">
		<image src="../../static/logos.png" mode="widthFix" class="logo"></image>
			<view class="button" @click="wxlogin">
				<image src="../../static/kj.jpg" mode="widthFix"></image>
			</view>
			<view class="reg">
				<view :class="{'on':state.check}" @click="state.check = !state.check">
					<image src="../../static/s_03.jpg" mode="widthFix"></image>
				</view>
				<text>我已阅读<text @click="link('/pages/user/yh')">用户协议</text>和<text @click="link('/pages/user/ys')">隐私协议</text></text>
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
		code: '',
		check: false,
	})
	
	function wxlogin(){
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
				wxLogin()
			}
		})
		
	}
	async function wxLogin() {
		let res = await sheep.$api.activity.wxLogin({
			js_code: state.code,
		});
		console.log(res,123)
		if (res.code == 0) {
			uni.showToast({
				title:"登录成功",
				duration: 1500
			})
			uni.setStorageSync('user_login', res.data)
			uni.setStorageSync('token', res.data.access_token)
			setTimeout(()=>{
				uni.switchTab({
					url: '/pages/index/index'
				})
			},1500)
		}else if(res.code == 2001){
			uni.showToast({
				title: res.message,
				icon: 'none',
				duration: 1500
			})
			setTimeout(()=>{
				link('/pages/login/login')
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
		padding: 290rpx 0;
		background-image: url('https://mmgpt-1313548374.cos.ap-shanghai.myqcloud.com/mp/static/userbg.jpg');
		background-size: 100%;
		background-repeat: no-repeat;
		.logo{
			width: 144rpx;
			margin: 0 auto;
		}
			.reg{
				display: flex;
				justify-content: center;
				margin-top: 40rpx;
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
		.button{
			width: 676rpx;
			margin: 0 auto;
			border-radius: 60rpx;
			overflow: hidden;
			margin-top: 290rpx;
			image{
				width: 100%;
			}
		}
	}
</style>
