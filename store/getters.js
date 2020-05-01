const getters = {
	token: state => state.user.token,
	userName: state => state.user.name,
	subjectName: state => state.user.subjectName,
	subjectPic: state => state.user.subjectPic,
	rapidAuth: state => state.auth.rapidAuth
}
export default getters
