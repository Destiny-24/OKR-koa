# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: okr
# Generation Time: 2020-10-14 12:34:01 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table keyresult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `keyresult`;

CREATE TABLE `keyresult` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `objective_id` int(11) DEFAULT NULL COMMENT '关联的目标id',
  `title` varchar(255) DEFAULT NULL COMMENT '成就名称',
  `status` int(11) DEFAULT NULL COMMENT '状态：0-未完成，1-完成',
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `completed_time` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `keyresult` WRITE;
/*!40000 ALTER TABLE `keyresult` DISABLE KEYS */;

INSERT INTO `keyresult` (`id`, `objective_id`, `title`, `status`, `created_time`, `completed_time`)
VALUES
	(9,16,'彻思叔叔说',0,'2020-09-10 15:00:25',NULL),
	(22,20,'先吃一顿',1,'2020-09-22 17:45:05','2020-10-14 11:44:40'),
	(23,20,'再再吃一顿',1,'2020-09-22 17:45:05','2020-10-14 20:30:59');

/*!40000 ALTER TABLE `keyresult` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table objective
# ------------------------------------------------------------

DROP TABLE IF EXISTS `objective`;

CREATE TABLE `objective` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `title` varchar(255) DEFAULT NULL COMMENT '目标',
  `status` int(11) DEFAULT NULL COMMENT '状态：0-未完成，1-完成',
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `completed_time` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `objective` WRITE;
/*!40000 ALTER TABLE `objective` DISABLE KEYS */;

INSERT INTO `objective` (`id`, `user_id`, `title`, `status`, `created_time`, `completed_time`)
VALUES
	(16,1,'彻思叔叔',0,'2020-09-10 15:00:25',NULL),
	(20,1,'吃三顿饭',0,'2020-09-22 17:45:05',NULL);

/*!40000 ALTER TABLE `objective` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo`;

CREATE TABLE `todo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `status` int(11) DEFAULT NULL COMMENT '状态：0-未完成，1-完成 ',
  `user_id` int(11) DEFAULT NULL COMMENT '用户 id',
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `completed_time` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;

INSERT INTO `todo` (`id`, `title`, `status`, `user_id`, `created_time`, `completed_time`)
VALUES
	(3,'故已似隔几朝春梦',0,1,'2020-09-03 15:48:47',NULL),
	(5,'生而为人，我很遗憾',0,1,'2020-09-04 10:16:06',NULL),
	(12,'吃早饭',0,1,'2020-09-18 11:10:34',NULL),
	(13,'吃午饭',1,1,'2020-10-13 20:13:37','2020-10-13 20:14:48');

/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo_keyresult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo_keyresult`;

CREATE TABLE `todo_keyresult` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `todo_id` varchar(255) DEFAULT NULL,
  `keyresult_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todo_keyresult` WRITE;
/*!40000 ALTER TABLE `todo_keyresult` DISABLE KEYS */;

INSERT INTO `todo_keyresult` (`id`, `todo_id`, `keyresult_id`)
VALUES
	(22,'12','22'),
	(23,'13','23');

/*!40000 ALTER TABLE `todo_keyresult` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `open_id`)
VALUES
	(1,'on9T_4-UU-Ww5vTDcgCjDzaigmxg');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
