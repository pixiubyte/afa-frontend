<template>
	<view class="content">
		<web-view src="https://mp.weixin.qq.com/s/yuCXl_R2apeHd9vRXvxpCg"></web-view>
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
	const state = reactive({
		
	})
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
		overflow: hidden;
		min-height: 100vh;
	}
</style>
