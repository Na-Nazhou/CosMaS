/* Course_Memberships */
CREATE OR REPLACE FUNCTION is_member_in_course(
    users.id%TYPE, 
    semesters.name%TYPE, 
    modules.module_code%TYPE, 
    course_memberships.role%TYPE)
    RETURNS BOOLEAN AS 
    $func$
    BEGIN
    
    PERFORM * 
    FROM course_memberships 
    WHERE user_id = $1 AND 
        semester_name = $2 AND 
        module_code = $3 AND 
        role= $4;
    RETURN FOUND;
    
    END
    $func$ LANGUAGE plpgsql;

/* Accesses */
CREATE OR REPLACE FUNCTION update_accesses(
    character varying[], 
    semesters.name%TYPE, 
    modules.module_code%TYPE, 
    forums.title%TYPE) 
    RETURNS void AS $$
    BEGIN 
        DELETE FROM accesses WHERE semester_name=$2 AND module_code=$3 AND forum_title=$4;
        FOR counter in array_lower($1, 1) .. array_upper($1, 1)
	    LOOP
		    INSERT INTO accesses (group_name, semester_name, module_code, forum_title) VALUES($1[counter], $2, $3, $4);		
	    END LOOP;
    END
    $$ LANGUAGE plpgsql;
