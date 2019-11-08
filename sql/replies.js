const replies = {};

replies.queries = {
  find_reply:
    'SELECT * FROM replies WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND thread_created_at=$4 AND created_at=$5',
  get_replies_of_thread:
    'SELECT r.created_at, r.content, r.semester_name, r.module_code, r.forum_title, r.thread_created_at, u.name AS author_name ' +
    'FROM replies r LEFT JOIN users u ON r.author_id=u.id ' +
    'WHERE semester_name=$1 AND module_code=$2 and forum_title=$3 AND thread_created_at=$4 ' +
    'ORDER BY r.created_at',
  create_reply:
    'INSERT INTO replies (semester_name, module_code, forum_title, thread_created_at, created_at, content, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  update_reply:
    'UPDATE replies SET content=$6 WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND thread_created_at=$4 AND created_at=$5',
  delete_reply:
    'DELETE FROM replies WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND thread_created_at=$4 AND created_at=$5'
};

module.exports = replies;
