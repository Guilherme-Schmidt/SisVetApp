CREATE TABLE users (
                    id TEXT PRIMARY KEY UNIQUE NOT NULL ,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL

);
