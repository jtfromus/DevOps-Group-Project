-- Adminer 4.7.8 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `cs4783_gis262` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cs4783_gis262`;

DROP TABLE IF EXISTS `property`;
CREATE TABLE `property` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(1024) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` char(2) NOT NULL,
  `zip` char(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

GRANT SELECT, UPDATE, DELETE, INSERT on cs4783_gis262.* to `gis262`@`%` identified by 'secretPassword'

-- 2021-04-25 19:12:43