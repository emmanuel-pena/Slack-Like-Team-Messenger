-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
-- USERS TABLE --
DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
   id   VARCHAR(32) PRIMARY KEY,
   email VARCHAR(32) NOT NULL,
   firstName VARCHAR(32),
   lastName VARCHAR(32),
   active BOOLEAN DEFAULT false,
   fullName  VARCHAR(32),
   password_hash TEXT,
   workspaces   jsonb,
   username VARCHAR(32) NOT NULL,
   UNIQUE (email),
   UNIQUE (username)
);

-- WORKSPACES TABLE --
DROP TABLE IF EXISTS Workspaces;
CREATE TABLE Workspaces(
    workspacename VARCHAR(32) PRIMARY KEY,
    admins jsonb
);

-- CHANNELS TABLE --
DROP TABLE IF EXISTS Channels;
CREATE TABLE Channels(
    workspacename VARCHAR(32),
    channelname VARCHAR(16),
    chatlog jsonb,
    PRIMARY KEY (workspacename, channelname),
    FOREIGN KEY (workspacename) REFERENCES Workspaces(workspacename)
);

DROP TABLE IF EXISTS Dms;
CREATE TABLE Dms(
    userID VARCHAR(32),
    withID VARCHAR(32),
    workspacename VARCHAR(32),
    chatlog jsonb,
    PRIMARY KEY (userID, withID, workspacename),
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (withID) REFERENCES Users(id),
    FOREIGN KEY (workspacename) REFERENCES Workspaces(workspacename)
);

-- SECRETS TABLE --
DROP TABLE IF EXISTS Secrets;
CREATE TABLE Secrets(accessToken jsonb);
