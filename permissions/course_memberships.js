const db = require('../db');
const users = require('../sql/users');
const { passedAny, passedAll, notPass, isAdmin, isInCourse, isProfessorInCourse } = require('./helpers');

function canIndexMembers(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isInCourse(user, semester_name, module_code));
}

function canAddProfessor(user) {
  return isAdmin(user);
}

function canAddNonProfessor(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canAddSomeMember(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canAddMemberOfRole(user, role, semester_name, module_code) {
  if (role === 'professor') {
    return canAddProfessor(user);
  }
  return canAddSomeMember(user, semester_name, module_code);
}

function canDeleteSomeMember(user, semester_name, module_code) {
  return canAddSomeMember(user, semester_name, module_code);
}

async function canDeleteMember(user, user_id, semester_name, module_code) {
  const memberToDelete = await db.query(users.queries.find_user_by_id, [user_id]).then(data => data.rows[0]);
  return passedAny(
    isAdmin(user),
    passedAll(
      isProfessorInCourse(user, semester_name, module_code),
      notPass(isProfessorInCourse(memberToDelete, semester_name, module_code))
    )
  );
}

module.exports = {
  canIndexMembers,
  canAddNonProfessor,
  canAddProfessor,
  canAddSomeMember,
  canAddMemberOfRole,
  canDeleteSomeMember,
  canDeleteMember
};
