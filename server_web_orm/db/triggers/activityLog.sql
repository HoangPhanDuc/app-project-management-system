DROP TRIGGER IF EXISTS trg_projects_after_insert;

CREATE TRIGGER trg_projects_after_insert AFTER INSERT ON projects FOR EACH ROW BEGIN
INSERT INTO
    activity_logs (
        user_id,
        project_id,
        task_id,
        action,
        old_value,
        new_value,
        createdAt,
        updatedAt
    )
VALUES
    (
        NEW.owner_id,
        NEW.id,
        NULL,
        'CREATE_PROJECT',
        NULL,
        JSON_OBJECT (
            'name',
            NEW.name,
            'description',
            NEW.description,
            'status',
            NEW.status,
            'is_active',
            NEW.is_active
        ),
        NOW (),
        NOW ()
    );

END;

DROP TRIGGER IF EXISTS trg_projects_after_update;

CREATE TRIGGER trg_projects_after_update AFTER
UPDATE ON projects FOR EACH ROW BEGIN
INSERT INTO
    activity_logs (
        user_id,
        project_id,
        task_id,
        action,
        old_value,
        new_value,
        createdAt,
        updatedAt
    )
VALUES
    (
        NEW.owner_id,
        NEW.id,
        NULL,
        'UPDATE_PROJECT',
        JSON_OBJECT (
            'name',
            OLD.name,
            'description',
            OLD.description,
            'status',
            OLD.status,
            'is_active',
            OLD.is_active
        ),
        JSON_OBJECT (
            'name',
            NEW.name,
            'description',
            NEW.description,
            'status',
            NEW.status,
            'is_active',
            NEW.is_active
        ),
        NOW (),
        NOW ()
    );

END;

DROP TRIGGER IF EXISTS trg_projects_after_delete;

CREATE TRIGGER trg_projects_after_delete AFTER DELETE ON projects FOR EACH ROW BEGIN
INSERT INTO
    activity_logs (
        user_id,
        project_id,
        task_id,
        action,
        old_value,
        new_value,
        createdAt,
        updatedAt
    )
VALUES
    (
        OLD.owner_id,
        OLD.id,
        NULL,
        'DELETE_PROJECT',
        JSON_OBJECT (
            'name',
            OLD.name,
            'description',
            OLD.description,
            'status',
            OLD.status,
            'is_active',
            OLD.is_active
        ),
        NULL,
        NOW (),
        NOW ()
    );

END;