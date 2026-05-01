<template>
	<view class="content">
		<ChatSSEClient ref="chatSSEClientRef" @onOpen="openCore" @onError="errorCore" @onMessage="messageCore"
			@onFinish="finishCore" />
		<!-- <button @click="start">开始</button>
		<button @click="stop">停止</button>
		<template v-if="loading">
		  <view>{{ openLoading ? "正在连接sse..." : '连接完成！' }}</view>
		  <view>{{ loading ? "加载中..." : '' }}</view>
		</template>
		
		<view>
		  {{ responseText }}
		</view> -->
		<scroll-view scroll-y class="scroll-view" :scroll-top="state.sct" :scroll-into-view="state.scrollIntoIndex">
			<view class="banner">
				<image src="../../static/chat_03.jpg" mode="widthFix"></image>
				<text class="name">Hi,很高兴见到你</text>
				<text class="desc">你的反馈助我成长,期待我们一起探索未来!</text>
			</view>
			<!-- {{state.list}} -->
			<view v-for="(item, index) in state.list" v-if="state.list.length" :id="'msg_' + item.id">
				<view class="item user">
					<image :src="state.user" mode="widthFix"></image>
					<view>{{item.parent_content}}</view>
				</view>
				<view class="item">
					<image src="../../static/chat_06.jpg" mode="widthFix"></image>
					<view v-if="loading && item.newjson.otherContent == ''">
						Thinking...
					</view>
					<view class="xx" v-else>
						<!-- <u-parse :content="item.content" ></u-parse> -->
						<!-- <zero-markdown-view :markdown="item.content"></zero-markdown-view> -->
						<view>{{item.newjson.innerContent}}</view>
						<text>{{item.newjson.otherContent}}</text>
					</view>
				</view>
			</view>
			<view class="null" v-else>
				<image src="../../static/nulls.png" mode="widthFix"></image>
				<text>暂无数据</text>
			</view>
			<view style="height: 36rpx" id="msg123"></view>
		</scroll-view>
		<view class="footer">
			<input type="text" v-model="state.message" @confirm="submit" placeholder="您可以问我任何问题" placeholder-class="s">
			<image src="../../static/send.png" @click="submit" mode="widthFix"></image>
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
	import { baseUrl } from '@/sheep/config';
	import dayjs from 'dayjs';
	import $share from '@/sheep/platform/share';
	import ChatSSEClient from "../../components/gao-ChatSSEClient/gao-ChatSSEClient.vue";
	import uParse from '@/components/u-parse/u-parse.vue'
	import { ref } from 'vue'
	
	const chatSSEClientRef = ref(null);
	const responseText = ref("");
	const responseText1 = ref("");
	const fullText = ref("");
	const loading = ref(false);
	const openLoading = ref(false);
	const state = reactive({
		airbot: {},
		list: [],
		message: '',
		scrollIntoIndex: '',
		sct: 0,
		fail: false,
		flag: true,
		user: ''
	})

	const openCore = () => {
		openLoading.value = false;
		console.log("open sse");
	}
	const errorCore = (err) => {
		state.fail = true
		console.log("error sse：", err);
	}
	const messageCore = (msg) => {
		if (state.list.length === 0) return;
		const lastIndex = state.list.length - 1;

		let resStr = msg;
		const lines = resStr.split('\n\n');
		lines.forEach((line, index) => {
			let lineData = line.trim();
			const data = lineData.split('data:');
			if (data.length === 2) {
				const v = data[1].trim();
				if (v !== '') {
					try {
						const jsonData = JSON.parse(v);
						const content = jsonData?.content || '';
						if (content && content !== '') {
							fullText.value += content;
						}
					} catch (e) {

					}
				}
			}
		})
		console.log(fullText.value,9999)
		setTimeout(()=>{
			let news = parseContent(fullText.value);
			console.log(news,123)
			if (news.innerContent != '') {
				const printNextChar = () => {
					let index = responseText.value.length;
					let index1 = responseText1.value.length;
					if (index < news.innerContent.length) {
						responseText.value += news.innerContent.charAt(index);
						state.list[lastIndex].newjson.innerContent = responseText.value
						index++;
						setTimeout(printNextChar, 30); // 控制速度
					} else if (index >= news.innerContent.length && index1 < news.otherContent.length) {
						responseText1.value += news.otherContent.charAt(index1);
						state.list[lastIndex].newjson.otherContent = responseText1.value
						index1++;
						setTimeout(printNextChar, 30);
					}
					state.sct = 10000 + responseText1.value.length
					if (state.scrollIntoIndex == 'msg123') {
						state.scrollIntoIndex = 'msg1231'
					} else {
						state.scrollIntoIndex = 'msg123'
					}
					console.log(state.list[lastIndex].newjson)
				};
				printNextChar();
			}
		},1000)

	}


	const finishCore = () => {
		console.log("finish sse")
		state.scrollIntoIndex = ''
		loading.value = false;
	}

	const messageSee = () => {
		if (loading.value) return;
		state.fail = false;
		openLoading.value = true;
		loading.value = true;
		responseText.value = "";
		responseText1.value = "";
		fullText.value = "";
		const lastItem = state.list[state.list.length - 1];
		// state.scrollIntoIndex = 'msg_' + lastItem.id;
		state.list.push({
			content: '',
			parent_content: state.message,
			newjson: {
				innerContent: '',
				otherContent: ''
			}
		})

		state.scrollIntoIndex = 'msg123'
		setTimeout(() => {
			state.scrollIntoIndex = 'msg1231'
		}, 1000)
		chatSSEClientRef.value.startChat({
			url: `${baseUrl}/chat/robot/message/sse`,
			headers: {
				Authorization: `${uni.getStorageSync('token')}`,
			},
			body: {
				"ai_robot_id": state.airbot.id,
				"content": state.message,
				"msg_type": 2
			}
		})
		state.message = '';
	}
	const stop = () => {
		chatSSEClientRef.value.stopChat()
		console.log("stop");
	}

	function parseContent(value) {
		const result = {
			innerContent: '', // <think> 标签内部的内容
			otherContent: '', // 去掉 <think> 标签后的其他内容
		};
		value = value.trim()
		const [beforeThink, thinkContent] = value.split('<think>')
		const [insideThink, afterThink] = (thinkContent || '').split('</think>')
		result.innerContent = insideThink;
		result.otherContent = afterThink && afterThink.replace('\n\n','');
		return result;
	}

	function submit() {
		if (!uni.getStorageSync('token')) {
			uni.navigateTo({
				url: '/pages/login/wxlogo'
			})
		}
		if (!state.message) {
			return uni.showToast({
				title: '请输入内容',
				icon: 'none'
			})
		}
		if (!loading.value) messageSee();

	}
	async function getAirbots(data) {
		let res = await sheep.$api.activity.getAirbots();
		if (res.code == 0) {
			if (res.data.list.length) {
				let def = uni.getStorageSync('configs').default_ai_robot.id;
				let flag = false;
				res.data.list.forEach((item) => {
					if (item.id == def) {
						flag = true;
						state.airbot = item
						uni.setStorageSync('airbot', item)
					}
				})
				if (!flag) state.airbot.id = res.data.list[0].id, uni.setStorageSync('airbot', res.data.list[0].id);
				getChat()
			} else {
				state.airbot.id = uni.getStorageSync('configs').default_ai_robot.id;
				uni.setStorageSync('airbot', uni.getStorageSync('configs').default_ai_robot.id)
				console.log(state.airbot.id)
				getChat()
			}
		}
	}
	async function getChat(data) {
		let res = await sheep.$api.activity.getChat({
			id: state.airbot.id,
			form: {
				page_size: 20,
				msg_type: 2
			}
		});
		if (res.code == 0) {
			res.data.messages.forEach((item) => {
				console.log('---parseContent--->',parseContent(item.content))
				let news = parseContent(item.content)
				item.newjson = news;
				// item.content = item.content.replace(/<\/?details\b[^>]*>/gi, '').replace(/Thinking\s*\.{2,}/gi, '')
				// item.content = item.content.replace(/Thinking\s*\.{2,}/gi, '')
			})
			state.list = res.data.messages
			state.sct = 10000
			console.log(state.list)
		}
	}

	function link(url) {
		if (!uni.getStorageSync('token')) {
			uni.navigateTo({
				url: '/pages/login/wxlogo'
			})
		} else {
			uni.navigateTo({
				url,
			})
		}
	}

	onShow(() => {
		if (uni.getStorageSync('userinfo')) {
			state.user = uni.getStorageSync('userinfo').avatar
		}
	});
	onHide(() => {

	});
	onLoad((options) => {
		if (!uni.getStorageSync('airbot')) {
			getAirbots()
		} else {
			state.airbot = uni.getStorageSync('airbot')
			getChat()
		}

	});

	// 下拉刷新
	onPullDownRefresh(() => {

	});

	onPageScroll(() => {});
</script>
<style lang="scss">
	$c: #ad7561;

	view,
	text,
	textarea,
	input {
		box-sizing: border-box;
	}

	image {
		display: block;
		height: auto;
	}

	.null {
		width: 100%;
		padding: 16vh 0;

		image {
			width: 160rpx;
			display: block;
			margin: 0 auto;
		}

		text {
			display: block;
			font-size: 26rpx;
			color: #666;
			text-align: center;
			margin-top: 30rpx;
		}
	}

	.content {
		width: 100%;
		overflow: hidden;
		min-height: 100vh;
		padding: 20rpx 26rpx;
		background: #F5F5F5;
		padding-top: 0;

		.footer {
			width: 100%;
			height: 122rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			padding: 0 24rpx;
			align-items: center;
			justify-content: space-between;
			background: #fff;

			input {
				width: 530rpx;
				height: 80rpx;
				font-size: 28rpx;
				color: #333;
				background: #fff;
				border-radius: 20rpx;
				padding-left: 16rpx;
				border: 1px solid #9E5D45;
			}

			.s {
				color: #D3D3D3;
			}

			image {
				width: 160rpx;
			}
		}

		scroll-view {
			width: 100%;
			height: calc(100vh - 122rpx);

			.item {
				width: 100%;
				// padding: 0 36rpx;
				margin-top: 32rpx;
				display: flex;
				align-items: flex-start;

				&.user {
					flex-direction: row-reverse;

					&>image {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
					}

					&>view {
						color: #fff;
						background: linear-gradient(to right, #6A4D3C, #B7917F);
						border-radius: 36rpx 6rpx 36rpx 36rpx;
					}
				}

				&>image {
					width: 74rpx;
				}

				&>view {
					max-width: 518rpx;
					background: #fff;
					border-radius: 6rpx 36rpx 36rpx 36rpx;
					padding: 22rpx 33rpx;
					margin: 0 14rpx;
					line-height: 1.6;
					font-size: 26rpx;
					color: #666;

					view {
						margin-bottom: 20rpx;
						color: gray;
						background-color: #f8f8f8;
						padding: 8px;
						border-radius: 4px;
					}
				}
			}

			.banner {
				width: 720rpx;
				overflow: hidden;
				padding: 18rpx 22rpx 32rpx 22rpx;
				margin: 0 auto;
				margin-top: 20rpx;
				border-radius: 30rpx;
				background: #fff;

				image {
					width: 202rpx;
				}

				.name {
					display: block;
					font-size: 46rpx;
					color: #000;
					margin-top: 20rpx;
					font-weight: bold;
				}

				.desc {
					display: block;
					font-size: 28rpx;
					color: #666;
					margin-top: 16rpx;
				}
			}
		}
	}
	.xx text{
		color: #000 !important;
	}
</style>