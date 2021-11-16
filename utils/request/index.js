/* eslint-disable */
import Request from './request';
import indexConfig from '@/config/index.config';

const http = new Request();
// request全局参数设置
http.setConfig(config => {
	/* 设置全局配置 */
	config.baseUrl = indexConfig.baseUrl; /* 根域名不同 */
	const systemInfo = uni.getSystemInfoSync();
	const systemInfoHeaders = {
		'device-name': systemInfo.brand, // 设备名称
		width: systemInfo.screenWidth, // 屏幕宽度
		height: systemInfo.screenHeight, // 屏幕高度
		os: systemInfo.platform, // 客户端平台
		'os-version': systemInfo.system // 操作系统版本
	};
	config.header = {
		...config.header,
		...systemInfoHeaders
	};
	return config;
});

let isRefreshing = false;
let requests = [];
http.interceptor.request(
	config => {
		/* 请求之前拦截器 之后增加认证*/
		// config.header['Authorization'] = store.state.accessToken;
		// 单商户
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

http.interceptor.response(
	async response => {
		console.log(response.data.code)
		/* 请求之后拦截器 */
		switch (parseInt(response.data.code)) {
			case 200:
				return response.data;
			case 400:
				this.$refs.uToast.show({
					title: '错误的请求',
					type: 'error'
				})
				return Promise.reject(response.data.msg);
				break;
			case 401:
				isRefreshing = false;
				this.$refs.uToast.show({
					title: '权限不允许',
					type: 'error'
				})
				
				break;
			case 405:
				this.$refs.uToast.show({
					title: '当前操作不被允许',
					type: 'error'
				})
				return Promise.reject(response.data.msg);
			case 404:
				this.$refs.uToast.show({
					title: response.data.msg,
					type: 'error'
				})
				return Promise.reject(response.data.msg);
			case 429:
				this.$refs.uToast.show({
					title: "请求过多，先休息一下吧",
					type: 'error'
				})
				return Promise.reject(response.data.msg);
			case 500:
				// mHelper.toast('网络异常，请再次提交');
				return Promise.reject(response.data.msg);
			case 3003://重复内容
				return response.data;
			default:
				this.$refs.uToast.show({
					title: response.data.msg,
					type: 'error'
				})
				return Promise.reject(response.data.msg);
		}
	},
	error => {
		return Promise.reject(error);
	}
);

export { http };
