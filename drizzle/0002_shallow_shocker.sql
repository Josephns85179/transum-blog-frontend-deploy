PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postId` integer,
	`content` text NOT NULL,
	`createdAt` text DEFAULT '2026-11-23T03:00:52.982Z' NOT NULL,
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "postId", "content", "createdAt") SELECT "id", "postId", "content", "createdAt" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` text DEFAULT '2026-11-23T03:00:52.980Z' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "title", "content", "createdAt") SELECT "id", "title", "content", "createdAt" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;