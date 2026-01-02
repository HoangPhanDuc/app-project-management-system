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