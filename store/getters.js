const getters = {
	token: state => state.user.token,
	userName: state => state.user.name,
	subjectName: state => state.user.subjectName,
	subjectPic: state => state.user.subjectPic,
}
export default getters
