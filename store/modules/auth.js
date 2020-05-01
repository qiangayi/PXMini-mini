const getDefaultState = () => {
	return {
		rapidAuth: false
	}
}

const state = getDefaultState()

const mutations = {
	SET_RAPIDAUTH: (state, rapidAuth) => {
		state.rapidAuth = rapidAuth
	}
}

const actions = {
	setRapidAuth({
		commit
	}, auth) {
		commit("SET_RAPIDAUTH", auth)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
