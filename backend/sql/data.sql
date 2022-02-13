-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
DELETE FROM Users;
INSERT INTO Users VALUES ('1', 'jc@ucsc.edu', 'Jack', 'Cooper', 'admin', NULL, '{"id":"1", "name":"Jack Cooper","password":"$2a$10$8y4LYm7f0qMnouiNMlg6puBNiy1siZi3bUEu5FKorTo8IPVxmOJYG", "email":"jc@ucsc.edu", "role":"admin", "workspaces":["CSE 183 Summer 2021", "CSE 130"]}');
INSERT INTO Users VALUES ('2', 'ep@ucsc.edu', 'Emmanuel', 'Pena', 'admin', NULL, '{"id":"2", "name":"Emmanuel Pena", "password":"$2a$10$5TLsDwQXboHiXzTLSeZ01.5pjT76T3SQhyhulsSDST9fnoP.BT5x2", "email":"ep@ucsc.edu", "role": "admin", "workspaces":["CSE 183 Summer 2021", "CSE 130"]}');
INSERT INTO Users VALUES ('3', 'slug@ucsc.edu', 'Sammy', 'Slug', 'member', NULL, '{"id":"3", "name":"Sammy Slug","password":"$2a$10$FwbnonhdgakcpqlWpowVKudAy9Gdtu3LT45TDCux.WS5THA5Bxisi","email":"slug@ucsc.edu","role":"member", "workspaces":["CSE 183 Summer 2021", "Investors"]}');
INSERT INTO Users VALUES ('4', 'turing@ucsc.edu', 'Alan', 'Turing', 'member', NULL, '{"id":"4", "name":"Alan Turing", "password":"$2a$10$mLMIMS9KAKfQKWJsgc3rbuwoiY.kWNKEGxv054OHhlVEPTzCQ8sfq", "email":"turing@ucsc.edu", "role":"member", "workspaces":["CSE 183 Summer 2021", "Investors"]}');
INSERT INTO Users VALUES ('5', 'turin@ucsc.edu', 'Alan', 'Turin', 'member', NULL, '{"id":"5", "name":"Alan Turin", "password":"$2a$10$mLMIMS9KAKfQKWJsgc3rbuwoiY.kWNKEGxv054OHhlVEPTzCQ8sfq", "email":"turin@ucsc.edu", "role":"member", "workspaces":["CSE 130", "Investors"]}');
INSERT INTO Users VALUES ('6', 'turi@ucsc.edu', 'Alan', 'Turi', 'member', NULL, '{"id":"6", "name":"Alan Turi", "password":"$2a$10$mLMIMS9KAKfQKWJsgc3rbuwoiY.kWNKjGxv054OHhlVEPTzCQ8sfq", "email":"turi@ucsc.edu", "role":"member", "workspaces":["CSE 130", "Investors"]}');

-- Workspaces TABLE --
DELETE FROM Workspaces;
INSERT INTO Workspaces(workspacename) VALUES ('CSE 183 Summer 2021');
INSERT INTO Workspaces(workspacename) VALUES ('CSE 130');
INSERT INTO Workspaces(workspacename) VALUES ('Investors');

-- Channels TABLE POPULATION --
DELETE FROM Channels;
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('CSE 183 Summer 2021', '# Assignment 1', '[{"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-18T07:17:54Z", "content":"Hello there"}, {"senderID":1, "from":"Jack Cooper", "date":"2021-07-18T07:55:51Z", "content":"Hey Emmanuel"}, {"senderID":4, "from":"Alan Turing", "date":"2021-07-19T06:12:54Z", "content":"Any1 struggling?"}]');
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('CSE 183 Summer 2021', '# Assignment 2', '[{"senderID":1, "from":"Jake Cooper", "date":"2021-07-19T08:22:44Z", "content":"Easy asg."}, {"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-19T08:37:41Z", "content":"Yeah right.."}, {"senderID":3, "from":"Sammy Slug", "date":"2021-07-19T08:42:57Z", "content":"We got this!"}, {"senderID":4, "from":"Alan Turing", "date":"2021-07-19T09:06:34Z", "content":"Stretch is so confusing"}]');
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('CSE 183 Summer 2021', '# General', '[]');
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('CSE 130', '# Assignment 1', '[{"senderID":3, "from":"Sammy Slug", "date":"2021-07-18T12:16:35Z", "content":"Lets get started."}, {"senderID":1, "from":"Jack Cooper", "date":"2021-07-18T15:25:51Z", "content":"Lets!"}, {"senderID":3, "from":"Sammy Slug", "date":"2021-07-19T02:12:24Z", "content":"Not bad so far.."}]');
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('CSE 130', '# General', '[]');
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('Investors', '# ETH', '[{"senderID":4, "from":"Alan Turing", "date":"2021-07-20T06:14:32Z", "content":"When you guys join Slack, let me know."}]');
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('Investors', '# Bitcoin', '[{"senderID":4, "from":"Alan Turing", "date":"2021-07-20T06:15:33Z", "content":"When you guys join Slack, say something."}]');
INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ('Investors', '# General', '[]');

DELETE FROM Dms;     -- missing names inserts NULL in their table column --
-- Dms ident1 POPULATION --
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('1', '2', 'CSE 183 Summer 2021', '[{"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-20T07:15:23Z", "content":"How is the hw going?"}, {"senderID":1, "from":"Jack Cooper", "date":"2021-07-20T07:29:28Z", "content":"Not bad. And for you?"}, {"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-20T07:33:25Z", "content":"Same here."}]');
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('1', '3', 'CSE 183 Summer 2021', '[{"senderID":1, "from":"Jack Cooper", "date":"2021-07-20T06:14:22Z", "content":"Hey"}, {"senderID":3, "from":"Sammy Slug", "date":"2021-07-20T06:23:28Z", "content":"What is up?"}]');
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('1', '4', 'CSE 183 Summer 2021', '[{"senderID":4, "from":"Alan Turing", "date":"2021-07-21T01:12:29Z", "content":"You needed help with basic?"}, {"senderID":1, "from":"Jack Cooper", "date":"2021-07-21T01:15:22Z", "content":"Yes! Thanks for dming."}]');
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('1', '2', 'CSE 130', '[{"senderID":1, "from":"Jack Cooper", "date":"2021-07-20T07:19:13Z", "content":"We have this class too"}, {"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-20T07:25:32Z", "content":"Lol yup"}]');

-- Dms ident2 POPULATION --
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('2', '1', 'CSE 183 Summer 2021', '[{"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-20T07:15:23Z", "content":"How is the hw going?"}, {"senderID":1, "from":"Jack Cooper", "date":"2021-07-20T07:29:28Z", "content":"Not bad. And for you?"}, {"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-20T07:33:25Z", "content":"Same here."}]');
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('2', '3', 'CSE 183 Summer 2021', '[{"senderID":3, "from":"Sammy Slug", "date":"2021-07-21T02:12:29Z", "content":"Hello!"}, {"senderID":3, "from":"Sammy Slug", "date":"2021-07-21T04:11:29Z", "content":"Heeeeeyy"}]');
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('2', '1', 'CSE 130', '[{"senderID":1, "from":"Jack Cooper", "date":"2021-07-20T07:19:13Z", "content":"We have this class too"}, {"senderID":2, "from":"Emmanuel Pena", "date":"2021-07-20T07:25:32Z", "content":"Lol yup"}]');

-- Dms ident3 POPULATION --
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('3', '1', 'CSE 183 Summer 2021', '[{"senderID":1, "from":"Jack Cooper", "date":"2021-07-20T06:14:22Z", "content":"Hey"}, {"senderID":3, "from":"Sammy Slug", "date":"2021-07-20T06:23:28Z", "content":"What is up?"}]');
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('3', '2', 'CSE 183 Summer 2021', '[{"senderID":3, "from":"Sammy Slug", "date":"2021-07-21T02:12:29Z", "content":"Hello!"}, {"senderID":3, "from":"Sammy Slug", "date":"2021-07-21T04:11:29Z", "content":"Heeeeeyy"}]');

-- Dms ident4 POPULATION --
INSERT INTO Dms(userID, withID, workspacename, chatlog) VALUES ('4', '1', 'CSE 183 Summer 2021', '[{"senderID":4, "from":"Alan Turing", "date":"2021-07-21T01:12:29Z", "content":"You needed help with basic?"}, {"senderID":1, "from":"Jack Cooper", "date":"2021-07-21T01:15:22Z", "content":"Yes! Thanks for dming."}]');


-- SECRETS TABLE POPULATION --
DELETE FROM Secrets;
INSERT INTO Secrets VALUES ('{"secret": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFFgSaYd4Q7Tzr-BjABclmoKZOqmr4"}');
