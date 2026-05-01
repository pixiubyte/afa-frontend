<template>
  <view class="content">
    <view class="userInfo">
      <view class="user">
        <view class="fl">
          <view class="avatar">
            <button open-type="chooseAvatar" @chooseavatar="chooseavatar"
              ><image
                :src="state.userInfo.avatar ? state.userInfo.avatar : '../../static/txx.png'"
                mode="aspectFill"
              ></image
            ></button>
          </view>
          <input
            type="nickname"
            @blur="nicknames"
            :value="state.userInfo.nickname ? state.userInfo.nickname : '点击修改昵称'"
          />
        </view>
        <view class="btn" @click="loginOut">退出</view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { reactive } from 'vue';
  import { onLoad, onPageScroll, onPullDownRefresh, onShow, onHide } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  const state = reactive({
    userInfo: {
      avatar: '',
      nickname: '',
    },
  });
  function nicknames(e) {
    state.userInfo.nickname = e.detail.value.trim();
    upUserinfo('nickname', e.detail.value);
  }

  function chooseavatar(e) {
    let url = e.detail.avatarUrl;

    const tempFilePaths = url;
    let extName = tempFilePaths.match(/\.([^\.]+)$/)[1];
    uni.showLoading({
      title: '上传中',
    });
    getUploadInfo(extName, function (info) {
      info.filePath = tempFilePaths;
      uploadFile(info, function (err, fileUrl, put_key) {
        uni.hideLoading();
        state.userInfo.avatar = fileUrl;
        upUserinfo('avatar');
      });
    });
  }

  // 更新用户资料
  async function upUserinfo(type, name) {
    let data = {};
    if (type == 'avatar') {
      data = {
        avatar: state.userInfo.avatar,
      };
    }
    if (type == 'nickname') {
      data = {
        nickname: name,
      };
    }
    let res = await sheep.$api.activity.upUserinfo(data);
    if (res.code == 0) {
    }
  }

  // 获取个人信息
  async function getUserinfo() {
    let res = await sheep.$api.activity.getUserinfo();
    if (res.code == 0) {
      state.userInfo = res.data;
      uni.setStorageSync('userinfo', res.data);
    }
  }

  function loginOut() {
    uni.removeStorageSync('userinfo');
    uni.removeStorageSync('token');
    uni.navigateTo({
      url: '/pages/login/wxlogo',
    });
  }

  var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  };

  var uploadFile = function (opt, callback) {
    var formData = {
      key: opt.put_key,
      success_action_status: 200,
    };
    if (opt.security_token) formData['x-cos-security-token'] = opt.security_token;
    if (opt.authorization) formData['Authorization'] = opt.authorization;

    uni.uploadFile({
      url: opt.put_host,
      filePath: opt.filePath,
      name: 'file',
      formData: formData,
      success: (res) => {
        var fileUrl = opt.put_host + '/' + camSafeUrlEncode(opt.put_key).replace(/%2F/g, '/');
        callback && callback(null, fileUrl, opt.put_key);
      },
      error(err) {
        callback && callback(err);
      },
    });
  };

  async function getUploadInfo(options, callback) {
    let res = await sheep.$api.activity.getPutsign({
      c: 'avatar',
      ext: options,
    });
    callback(res.data);
  }

  onShow(() => {
    getUserinfo();
  });
  onHide(() => {});
  onLoad((options) => {});

  // 下拉刷新
  onPullDownRefresh(() => {});

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

  .content {
    width: 100%;
    overflow: hidden;
    min-height: 100vh;
    background-image: url('https://mmgpt-1313548374.cos.ap-shanghai.myqcloud.com/mp/static/userbg.jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: #f5f5f5;
    padding: 180rpx 24rpx;
    .userInfo {
      width: 100%;
      border-radius: 20rpx;
      background: #fff;
      padding: 120rpx 25rpx 40rpx 30rpx;
      position: relative;
      .user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: 0;
        width: 100%;
        top: -60rpx;
        padding: 0 16rpx 0 52rpx;
        .btn {
          width: 108rpx;
          height: 50rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ad7561;
          font-size: 24rpx;
          color: #fff;
          transform: translateY(20rpx);
          border-radius: 40rpx;
        }
        .fl {
          display: flex;
          align-items: center;
          .avatar {
            width: 158rpx;
            height: 158rpx;
            overflow: hidden;
            border-radius: 50%;
            button {
              background: none;
              border: none;
              width: 158rpx;
              height: 158rpx;
              line-height: 1;
              overflow: hidden;
              border-radius: 50%;
              padding: 0;
              margin: 0;
              &::after {
                display: none;
              }
              &::before {
                display: none;
              }
              image {
                width: 100%;
                border-radius: 50%;
                height: 100%;
                border: 4px solid #fff;
                box-sizing: border-box;
                display: block;
              }
            }
          }
          input {
            width: 300rpx;
            height: 50rpx;
            border: none;
            font-size: 34rpx;
            background: none;
            font-weight: bold;
            padding-left: 20rpx;
            transform: translateY(10rpx);
          }
          text {
            font-size: 34rpx;
            font-weight: bold;
            margin-left: 20rpx;
            transform: translateY(16rpx);
            color: #000;
          }
        }
      }
    }
  }
</style>
