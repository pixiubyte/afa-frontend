<template>
	<view class="content">
		<view class="t">隐私协议</view>
		<view class="d">
			<rich-text :nodes="state.mydata"></rich-text>
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
		mydata: []
	})
	async function getagreement() {
		let res = await sheep.$api.activity.getagreement({
			type: 'privacy'
		});
		if (res.code == 0) {
			state.mydata = res.data.content
			console.log(state.mydata)
		}
	}
	
	
	function link(url, status){
		uni.navigateTo({
			url,
		})
	}

	onShow(() => {

	});
	onHide(() => {

	});
	onLoad((options) => {
		getagreement()
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
		overflow: hidden;
		min-height: 100vh;
		padding: 30rpx;
		background: #fff;
		.t{
			display: block;
			font-size: 34rpx;
			color: #333;
			text-align: center;
			font-weight: bold;
		}
		.d{
			padding: 46rpx 0;
			margin-bottom: 20rpx;
			display: block;
			font-size: 28rpx;
			color: #666;
			line-height: 1.8;
			text{
				display: block;
				font-size: 28rpx;
				color: #666;
				line-height: 1.8;
			}
		}
		.data{
			margin-top: 66rpx;
			display: flex;
			flex-wrap: wrap;
			view{
				width: 32%;
				padding: 46rpx 0;
				margin-right: 2%;
				margin-bottom: 20rpx;
				background: #fdf5f3;
				&:nth-child(3n){
					margin-right: 0;
				}
				.f{
					display: block;
					font-size: 34rpx;
					color: #333;
					text-align: center;
				}
				.d{
					display: block;
					font-size: 22rpx;
					color: #666;
					margin-top: 14rpx;
					text-align: center;
				}
			}
		}
		.main_list{
			width: 100%;
			margin-top: 36rpx;
			.label{
				width: 100%;
				margin-bottom: 68rpx;
				.font{
					display: flex;
					align-items: center;
					position: relative;
					view{
						flex: 1;
						position: relative;
						padding-top: 50rpx;
						&.on{
							.i1{
								display: block;
							}
						}
						.i{
							width: 23rpx;
							border-radius: 50%;
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							top: -20rpx;
						}
						.i1{
							width: 23rpx;
							display: none;
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							top: 22rpx;
						}
						text{
							display: block;
							text-align: center;
							font-size: 26rpx;
							color: #666;
						}
					}
				}
				.b{
					width: 100%;
					height: 16rpx;
					position: relative;
					border-radius: 10rpx;
					background: linear-gradient(to right, #75d5a7, #bae779, #dbd668, #e1976f, #e48070);
				}
				.t{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 36rpx;
					text{
						font-size: 26rpx;
						color: #000;
					}
					view{
						height: 36rpx;
						display: inline-flex;
						align-items: center;
						font-size: 18rpx;
						color: #fff;
						border-radius: 40rpx;
						padding: 0 20rpx;
						background: #e08e76;
					}
				}
			}
		}
		.photo{
			overflow: hidden;
			width: 592rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			image{
				width: 100%;
			}
		}
		.head{
			display: flex;
			align-items: center;
			justify-content: space-between;
			text{
				font-size: 26rpx;
				color: #000;
				font-weight: bold;
			}
			view{
				height: 36rpx;
				display: inline-flex;
				align-items: center;
				font-size: 18rpx;
				color: #fff;
				border-radius: 40rpx;
				padding: 0 20rpx;
				background: #e08e76;
			}
		}
	}
</style>
