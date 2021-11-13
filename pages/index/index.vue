<!-- 首页 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">首页</block>
		</cu-custom>

		<!-- <add-tip :tip="tip" :duration="duration" /> -->

		<!-- banner图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3500"
						duration="600">
						<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item uni-bg-red">
								<image class="swiper-img" :src="item.imageUrl" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 导航栏 -->
		<view class="cu-list grid solids-bottom col-4 no-border">
			<view class="cu-item" v-for="(item, index) in tools" :key="index"
				:style="[{ animation: 'show ' + ((index + 1) * 0.2 + 1) + 's 1' }]" @click="goTool"
				:data-mid="item.mid">
				<view :class="['cuIcon-' + item.cuIcon, 'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.count != 0">
						<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
					</view>
				</view>
				<text>{{ item.name }}</text>
			</view>
		</view>

		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">全网热搜词云图</text>
				<text class="text-ABC text-blue">DataCharts</text>
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasData" id="canvasData" class="charts"></canvas>
		</view>

		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">热门视频</text>
				<text class="text-ABC text-blue">curriculum</text>
			</view>
			<view class="action" @click="goVideo"><text class="text-lg text-grey text-shadow">更多</text></view>
		</view>

		<view class="skill-sequence-panel-content-wrapper">
			<!--左边虚化-->
			<view class="hide-content-box hide-content-box-left"></view>
			<!--右边虚化-->
			<view class="hide-content-box hide-content-box-right"></view>
			<scroll-view scroll-x="true" class="kite-classify-scroll">
				<view class="kite-classify-cell shadow" v-for="(item, index) in curriculum" :key="index">
					<view :class="'nav-li bg-index' + (index + 1)">
						<view class="nav-name">{{ item.name }}</view>
					</view>
					<view class="nav-content">{{ item.content }}</view>
					<view @click="goVideo" class="nav-btn shadow" :class="'bg-index' + (index + 1)">立即学习</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">开源项目</text>
				<text class="text-ABC text-blue">curriculum</text>
			</view>
			<view class="action" @click="goProjectList"><text class="text-lg text-grey text-shadow">更多</text></view>
		</view>

		<view class="cu-card case no-card">
			<view @click="goProject(item.id)" class="cu-item shadow" v-for="(item, index) in projectList" :key="index">
				<view class="image">
					<image :src="item.tImg" mode="widthFix"></image>
					<view class="cu-tag bg-gradual-orange">{{ item.tabs }}</view>
					<view class="cu-bar bg-shadeBottom">
						<text class="text-cut">{{ item.type }}</text>
					</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="margin-lr flex-sub">
							<view class="item-name text-grey text-lg">{{ item.title }}</view>
							<view class="text-gray text-sm flex justify-between">
								{{ item.time }}
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text>
									{{ item.user[0].read }}
									<text class="cuIcon-appreciatefill margin-lr-xs"></text>
									{{ item.user[0].like }}
									<text class="cuIcon-shopfill margin-lr-xs"></text>
									{{ item.user[0].use }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 140rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
	import request from '@/common/request.js';
	// 图表
	import uCharts from "@/components/u-charts/u-charts.js";
	// import addTip from '../../components/wxcomponents/struggler-uniapp-add-tip/struggler-uniapp-add-tip.vue';
	var _self;
	var canvaWord = null;

	export default {
		components: {
			// addTip
		},
		data() {
			return {
				tip: '点击「添加小程序」，下次访问更便捷',
				duration: 1,

				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				pixelRatio: 1,
				pixelRatio: 1,
				// 词云图
				cyData: {
					"series": [{
						"name": "Vue.js",
						"textSize": 28
					}, {
						"name": "JavaScript",
						"textSize": 30
					}, {
						"name": "微信小程序",
						"textSize": 20
					}, {
						"name": "支付宝小程序",
						"textSize": 20
					}, {
						"name": "头条小程序",
						"textSize": 20
					}, {
						"name": "抖音小程序",
						"textSize": 25
					}, {
						"name": "App开发",
						"textSize": 30
					}]
				},
				bannerList: [{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner3.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner1.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner2.png'
					}
				],
				tools: [{
						cuIcon: 'location',
						color: 'red',
						badge: 0,
						count:0,
						mid: '1',
						name: 'IP查询'
					},
					{
							cuIcon: 'phone',
							color: 'orange',
							badge: 0,
							count:0,
							mid: '2',
							name: '手机号查询'
						},
					{
						cuIcon: 'colorlens',
						color: 'yellow',
						count:0,
						badge: 0,
						mid: '3',
						name: '壁纸分享'
					},
					{
						cuIcon: 'discover',
						color: 'green',
						count:0,
						badge: 0,
						mid: '4',
						name: '天气指数'
					},
					{
						cuIcon: 'play_forward_fill',
						color: 'blue',
						badge: 0,
						count:0,
						mid: '5',
						name: '影音工具'
					},
					{
						cuIcon: 'coin',
						color: 'purple',
						count:0,
						badge: 0,
						mid: '6',
						name: '房贷计算器'
					},
					
				],
				curriculum: [{
						name: 'uniapp项目开发',
						content: 'uniapp小程序商城系统开发，实战项目...'
					},
					{
						name: '后台管理系统',
						content: 'vue+iview的后台管理系统建设系统开发...'
					},
					{
						name: 'App模板',
						content: '基于uniapp开发的效率类APP，开发至上线...'
					},
					{
						name: 'PC端官网开发',
						content: 'html/css/jQuery建设的PC端官方门户网站...'
					},
					{
						name: 'uniapp多端打包',
						content: 'uniapp开发完成上线的打包流程，上架商店等...'
					}
				],
				projectList: []
			};
		},
		watch: {},
		mounted() {
			console.log(this.projectList);
			this.getData();
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(420);
			console.log("lele",_self.cyData.series)
			this.getServerData();
		},
		// onLoad() {
		// 	_self = this;
		// 	this.cWidth = uni.upx2px(750);
		// 	this.cHeight = uni.upx2px(420);
		// 	console.log("lele",_self.cyData.series)
		// 	this.getServerData();
		// },
		methods: {
			getServerData() {
				_self.showData("canvasData", this.Data);
			},
			// 词云图
			showData(canvasId, chartData) {
				canvaWord = new uCharts({
					// $this: _self,
					// canvasId: canvasId,
					context:uni.createCanvasContext(canvasId,_self),
					type: 'word',
					background: '#ffffff',
					pixelRatio: _self.pixelRatio,
					series: _self.cyData.series,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						word: {
							type: 'normal'
						}
					}
				});
			},
			getData() {
				console.log('数据加载');
				let opts = {
					url: 'json/project.json',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.statusCode == 200) {
						this.projectList = res.data.data;
					} else {}
				});
			},
			scroll: function(e) {
				console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			goTool: function(e) {
				console.log(e.currentTarget.dataset.mid)
				// if (e.currentTarget.dataset.mid == 1 || e.currentTarget.dataset.mid == 2) {
				// 	uni.navigateTo({
				// 		url: '../timeline?mid=' + e.currentTarget.dataset.mid
				// 	});
				// } else if (e.currentTarget.dataset.mid == 3) {
				// 	uni.navigateTo({
				// 		url: '../project/list'
				// 	});
				// } else if (e.currentTarget.dataset.mid == 4) {
				// 	this.$emit('ShowNews', 'news')
				// 	console.log('文章资讯')

				// }
			},
			goProjectList() {
				uni.navigateTo({
					url: '../project/list'
				});
			},
			goProject(id) {
				uni.navigateTo({
					url: '../project/project?proId=' + id
				});
			},
			goVideo() {
				uni.navigateTo({
					url: '../video'
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.chartsMain {
		width: 750rpx;
		height: 450rpx;
		padding-top: 15rpx;
		background: #fff;
		margin-bottom: 24rpx;
		border-top: 2rpx solid #f2f2f2;

		.charts {
			width: 750rpx;
			height: 450rpx;
			box-sizing: border-box;
		}
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	/*左右渐变遮罩*/
	.hide-content-box {
		position: absolute;
		top: 0;
		height: 100%;
		width: 10px;
		z-index: 2;
	}

	.hide-content-box-left {
		left: 0;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.hide-content-box-right {
		right: 0;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.kite-classify-scroll {
		width: 100%;
		height: 380rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.kite-classify-cell {
		display: inline-block;
		width: 266rpx;
		height: 370rpx;
		margin-right: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(26, 26, 26, 0.2);
	}

	.nav-li {
		padding: 40rpx 30rpx;
		width: 100%;
		background-image: url(https://s1.ax1x.com/2020/06/27/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: '';
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: '';
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-content {
		width: 100%;
		padding: 15rpx;
		display: inline-block;
		overflow-wrap: break-word;
		white-space: normal;
	}

	.nav-btn {
		width: 200rpx;
		height: 60rpx;
		margin: 8rpx auto;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}

	.bg-index1 {
		background-color: #19cf8a;
		color: #fff;
	}

	.bg-index2 {
		background-color: #954ff6;
		color: #fff;
	}

	.bg-index3 {
		background-color: #5177ee;
		color: #fff;
	}

	.bg-index4 {
		background-color: #f49a02;
		color: #fff;
	}

	.bg-index5 {
		background-color: #ff4f94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #7fd02b;
		color: #fff;
	}

	.item-name {
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>
