import { login } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // token: getToken(),
    name: '',
	userId: '',
	//stu 学生, seller 销售
	type: '',
	//学分
	score: ''
    // avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
	  state.userId = userId
  },
  SET_TYPE: (state, type) => {
	  state.type = type
  },
  SET_SCORE: (state, score) => {
	  state.score = score
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
		
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
		    const code = loginRes.code;
			
			  return  login({ code }).then(response => {
					console.log(1)
			      const data = response
					console.log(data)
			      // resolve()
			    }).catch(error => {
			      // reject(error)
			    })
		  }
		});
		
		
  //   return  login({ code: 123 }).then(response => {
		// console.log(1)
  //       const data = response
		// console.log(data)
  //       // resolve()
  //     }).catch(error => {
  //       // reject(error)
  //     })
	  
	  
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (response.status && response.status === 500) {
          resolve()
          return
        }
        const { Data: data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { Name, avatar } = data

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

