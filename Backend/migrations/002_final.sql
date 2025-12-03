-- I ENABLE UUID + JSON FUNCTIONS (optional but useful)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-----------------------------------------------------------
-- I USERS TABLE
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,               -- I AUTO INCREMENT ID
                                     username TEXT UNIQUE NOT NULL,       -- I UNIQUE USERNAME
                                     password TEXT NOT NULL,              -- I HASHED PASSWORD
                                     role TEXT NOT NULL,                  -- I "creator" OR "player"
                                     classroom JSONB                      -- I OPTIONAL JSONB FIELD
);

-----------------------------------------------------------
-- I CLASSROOMS TABLE
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS classrooms (
                                          id SERIAL PRIMARY KEY,               -- I AUTO INCREMENT ID
                                          name TEXT NOT NULL,                  -- I CLASSROOM NAME
                                          users JSONB,                         -- I LIST OF USERS
                                          quizzes JSONB                        -- I LIST OF QUIZZES IDs OR META
);

-----------------------------------------------------------
-- I QUIZ TYPE ENUM
-----------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quiz_type_enum') THEN
CREATE TYPE quiz_type_enum AS ENUM (
            'science',
            'history',
            'math',
            'geography',
            'literary',
            'sports'
        );
END IF;
END
$$;

-----------------------------------------------------------
-- I QUIZZES TABLE
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS quizzes (
                                       id SERIAL PRIMARY KEY,               -- I AUTO INCREMENT ID
                                       classroomid INTEGER NOT NULL,        -- I FK TO CLASSROOMS
                                       type quiz_type_enum NOT NULL,        -- I QUIZ CATEGORY ENUM
                                       data JSONB NOT NULL,                 -- I STORES NAME + QUESTIONS

                                       CONSTRAINT quizzes_classroomid_fkey
                                       FOREIGN KEY (classroomid)
    REFERENCES classrooms(id)
    ON DELETE CASCADE
    );

-----------------------------------------------------------
-- I OPTIONAL: ADD A DEFAULT CLASSROOM
-----------------------------------------------------------
INSERT INTO classrooms (name, users, quizzes)
VALUES ('Default Classroom', '[]'::jsonb, '[]'::jsonb)
    ON CONFLICT DO NOTHING;
