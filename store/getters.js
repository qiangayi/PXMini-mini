const getters = {
	token: state => state.user.token,
	userName: state => state.user.name,
	userType: state => state.user.type,
	score: state => state.user.score,
	claseId: state => state.user.claseId,
	claseName: state => state.user.claseName,
	claseStart: state => state.user.claseStart,
	claseEnd: state => state.user.claseEnd,
	claseSellName: state => state.user.claseSellName,
	signed: state => state.user.signed,
	subjectId: state => state.user.subjectId,
	subjectName: state => state.user.subjectName,
	subjectPic: state => state.user.subjectPic,
	boutiques: state => state.user.boutiques,
	bannerList: state => state.user.bannerList,
	sellerClase: state => state.user.sellerClase,
	clientClase: state => state.user.clientClase,
	mobileCode: state => state.user.mobileCode,
	rapidAuth: state => state.auth.rapidAuth,
	archiveAuth: state => state.auth.archiveAuth,
}
export default getters
