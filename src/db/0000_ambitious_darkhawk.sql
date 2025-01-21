-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"name" varchar(100),
	"email" varchar(100) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"sender" varchar(100) NOT NULL,
	"receiver" varchar(100) NOT NULL,
	"message" text NOT NULL
);

*/