<template>
  <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
    <view v-for="(item, index) in dataList" :key="index">
      <u-cell :title="`列表长度-${index + 1}`">
        <template #icon>
          <u-avatar
            shape="square"
            size="35"
            :src="item"
            custom-style="margin: -3px 5px -3px 0"
          />
        </template>
      </u-cell>
    </view>
  </z-paging>
</template>

<script setup lang="ts">
const pagingRef = ref<InstanceType<typeof zPaging> | null>(null);
const dataList = ref<string[]>([]);

const urls: string[] = [
  'https://picsum.photos/100/100?random=1',
  'https://picsum.photos/100/100?random=2',
  'https://picsum.photos/100/100?random=3',
  'https://picsum.photos/100/100?random=4',
  'https://picsum.photos/100/100?random=5',
  'https://picsum.photos/100/100?random=6',
  'https://picsum.photos/100/100?random=7',
  'https://picsum.photos/100/100?random=8',
  'https://picsum.photos/100/100?random=9',
  'https://picsum.photos/100/100?random=10',
];

function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo);
  console.log('[ pageSize ] >', pageSize);
  // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  // 这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过pagingRef.value.complete(请求回来的数组)将请求结果传给z-paging
  setTimeout(() => {
    // 1秒之后停止刷新动画
    const list = [];
    for (let i = 0; i < 30; i++)
      list.push(urls[uni.$u.random(0, urls.length - 1)]);

    pagingRef.value?.complete(list);
  }, 1000);
  // this.$request
  //   .queryList({ pageNo, pageSize })
  //   .then(res => {
  //     // 请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
  //     pagingRef.value.complete(res.data.list);
  //   })
  //   .catch(res => {
  //     // 如果请求失败写pagingRef.value.complete(false)，会自动展示错误页面
  //     // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
  //     // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
  //     pagingRef.value.complete(false);
  //   });
}
</script>
