-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).
CREATE TABLE "covid_trends" (
    "index" INTEGER   ,
    "date" VARCHAR   ,
    "numconf" FLOAT   ,
    "numtestedtoday" FLOAT   ,
    "numtoday" FLOAT   ,
    "numdeathstoday" FLOAT  ,
    "numactive" FLOAT   ,
    "CERB" FLOAT   ,
    "Mask" FLOAT  ,
    "Bike" FLOAT   ,
    "Zoom" FLOAT   ,
    "Patio" FLOAT  ,
    CONSTRAINT "pk_covid_trends" PRIMARY KEY (
        "index"
     )
);

CREATE TABLE "canada_covid" (
    "index" INTEGER   ,
    "date" VARCHAR   ,
    "prname" VARCHAR   ,
    "numconf" FLOAT  ,
    "numdeaths" FLOAT   ,
    "numtoday" FLOAT  ,
    "numdeathstoday" FLOAT ,
    "numtested" FLOAT  ,
    "numtestedtoday" FLOAT   ,
    "numrecover" FLOAT   ,
    "numrecoveredtoday" FLOAT  ,
    "numactive" FLOAT   ,
    "population" FLOAT  ,
    "latitude" FLOAT  ,
    "longitude" FLOAT   ,
    CONSTRAINT "pk_canada_covid" PRIMARY KEY (
        "index"
     )
);

