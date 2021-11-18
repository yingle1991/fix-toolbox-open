<template>
	<view class="full-wrap">
	<!-- 	<view id="map">
		</view> -->
		<view :class='["cuIcon-location","now-pos"]' @tap="searchPos(posCity)">
			定位城市：{{posCity}}
		</view>
		<view class="result" v-show="showDetail">
			<view class="title">详细信息</view>
			<u-form ref="uForm">
				<u-form-item label="92#:">{{info.p92}}</u-form-item>
				<u-form-item label="95#:">{{info.p95}}</u-form-item>
				<u-form-item label="98#:">{{info.p98}}</u-form-item>
				<u-form-item label="0#:">{{info.p0}}</u-form-item>
				<u-form-item label="89#:">{{info.p89}}</u-form-item>
			</u-form>
		</view>

	</view>
</template>

<script>
	import cityData from '../../common/citydata.js'
	import geocodeUtils from '../../common/geocode-utils.js'
	export default {
		components: {
			// mpvuePicker
		},
		data() {
			return {
				lat: " 39.915",
				lng: '116.404',
				posCity: "",
				nowCity: '',
				showDetail: true,
				searchText: "",
				info:"",
				cityList: [],
				pickerValueDefault: [0, 0],
				themeColor: '#007AFF',
				mode: 'multiLinkageSelector',
				deepLength: 2,
				pickerValueArray: cityData
			}
		},
		mounted() {
			// 默认以当前位置为中心
			uni.getLocation({
				success: res => {
					console.log(res);
					// this.posCity = res.address.city;
					// this.nowCity = res.address.city;
					this.lat = res.latitude;
					this.lng = res.longitude;
					geocodeUtils.tencentGeocode(this.lat, this.lng, this.cityCall);
				}
			});
		},
		methods: {
			searchPos(cityName) {
				let map = this.$refs.map;
				let searchObj = new plus.maps.Search(map);
				searchObj.onPoiSearchComplete = (state, result) => {
					if (state == 0) {
						if (result.currentNumber <= 0) {
							uni.showToast({
								title: '没有检索到结果',
								icon: 'none'
							});
						}
						this.cityList = [];
						for (let i = 0; i < result.currentNumber; i++) {
							let pos = result.getPosition(i);
							this.cityList.push(pos);
						}
					} else {
						uni.showToast({
							title: '检索失败',
							icon: 'none'
						});
					}
				}
				let pt = new plus.maps.Point(this.lng, this.lat);
				// 默认搜索火车站
				let nowPosCIty = this.searchText ? this.searchText : '加油站';
				searchObj.poiSearchInCity(cityName, nowPosCIty);
			},
			chooseCity() {
				// this.$refs.mpvuePicker.show();
			},
			onCancel(e) {
				console.log(e);
			},
			onConfirm(e) {
				let pickerText = e.label.split('-');
				this.searchPos(pickerText[1])
			},
			cityCall(e, province,city) {
				this.posCity = city;
				this.query(province.substr(0,province.length-1));
				console.log(e, city);
			},
			chooseHandle(e) {
				console.log('选择地点的地点信息：');
				console.log(e);
			},
			async query(prov){
				await this.$http
					.get('/weixin/v1/api/wx/tool/getOilPrice/' + prov, {}).then(res=>{
					if(res.code == 200){
						// let array = res.data.phoneArea.split('-');
						console.log(res.data)
						this.empty=false;
						this.showDetail=true;
						this.info=res.data;
					} else {
						this.empty=true;
						this.showDetail=false;
						// this.setData({
						//   empty: true,
						//   showDetail: false,
						// });
					}
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #F5F5FA;
	}
	.now-pos {
		font-size: 30upx;
		padding: 25upx;
	}

	.result {
		padding: 0 4%;
		margin-top: 20upx;
		background-color: #ffffff;
	}

	.result .title {
		padding: 30upx 0 20upx 0;
		font-size: 30upx;
		font-weight: bold;
	}

	.t_input {
		padding: 20upx 4%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.t_input .title {
		height: 80upx;
		line-height: 80upx;
		color: #333;
		font-weight: bold;
		width: 100upx;
	}

	.t_input .inputs {
		color: #333;
		font-size: 32upx;
	}

	.inputs input {
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		display: block;
	}

	.all_btn {
		font-size: 24upx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		width: 150upx;
	}

	.jilu {
		height: 60upx;
		line-height: 60upx;
		padding: 0 4%;
		font-size: 28upx;
		color: #999;
		font-family: Source Han Sans CN;
		font-weight: 400;
		margin-top: 10upx;
	}

	.addclerk {
		width: 80%;
		height: 82upx;
		line-height: 82upx;
		border-radius: 15upx;
		font-size: 32upx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		position: fixed;
		bottom: 30upx;
		left: 50%;
		transform: translateX(-50%);
		background-color: pink;
	}

	.addclerk:active {
		opacity: 0.8;
	}
</style>
<style>
	page {
		background-color: #F5F5FA;
	}
</style>
