const getters = {
	token: state => state.user.token,
	userName: state => state.user.name,
	subjectId: state => state.user.subjectId,
	subjectName: state => state.user.subjectName,
	subjectPic: state => state.user.subjectPic,
	rapidAuth: state => state.auth.rapidAuth,
	archiveAuth: state => state.auth.archiveAuth,
}
export default getters
