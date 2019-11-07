const replies = {};

replies.queries = {
  find_reply:
    'SELECT * FROM replies WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND thread_created_at=$4 AND created_at=$5',
  get_replies_of_forum:
    'SELECT * FROM replies WHERE semester_name=$1 AND module_code=$2 and forum_title=$3 AND thread_created_at=$4',
  create_reply:
    'INSERT INTO replies (semester_name, module_code, forum_title, thread_created_at, created_at, content, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  update_reply:
    'UPDATE replies SET content=$6 WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND thread_created_at=$4 AND created_at=$5',
  delete_reply:
    'DELETE FROM replies WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND thread_created_at=$4 AND created_at=$5'
};

module.exports = replies;
