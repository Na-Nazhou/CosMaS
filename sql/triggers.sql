/* Semesters */
CREATE OR REPLACE FUNCTION validate_semester() RETURNS TRIGGER AS $$
    BEGIN
    IF TG_OP = 'INSERT' THEN
        IF EXISTS (
            SELECT 1
            FROM semesters 
            WHERE start_time <= NEW.end_time 
                AND end_time >= NEW.start_time) THEN
            RAISE EXCEPTION 'Semesters cannot have overlapped time intervals';
        END IF;
    END IF;

    IF TG_OP = 'UPDATE' THEN
        IF EXISTS (
            SELECT 1
            FROM semesters 
            WHERE start_time != OLD.start_time 
                AND end_time != OLD.end_time 
                AND start_time <= NEW.end_time 
                AND end_time >= NEW.start_time) THEN
            RAISE EXCEPTION 'Semesters cannot have overlapped time intervals';
        END IF;
    END IF;

    RETURN NEW;
    END; 
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS validate_semester ON semesters;
CREATE TRIGGER validate_semester
BEFORE INSERT OR UPDATE ON semesters
FOR EACH ROW EXECUTE PROCEDURE
validate_semester();

/* Course request */
CREATE OR REPLACE FUNCTION enrol_student()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO course_memberships values ('student', NEW.semester_name, NEW.module_code, NEW.requester_id);
        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;

CREATE TRIGGER enrol_on_request_approval
AFTER UPDATE ON course_requests
FOR EACH ROW WHEN (NEW.is_approved = true)
EXECUTE PROCEDURE enrol_student();
