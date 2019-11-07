const threads = {};

threads.queries = {
  find_thread: 'SELECT * FROM threads WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND created_at=$4',
  get_threads_info_by_forum:
    'SELECT t.semester_name AS semester_name, t.module_code AS module_code, t.forum_title AS forum_title, u.name AS author_name, ' +
    't.created_at AS created_at, t.title AS title, t.content AS content, COUNT(r.created_at) AS replies_count, MAX(r.created_at) AS latest_reply_time ' +
    'FROM threads t LEFT JOIN users u ON t.author_id=u.id ' +
    'LEFT JOIN replies r ON t.semester_name=r.semester_name AND t.module_code=r.module_code AND t.forum_title=r.forum_title AND t.created_at=r.thread_created_at ' +
    'WHERE t.semester_name=$1 AND t.module_code=$2 AND t.forum_title=$3 ' +
    'GROUP BY(t.semester_name, t.module_code, t.forum_title, t.created_at, u.name)',
  create_thread:
    'INSERT INTO threads (semester_name, module_code, forum_title, created_at, title, content, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  update_thread:
    'UPDATE threads SET title=$5, content=$6 WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND created_at=$4',
  delete_thread: 'DELETE FROM threads WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND created_at=$4'
};

module.exports = threads;
