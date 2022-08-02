import AccessControl from 'accesscontrol';
import { GUEST, MEMBER, ADMIN } from './domains/workspaces/Roles';

const ac = new AccessControl();
ac.grant(GUEST)
	.readOwn('workspace')
	.readAny('member')
	.readAny('interview')
	.readAny('tag')
	.readAny('media');

ac.grant(MEMBER)
	.extend(GUEST)
	.create('workspace')
	.create('interview')
	.deleteOwn('interview')
	.updateAny('interview')
	.create('tag')
	.updateAny('tag')
	.deleteAny('tag')
	.create('media')
	.updateAny('media')
	.deleteOwn('media');

ac.grant(ADMIN)
	.extend(GUEST)
	.extend(MEMBER)
	.create('member')
	.updateAny('member')
	.deleteAny('member')
	.updateAny('workspace')
	.deleteOwn('workspace')
	.deleteAny('interview')
	.deleteAny('media');

export default ac;
