<template>
	<view class="content">
		<up-image class="logo" src="/static/logo.png" width="200rpx" height="200rpx"></up-image>
		<view class="text-area">
			<up-text class="title" :text="title"></up-text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const title = ref('Hello');
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
