BEGIN TRANSACTION;
CREATE TABLE "ObjectCategory" (
        `id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        `name`  TEXT NOT NULL,
		`is_deleted`    INTEGER DEFAULT 0
);
INSERT INTO "ObjectCategory" VALUES(1,'Percussions', 0);
INSERT INTO "ObjectCategory" VALUES(2,'Instruments à cordes', 0);
INSERT INTO "ObjectCategory" VALUES(3,'Instruments à vent', 0);
CREATE TABLE "UserType" (
        `id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        `name`  TEXT NOT NULL
);
INSERT INTO "UserType" VALUES(1,'Etudiant');
INSERT INTO "UserType" VALUES(2,'Professeur');
INSERT INTO "UserType" VALUES(3,'Administrateur');
INSERT INTO "UserType" VALUES(4,'Externe');
CREATE TABLE "Object" (
        `id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        `category`      INTEGER,
        `name`  TEXT,
        `pic`   TEXT,
        `buy_date`      DATETIME,
        `price` INTEGER,
        `ref`   TEXT,
        `serial`        TEXT,
        `can_out`       INTEGER DEFAULT 1,
        `is_out`        INTEGER DEFAULT 0,
        `is_deleted`    INTEGER DEFAULT 0
);
CREATE TABLE "User" (
        `id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        `type`  INTEGER NOT NULL,
        `name`  TEXT NOT NULL,
        `phone` TEXT,
        `email` TEXT,
        `pic`   TEXT,
        `is_deleted`    INTEGER DEFAULT 0
);
CREATE TABLE "Borrow" (
        `id`    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        `objid` INTEGER NOT NULL,
        `usrid` INTEGER NOT NULL,
        `out_date`      INTEGER,
        `return_date`   INTEGER
);
COMMIT;
