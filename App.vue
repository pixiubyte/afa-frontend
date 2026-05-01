<script setup>
  import { onLaunch, onShow, onError } from '@dcloudio/uni-app';
  import { ShoproInit } from './sheep';
  import sheep from '@/sheep';
  import {
  	baseUrl
  } from '@/sheep/config';

  onLaunch(() => {
     gitConfigs()
  });

  onError((err) => {
    console.log('AppOnError:', err);
  });

  onShow(() => {
	
	 
  });
  async function gitConfigs(){
	   let res = await sheep.$api.activity.gitConfigs();
	   if(res.code == 0){
		   uni.setStorageSync('configs', res.data)
	   }
  }
</script>

<style lang="scss">
  @import '@/sheep/scss/index.scss';
</style>
