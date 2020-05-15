const getters = {
	token: state => state.user.token,
	userName: state => state.user.name,
	userType: state => state.user.type,
	score: state => state.user.score,
	claseId: state => state.user.claseId,
	signed: state => state.user.signed,
	subjectId: state => state.user.subjectId,
	subjectName: state => state.user.subjectName,
	subjectPic: state => state.user.subjectPic,
	boutiques: state => state.user.boutiques,
	rapidAuth: state => state.auth.rapidAuth,
	archiveAuth: state => state.auth.archiveAuth,
	sellerClase: state => state.auth.sellerClase,
	clientClase: state => state.auth.clientClase
}
export default getters
