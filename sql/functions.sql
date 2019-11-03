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
