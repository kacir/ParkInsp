CREATE TABLE parkFootprints
(
  parkNum VARCHAR(50) NOT NULL,
  currName VARCHAR(254) NOT NULL,
  googleLink VARCHAR(254) NOT NULL,
  pastName VARCHAR(254),
  geom geometry(MultiPolygon,4326) NOT NULL,
  PRIMARY KEY (parkNum)
);

CREATE TABLE structures
(
  type VARCHAR(50) NOT NULL,
  label VARCHAR(50),
  geom geometry(MultiPolygon,4326) NOT NULL,
  id SERIAL,
  parkNum VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (parkNum) REFERENCES parkFootprints(parkNum)
);

CREATE TABLE InspectionNotes
(
  inspector VARCHAR(50) NOT NULL,
  inspDate DATE,
  noteType VARCHAR(50) NOT NULL,
  conversion VARCHAR(2),
  note1 VARCHAR(254) NOT NULL,
  geom geometry(Point,4326) NOT NULL,
  public_acc VARCHAR(2),
  note2 VARCHAR(254),
  id SERIAL,
  dataCorr VARCHAR(2),
  maint VARCHAR(2),
  parkNum VARCHAR(50) NOT NULL,
  PRIMARY KEY (id, parkNum),
  FOREIGN KEY (parkNum) REFERENCES parkFootprints(parkNum)
);

CREATE TABLE projectBoundary
(
  type VARCHAR(50),
  geom geometry(MultiPolygon,4326) NOT NULL,
  id SERIAL,
  parkNum VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (parkNum) REFERENCES parkFootprints(parkNum)
);