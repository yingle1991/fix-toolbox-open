<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content"> 今日语句</block>
		</cu-custom>
		<scroll-view scroll-y class="page">
			<view class="cu-card case" >
				<view class=" shadow">
					<view class="image">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix">
						</image>
						<view class="cu-tag shuli" style="right: 24px;">{{getLunarDay.dateStr}}</view>
						<view class="cu-tag bg-grey shuli" style="height: 80px;">{{getLunarDay.lunarYear}}</view>
						<view class="cu-bar">
							<!-- <text class="text-cut">19</text> -->
						<!-- 	<view content="19" style="--content:'19'" class="_span">19</view> -->
						<view :style="mystyle" class="_span">{{date}}</view>
						</view>
					</view>
					<view class="bg-white" style="padding-right: 10px;">
						<view class="text-right">{{dateStr}}</view>
						</view>
					<view class="padding bg-white" style="padding-top: 80px;">
						<view class="text-left padding">喜欢谈论痛苦的，往往是不识愁滋味的少年，而饱尝人间苦难的老年贝多芬，却唱起了欢乐颂。</view>
						<!-- <view class="text-center padding">我于杀戮之中绽放 ,亦如黎明中的花朵</view> -->
						<view class="text-right padding">周国平</view>
					</view>
					<!-- 	<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg"
								style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
							</view>
							<view class="content flex-sub">
								<view class="text-grey">正义天使 凯尔</view>
								<view class="text-gray text-sm flex justify-between">
									十天前
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
										<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
										<text class="cuIcon-messagefill margin-lr-xs"></text> 30
									</view>
								</view>
							</view>
						</view>
					</view>-->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getLunar
	} from '../../components/chinese_lunar_calendar/lunar_calendar.js';
	var weeks=new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	export default {
		data() {
			return {
				getLunarDay: '',
				mystyle:"",
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				date: new Date().getDate(),
				day:new Date().getDay(),
				week:'',
				dateStr:"",
			}
		},
		mounted() {
			// 获取农历
			this.getLunarDay = getLunar(this.year, this.month, this.date)
			this.dateStr=(this.year+"."+this.month+"."+this.date+" "+weeks[this.day]);
			this.mystyle='--content:'+"'"+this.date+"'";
			console.log(this.date);
		},
		methods: {


		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.text-cut {
		font-size: 168upx;
	}

	._span {
		font-size: 150upx;
		font-weight: 900;
		color: black;
		font-family: 'Courier New', Courier, monospace;
	}

	.left {
		margin-top: 20vh;
		position: absolute;
	}

	._span::before {
		position: absolute;
		height: 50%;
		content: var(--content);
		overflow: hidden;
		color: white;
		z-index: 999;
	}

	.cu-card.case .image .cu-bar {
		position: absolute;
		bottom: -42px;
		width: 100%;
		background-color: transparent;
		padding: 0px 16px;
		z-index: 99;
	}

	.cu-tag {
		font-size: 12px;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0px 8px;
		height: 25px;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		white-space: pre-wrap;
	}
	.shuli{ margin:0 auto;width:20px;
	height: 100px;
	line-height:24px;border:1px solid #333} 
</style>
