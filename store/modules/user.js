import {
	login
} from '@/api/user'
import {
	getToken,
	setToken
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
		//学分
		score: '',
		//当前课程
		subjectId: 0,
		subjectName: '',
		subjectPic: '',
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
					const res = response.data
					if (res.Success) {
						const {token} = res.Data
						setToken(token)
						console.log(token)
						dispatch('initUserInfo', res.Data)
					}
				}).catch(error => {})
			}
		});
	},
	initUserInfo({
		commit
	}, data) {
		const {
			registered,
			name,
			type,
			claseId,
			claseName,
			subjectId,
			subjectName,
			subjectPic,
			score
		} = Data
		//判断是否为注册用户
		if (registered) {
			//初始化用户信息
			commit("SET_NAME", name)
			//type: 0： 班级学员,1销售,2普通学员
			commit("SET_TYPE", type)
			if (type == 1) {
				commit("SET_CLASEID", claseId)
				commit("SET_CLASENAME", subjectName)
			}
			commit("SET_SUBJECTID", subjectId)
			commit("SET_SUBJECTNAME", subjectName)
			commit("SET_SUBJECTPIC", subjectPic)
			commit("SET_SCORE", score)
		}
	},
	// get user info
	getInfo({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			getInfo().then(response => {
				if (response.status && response.status === 500) {
					resolve()
					return
				}
				const {
					Data: data
				} = response

				if (!data) {
					reject('Verification failed, please Login again.')
				}

				const {
					Name,
					avatar
				} = data

				commit('SET_NAME', Name)
				commit('SET_AVATAR', avatar)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
