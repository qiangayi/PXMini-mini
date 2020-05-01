const getDefaultState = () => {
	return {
		//加速权限
		rapidAuth: false,
		//记录权限
		archiveAuth: false
	}
}

const state = getDefaultState()

const mutations = {
	SET_RAPIDAUTH: (state, rapidAuth) => {
		state.rapidAuth = rapidAuth
	},
	SET_ARCHIVEAUTH: (state, archiveAuth) => {
		state.archiveAuth = archiveAuth
	}
}

const actions = {
	setRapidAuth({
		commit
	}, auth) {
		commit("SET_RAPIDAUTH", auth)
	},
	setArchiveAuth({commit}, auth){
		commit("SET_ARCHIVEAUTH", auth)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
