import {
	login,
	getSign
} from '@/api/user'
import {
	getToken,
	setToken,
} from '@/common/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		// userId: '',
		//0 学生, seller 销售
		type: '',
		claseId: 0,
		claseName: '',
		claseSellName: '',
		claseStart: '',
		claseEnd: '',
		//学分
		score: '',
		//当前课程
		subjectId: 0,
		subjectName: '',
		subjectPic: '',
		signed: false,
		sellerClase: '',
		clientClase: '',
		//精品课程
		boutiques: '',
		bannerList: '',
		mobileCode: 0

		// avatar: ''
	}
}

const state = getDefaultState()

const mutations = {
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_TYPE: (state, type) => {
		state.type = type
	},
	SET_CLASEID: (state, claseId) => {
		state.claseId = claseId
	},
	SET_CLASENAME: (state, claseName) => {
		state.claseName = claseName
	},
	SET_CLASESELLNAME: (state, claseSellName) => {
		state.claseSellName = claseSellName
	},
	SET_CLASESTART: (state, claseStart) => {
		state.claseStart = claseStart
	},
	SET_CLASEEND: (state, claseEnd) => {
		state.claseEnd = claseEnd
	},
	SET_SUBJECTID: (state, subjectId) => {
		state.subjectId = subjectId
	},
	SET_SUBJECTNAME: (state, subjectName) => {
		state.subjectName = subjectName
	},
	SET_SUBJECTPIC: (state, subjectPic) => {
		state.subjectPic = subjectPic
	},
	SET_SCORE: (state, score) => {
		state.score = score
	},
	SET_SIGNED: (state, signed) => {
		state.signed = signed
	},
	SET_SELLERCLASE: (state, clases) => {
		state.sellerClase = clases
	},
	SET_CLIENTCLASE: (state, clases) => {
		state.clientClase = clases
	},
	SET_BOUTIQUES: (state, boutiques) => {
		state.boutiques = boutiques
	},
	SET_BANNERLIST: (state, bannerList) => {
		state.bannerList = bannerList
	},
	SET_MOBILECODE: (state, mobileCode) => {
		state.mobileCode = mobileCode
	}
}

const actions = {
	// user login
	login({
		commit,
		dispatch
	}, userInfo) {
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				const code = loginRes.code;
				return login({
					code
				}).then(response => {
					uni.hideLoading();
					// console.log("login success")
					const res = response.data
					if (res.Success) {
						const data = res.Data
						const {
							token
						} = data
						setToken(token)
						dispatch('initUserInfo', data)
					}
				}).catch(error => {})
			}
		});
	},
	getSign({
		commit
	}) {
		getSign().then(res => {
			console.log(res)
		})
	},
	initUserInfo({
		commit,
		dispatch
	}, data) {
		// console.log("registered", data)
		const {
			registered,
			name,
			type,
			claseId,
			claseName,
			claseStart,
			claseEnd,
			claseSellName,
			subjectId,
			subjectName,
			subjectPic,
			score,
			ArchiveAuth,
			RapidAuth,
			signed,
			sellerClase,
			clientClase,
			boutiques,
			// bannerList
		} = data
		// console.log("boutiques", boutiques)
		//判断是否为注册用户
		if (registered) {
			//初始化用户信息
			commit("SET_NAME", name)
			//type: 0： 班级学员,1销售,2普通学员
			commit("SET_TYPE", type)
			if (type == 0) {
				// console.log("claseid", claseId)
				commit("SET_CLASEID", claseId ? claseId : 0)
				commit("SET_CLASENAME", claseName ? claseName : '')
				commit("SET_CLASESTART", claseStart)
				commit("SET_CLASEEND", claseEnd)
			}
			commit("SET_SUBJECTID", subjectId)
			commit("SET_SUBJECTNAME", subjectName)
			commit("SET_SUBJECTPIC", subjectPic)
			commit("SET_SCORE", score)
			commit("SET_SIGNED", signed)
			commit("SET_SELLERCLASE", sellerClase)
			commit("SET_CLIENTCLASE", clientClase)
			commit("SET_BOUTIQUES", boutiques)
			// commit("SET_BANNERLIST", bannerList)
			commit("SET_CLASESELLNAME", claseSellName)
			// console.log(subjectPic)
			//用户权限
			dispatch("auth/setRapidAuth", RapidAuth == 1, {
				root: true
			})
			dispatch("auth/setArchiveAuth", ArchiveAuth == 1, {
				root: true
			})
		}
	},
	initSubjectInfo({
		commit
	}, data) {
		console.log(data)
		const {
			Id,
			Name,
			Icon
		} = data
		commit("SET_SUBJECTID", Id)
		commit("SET_SUBJECTNAME", Name)
		commit("SET_SUBJECTPIC", Icon)
	},
	setSign({
		commit
	}) {
		commit("SET_SIGNED", true)
	},
	setBannerList({
		commit
	}, bannerList) {
		commit("SET_BANNERLIST", bannerList)
	},
	setMobileCode({
		commit,
		dispatch
	}, mobileCode) {
		const code = mobileCode - 1
		commit("SET_MOBILECODE", code)
		if (code > 0) {
			setTimeout(() => {
				dispatch('setMobileCode', code)
			}, 1000)
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
