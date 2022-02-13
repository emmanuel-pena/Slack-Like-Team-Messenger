-- Index Your Tables Here --

-- USER TABLE INDEX --
CREATE INDEX users_idx ON users(ua);

-- SECRETS TABLE INDEX --
CREATE INDEX secrets_idx ON secrets(accessToken);