const TokenKey = 'pxmini_token'

export function getToken() {
	return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
	uni.setStorage({
    key: TokenKey,
    data: token,
    success: function () {
        console.log('success');
    }
});
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
}
