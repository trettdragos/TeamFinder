-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2018 at 07:46 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teamfinder`
--
CREATE DATABASE IF NOT EXISTS `teamfinder` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `teamfinder`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `ID` char(36) NOT NULL,
  `USERNAME` text NOT NULL,
  `EMAIL` text NOT NULL,
  `PASSWORD` varchar(61) NOT NULL,
  `PROFILE` longtext NOT NULL,
  `CONFIRMED` text NOT NULL,
  `NOTIFICATION` text NOT NULL,
  `REPUTATION` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `PROFILE`, `CONFIRMED`, `NOTIFICATION`, `REPUTATION`) VALUES
('96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett Dragos', 'trettdragos@yahoo.com', '$2b$10$0WD6v6gmdYXlLF.3xyNrs.wqQUQAoAyqL1Boq1fgSFKkDLGfRquFu', '{\"GITHUB\":\"kjmfw svjds\",\"LINKEDIN\":\"skjfv,bdf,\",\"SKILLS\":[],\"ABOUT\":\"I like big booties and I can not lie\",\"PROFILE_PICTURE\":\"\"}', '1', '[{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"project\",\"name\":\"iptest2\",\"id\":\"admintrettmeiptest2\"}]', 0),
('C18C4CFB-9F40-41F1-A570-B4B57CC46EA3', 'Trett ', 'admin@trett.me', '$2b$10$oq1/EAEcTHitlstCvZ2B.uObg02Nc9ykvEMMmbHXF6M7..I4Im8Oq', '{ 	\"GITHUB\": \"\", 	\"LINKEDIN\": \"\", 	\"SKILLS\":[], 	\"ABOUT\": \"TEST ABOUT\", 	\"PROFILE_PICTURE\": \"\" }', '1', '[{\"user\":\"trettdragos@yahoo.com\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"testing notif\",\"id\":\"trettdragosyahoocomtestingnotif\"},{\"user\":\"trettdragos@yahoo.com\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"testing notif\",\"id\":\"trettdragosyahoocomtestingnotif\"}]', 0),
('D7A87F2A-5C02-4394-8E35-0CBB29450C4C', 'Teodor Vecerdi', 'teo.vecerdi@gmail.com', '$2b$10$BqHGnZ/Q4pesTLJs1JcmJeB04EaVpLiiYGCGlW3RGT5E6XyeJqvce', '{\"GITHUB\":\"https://www.github.com/TeodorVecerdi\",\"LINKEDIN\":\"\",\"SKILLS\":[],\"ABOUT\":\"\",\"PROFILE_PICTURE\":\"\"}', '1', '[]', 6),
('F5385DE3-9353-4746-AB09-CE46B4A96602', 'Teodor Vecerdi', 'teodor.vecerdi@gmail.com', '$2b$10$6XOSJbuKvcAvEhmpnATBb.J6SXXAgoZVH12wfBU7x7x6VsHShECqu', '{\"GITHUB\":\"\",\"LINKEDIN\":\"\",\"SKILLS\":[],\"ABOUT\":\"\",\"PROFILE_PICTURE\":\"\"}', '1', '[]', -1);

-- --------------------------------------------------------

--
-- Table structure for table `group_messages`
--

DROP TABLE IF EXISTS `group_messages`;
CREATE TABLE IF NOT EXISTS `group_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_uuid` char(36) NOT NULL,
  `from_name` text NOT NULL,
  `group_uuid` char(36) NOT NULL,
  `message` text NOT NULL,
  `timestamp` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group_messages`
--

INSERT INTO `group_messages` (`id`, `from_uuid`, `from_name`, `group_uuid`, `message`, `timestamp`) VALUES
(3, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett Dragos', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'test 2', '1529672843810'),
(4, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett Dragos', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'test mata', '1529672877121'),
(5, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett Dragos', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'shit', '1529673337787'),
(6, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'fuck me', '1529673359658'),
(7, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett Dragos', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'shit', '1529674353467'),
(8, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'test2', '1529674388561'),
(9, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'shit', '1529679605239'),
(10, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'wohooo', '1529694601602'),
(11, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'ce nebuniee', '1529694603623'),
(12, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'chiar merge', '1529694607094'),
(13, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '<b>test</b>', '1529755630483'),
(14, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '<i>cacat', '1529755642715'),
(15, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', 'asdas', '1529755643939'),
(16, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '<script>alert(1);</script>ok', '1529755656244'),
(17, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', 'SELECT * FROM accounts', '1529755675661'),
(18, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', 'test', '1529756189554'),
(19, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', 'teateate', '1529756196717'),
(20, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', '3CBB90B5-4C37-48BE-9073-7A166FE9F87D', 'muie', '1529756303354'),
(21, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '<b>test</b>', '1530527964280'),
(22, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '<script>alert(1);</script>ok', '1530527984015'),
(23, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', 'aaa', '1530528001237'),
(24, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', 'efasdfasfa', '1530528009935'),
(25, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '<b>aaa</b>', '1530528012766'),
(26, '8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'BA8C2515-3467-4F83-BB93-3D5B4C79A41D', 'sdasda', '1530528024953');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `ID` char(36) NOT NULL,
  `TIMESTAMP` varchar(255) NOT NULL,
  `NAME` text NOT NULL,
  `SUMMARY` text NOT NULL,
  `COMMITMENT` text NOT NULL,
  `PLATFORMS` text NOT NULL,
  `PLATFORM_DETAILS` text NOT NULL,
  `RESOURCE_LINK` text NOT NULL,
  `STAGE` text NOT NULL,
  `BUDGET` text NOT NULL,
  `FUNDING` text NOT NULL,
  `NATIONAL` text NOT NULL,
  `FOUNDER` text NOT NULL,
  `COLLABORATORS` text NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ID`, `TIMESTAMP`, `NAME`, `SUMMARY`, `COMMITMENT`, `PLATFORMS`, `PLATFORM_DETAILS`, `RESOURCE_LINK`, `STAGE`, `BUDGET`, `FUNDING`, `NATIONAL`, `FOUNDER`, `COLLABORATORS`, `ACTIVE`) VALUES
('0375FC25-93B2-486F-8B11-6E866F95BAD4', '1533476997365', 'Test project @ 1533476997365', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('045BA9AD-4CD7-4B5E-98CF-816664C54AFF', '1533477081247', 'Test project @ 1533477081247', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('0A6C4645-34D3-4A9B-9A86-346420A67DD8', '1533476877557', 'Test project @ 1533476877557', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('0F8A557E-0A17-4828-AF22-5F8D4F0119DD', '1529503004300', 'Has No Country', 'dfkbvdfkjvbkdfbv', 'Contractual', '[]', '', '', 'Idea Stage', '$0-$1,000', 'false', '', 'trettdragos@yahoo.com', 'trettdragos@gmail.com, ', 1),
('18B2A5B6-0C48-47AB-BDA5-72925BB97C4D', '1533477146222', 'Test project @ 1533477146222', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('199E1B65-13C8-4A85-AC41-09ECDE15C693', '1529503004720', 'iptest2', 'ana are mere', 'Contractual', '[]', '', '', 'Idea Stage', '$0-$1,000', 'true', 'Romania', 'trettdragos@yahoo.com', 'admin@trett.me, ', 1),
('1A2D494D-B9D0-482E-BFA2-C857859574C9', '1533477081248', 'Test project @ 1533477081248', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('20DD1306-2587-4052-8901-3E6A2D20FB55', '1533477146231', 'Test project @ 1533477146231', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('244E51DC-4809-447C-99EC-AF25FEA5AAD5', '1533476877550', 'Test project @ 1533476877550', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('24702F2A-FDFC-41C5-8821-4DA5D3FD6446', '1533476997379', 'Test project @ 1533476997379', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('24A8F365-FC99-4928-BC02-D7F1D05D4FCC', '1533476877550', 'Test project @ 1533476877550', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('28CE1D51-A3DE-4D0F-BFD9-3CDE45FF29CA', '1529503004501', 'test from other pc', 'fasdgvasgWSRGargargaergaer', 'Contractual', '[\"java\"]', 'wegfvsagadfga', '', 'Live Version Available', '$1,000-$5,000', 'true', 'Romania', 'trettdragos@gmail.com', 'trettdragos@yahoo.com, ', 1),
('29A6C122-E324-4EFA-83FF-047741217E5F', '1533477081242', 'Test project @ 1533477081242', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('29C806CE-6B57-4CD6-BEFA-66108367C0F5', '1529503004701', 'active project', 'skbvks', 'Contractual', '[\"javascript\"]', '', '', 'Idea Stage', '$0-$1,000', 'false', 'Romania', 'trettdragos@yahoo.com', '', 0),
('318EDE9A-7487-415C-B0FD-123AF2DD534C', '1533477061206', 'Test project @ 1533477061206', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('33E9AC4B-DD5F-4273-BF3A-488ADD6A91A5', '1533477061216', 'Test project @ 1533477061216', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('3C448874-8A6D-446C-A4B6-BE8E1AC7D38F', '1533477002058', 'Test project @ 1533477002058', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('3EF230A2-5AEB-4CE3-9690-AADA5B14A9E2', '1533476764475', 'Test project @ 1533476764475', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('3F3D424A-72BC-4C15-8C1D-35466D7D0B7D', '1533476997387', 'Test project @ 1533476997387', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('433E0AFC-7223-4437-BC1D-11D42AC3024C', '1533476764467', 'Test project @ 1533476764467', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('46FAC881-64A8-45F6-A76D-28D62B767040', '1533476997369', 'Test project @ 1533476997369', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('4A8B6621-C77A-416E-8D7B-2B46046283AE', '1533477002064', 'Test project @ 1533477002064', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('4B17D863-E9D0-4040-BEEA-4B51A4C2DF0E', '1533477081234', 'Test project @ 1533477081234', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('4BAABA7E-2A1A-4A29-8E5F-BD547981507D', '1533477002049', 'Test project @ 1533477002049', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('4F30AB03-8D41-483E-BA1C-11F82B63E93F', '1529503004700', 'Testing', 'ADJFvhalsdjhfvmcasdljv,had', 'Contractual', '[\"php e fain\"]', 'kFSJFgliaks,fvkajsdh', '', 'Idea Stage', '$0-$1,000', 'true', 'Romania', 'trettdragos@yahoo.com', 'trettdragos@gmail.com,teo.vecerdi@gmail.com,', 1),
('51A15C43-6FF5-4D78-B85D-D0E0D38CB2EC', '1533477146244', 'Test project @ 1533477146244', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('51F58C76-AEFD-4F47-BD05-1591467891A0', '1529503004720', 'Pula in cur', 'summary la project', 'Contractual', '[\"muie\",\"milena\",\"popa\",\"backend\"]', 'details on specific skills', '', 'Idea Stage', '$0-$1,000', 'true', '', 'teo.vecerdi@gmail.com', '', 1),
('56607D81-BF95-489D-B262-FFCE99879BFC', '1529503004600', 'Ip Test', 'ksvjbxdfkfxdjkmvbdxj,m', 'Contractual', '[]', 'csdvd', '', 'Idea Stage', '$0-$1,000', 'false', '', 'trettdragos@yahoo.com', '', 1),
('56657ED4-FC77-4820-ABCD-E22A964C8DBF', '1533476764485', 'Test project @ 1533476764485', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('56C7B5E5-B6C4-454B-8D45-3FD1E80450FD', '1533476997373', 'Test project @ 1533476997373', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('5DBEBBE3-4A86-4B31-801A-B89A44E8C04F', '1533476764484', 'Test project @ 1533476764484', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('5EFC5B86-A7B2-4E7D-960A-CBAD74849536', '1533476997412', 'Test project @ 1533476997412', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('61BC9867-314E-40A5-96DF-4F25B97EAD22', '1530712097570', 'Test project name', 'Test project summary #2', 'Part-time', '[\"Test1\",\"Test3\"]', 'Intermediate knowledge of either Javascript, Java/Kotlin or .NET is required.', 'https://github.com/TeodorVecerdi/DrBoratTester/', 'Prototype Already Built', '$25,000-$50,000', 'false', '', 'teodor.vecerdi@gmail.com', '', 1),
('626B4997-6C36-4925-AEF9-FEE2F2B6E75C', '1529503004503', 'This is a Project', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Contractual', '[]', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '', 'Idea Stage', '$0-$1,000', 'false', 'Romania', 'trettdragos@yahoo.com', 'guest@trett.me,teo.vecerdi@gmail.com,', 1),
('6D24FA77-9724-4FF8-A7ED-12F92101E75F', '1533476764458', 'Test project @ 1533476764458', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('6D6E1B3D-4F9B-4EA5-B104-CDDF5959657D', '1533477002036', 'Test project @ 1533477002036', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('6DF05017-53C0-4535-815E-70F827AE4DCF', '1533476645993', 'Test project @ 1533476645993', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('7315159E-31F8-4F7E-8450-CA564819EA39', '1533476646001', 'Test project @ 1533476646001', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('762B576F-3C77-46C2-8C33-D32AB7656623', '1533476992723', 'Test project @ 1533476992723', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('76AA9C96-40DB-497C-BDD3-1E4C92A97919', '1533477061223', 'Test project @ 1533477061223', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('77557843-3E5B-4BBC-B7C7-D1845A123FA1', '1533476877548', 'Test project @ 1533476877548', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('7A79766F-6F2F-46C2-846F-ADB9F72717D4', '1533476877543', 'Test project @ 1533476877543', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('8480DA4C-AC3F-414E-8708-06EC777554CF', '1533476764493', 'Test project @ 1533476764493', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('862702D5-1A2E-4D7E-948E-05C923300E05', '1533476764488', 'Test project @ 1533476764488', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('87522290-527B-4CCB-B9AE-73976F724FB1', '1533477061194', 'Test project @ 1533477061194', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('8869F940-58A1-487C-8EB2-67229A1B0481', '1533476997355', 'Test project @ 1533476997355', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('88DF5431-2173-475F-A796-5B5674F3D48D', '1533476997369', 'Test project @ 1533476997369', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('8B248495-9918-48CA-82A2-BEA35FD6A196', '1533476877564', 'Test project @ 1533476877564', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('8F065945-220F-438C-BA12-35095CA7DAB8', '1533477081252', 'Test project @ 1533477081252', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('8F652B43-7960-4EAB-BF6E-61509D860C1E', '1533476764485', 'Test project @ 1533476764485', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('904B4C88-EF41-4E70-92CB-0B1F2B6AA7D5', '1533477146242', 'Test project @ 1533477146242', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('98A7041F-73C1-4AC2-84D4-BE7B914BACB5', '1533476764446', 'Test project @ 1533476764446', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('<H2>THIS WEBSITE IS UNDER HEAVY LOAD', '1533476646010', 'Test project @ 1533476646010', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('A1AD125B-118A-4B99-B804-6D36E984919C', '1533476646003', 'Test project @ 1533476646003', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('AA66F46A-46A1-45F9-AE0D-E33931A95FF7', '1533476877557', 'Test project @ 1533476877557', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('B2C08F00-D8C7-44B8-9F9E-CB6F86463FD6', '1533477081217', 'Test project @ 1533477081217', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('B9F0DE6A-99FA-4034-A259-E102DF14C13F', '1533477061218', 'Test project @ 1533477061218', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('BA8C2515-3467-4F83-BB93-3D5B4C79A41D', '1529503004730', 'PROJECT VECE OWNER SMECHER', 'blabla', 'Contractual', '[\"nuj fra inca\"]', '<strong>pseudocode required !!!</strong>', '', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('BAB4F1BA-001C-47CC-AF46-E32957C6AFAE', '1533477002046', 'Test project @ 1533477002046', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('BC2608D0-6D9C-46C3-B5D6-63DF5B3F788B', '1529503004701', 'RANDOM PROJECT NAME', 'Has lorem singulis ea. Amet utroque luptatum ius te. Usu wisi vitae ad. Ex labitur maiestatis pri. Accumsan vituperata vel an, perfecto hendrerit vis eu, mei atqui assum epicuri in.\n\nMolestie invenire his ea, vis ad rebum saepe interesset? Liber patrioque nec at, qui interesset vituperatoribus at, ea consul invenire maluisset his? Ad sumo admodum volutpat has, vero movet intellegebat sed at. Et delenit mediocritatem est, alii sumo inciderint mei at? Exerci consetetur pri ne, mundi dissentias in nam! Ne iisque adversarium eum, ei mea tota mazim.', 'Contractual', '[\"muieeeee\"]', 'PHP IS REQUIRED', 'https://www.github.com/TeodorVecerdi/', 'Idea Stage', '$0-$1,000', 'true', '', 'teo.vecerdi@gmail.com', '', 1),
('BD0DE4F5-0110-43AD-9D34-F9EEBBC48AFE', '1533476997361', 'Test project @ 1533476997361', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('BDCC9A95-E546-4629-9709-7DAC0681E38A', '1533476877559', 'Test project @ 1533476877559', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('C37721D8-0D47-4D0B-B26A-EF59BE075EDA', '1533477081237', 'Test project @ 1533477081237', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('C4E44E7D-8EF9-4955-9410-873E0E463E32', '1533477002068', 'Test project @ 1533477002068', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('C975F7F0-736F-45CB-B8D4-67A4C7A7AEC7', '1533477146245', 'Test project @ 1533477146245', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '1529503859109', 'MANELE NOI PROJECT MIX 2018', 'MANELE NOI PROJECT MIX 2018', 'Contractual', '[]', '', '', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', 'admin@trett.me,', 1),
('D28C4B35-87CD-4F51-8859-DDE50F4F11BB', '1533477061207', 'Test project @ 1533477061207', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('D40668BD-B7CE-414B-9741-C31CAF09401B', '1533476764451', 'Test project @ 1533476764451', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('D4DAA7A2-2BBD-41B0-BE0A-A2382C07E940', '1533477002054', 'Test project @ 1533477002054', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('D8048BE9-CA11-49A8-8A91-0D7B84665FB1', '1533476764472', 'Test project @ 1533476764472', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('D879AB78-5C17-4E93-A9AA-28A26963E53F', '1533476997367', 'Test project @ 1533476997367', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('E12B5B2C-B50D-41EC-80A2-C64882C1F8F9', '1533476764455', 'Test project @ 1533476764455', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('E24D8936-4693-4FA4-8612-E9B36E948B7E', '1533477146230', 'Test project @ 1533477146230', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('F2B41923-EFD7-482A-9485-F6A62B3CD358', '1533476877562', 'Test project @ 1533476877562', 'Test summary', 'Contractual', '[\"Platform 1\", \"Platform 2\"]', 'Platform details', 'Resource link', 'Idea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE IF NOT EXISTS `teams` (
  `ID` char(36) NOT NULL,
  `TIMESTAMP` varchar(255) NOT NULL,
  `NAME` text NOT NULL,
  `SUMMARY` text NOT NULL,
  `HACKATON` text NOT NULL,
  `SECTION` text NOT NULL,
  `START_DATE` text NOT NULL,
  `END_DATE` text NOT NULL,
  `PLATFORMS` text NOT NULL,
  `RESOURCE_LINK` text NOT NULL,
  `NR_MEMBERS` text NOT NULL,
  `POSTS` text NOT NULL,
  `LEADER` text NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`ID`, `TIMESTAMP`, `NAME`, `SUMMARY`, `HACKATON`, `SECTION`, `START_DATE`, `END_DATE`, `PLATFORMS`, `RESOURCE_LINK`, `NR_MEMBERS`, `POSTS`, `LEADER`, `ACTIVE`) VALUES
('04FE15F1-027D-46B4-B73C-521D69C3AB2D', '1533476633077', 'Test team @ 1533476633077', 'Team summary', 'Team hackaton', 'Team section', '1533476633077', '1533476633077', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('052F9634-4BB3-42E0-99AE-E921C49E53A8', '1533476633126', 'Test team @ 1533476633126', 'Team summary', 'Team hackaton', 'Team section', '1533476633126', '1533476633126', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('05599DE3-72DF-4ACE-A489-81FCBFCC6B96', '1533476633134', 'Test team @ 1533476633134', 'Team summary', 'Team hackaton', 'Team section', '1533476633134', '1533476633134', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('06D5D454-1501-4191-B6C1-8C17860FFA90', '1533476638908', 'Test team @ 1533476638908', 'Team summary', 'Team hackaton', 'Team section', '1533476638908', '1533476638908', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('0BEC624B-5B02-4B6A-A000-DB33B23C8A89', '1533476701939', 'Test team @ 1533476701939', 'Team summary', 'Team hackaton', 'Team section', '1533476701939', '1533476701939', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('0C736319-D123-40B9-8C08-D3166A4AF73B', '1529503004300', 'another notif', 'skvbdfxkjq', 'b', 'js,vbdf', '1529503004300', '1529555774300', '[]', '', '1', 'admin@trett.me, ', 'trettdragos@yahoo.com', 1),
('10B3ACF0-DC42-4CDF-B821-6A021687FBF7', '1529503004301', 'This is a team', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'TmHack', 'Mobile', '1529503004300', '1529555774300', '[]', '', '1', 'trettdragos@yahoo.com, trettdragos@gmail.com, ', 'guest@trett.me', 0),
('117D6B3D-2545-4E85-9785-37865A3C9432', '1533476701953', 'Test team @ 1533476701953', 'Team summary', 'Team hackaton', 'Team section', '1533476701953', '1533476701953', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('11A9C294-F964-437B-BD7B-4079DC803F55', '1533476638894', 'Test team @ 1533476638894', 'Team summary', 'Team hackaton', 'Team section', '1533476638894', '1533476638894', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('1269C89F-0472-428F-BC26-90FF8D618922', '1533476701918', 'Test team @ 1533476701918', 'Team summary', 'Team hackaton', 'Team section', '1533476701918', '1533476701918', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('1658AD58-39E4-44D7-863E-7FB90D514B31', '1533476701956', 'Test team @ 1533476701956', 'Team summary', 'Team hackaton', 'Team section', '1533476701956', '1533476701956', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('186FDE3A-63A3-4B78-91CD-D567D0106C49', '1533476633015', 'Test team @ 1533476633015', 'Team summary', 'Team hackaton', 'Team section', '1533476633015', '1533476633015', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('1CC64489-E50D-415F-97A4-EED298479038', '1533476633143', 'Test team @ 1533476633143', 'Team summary', 'Team hackaton', 'Team section', '1533476633143', '1533476633143', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('203DF2E2-016D-4C4A-90BF-FFCF82898896', '1533476638902', 'Test team @ 1533476638902', 'Team summary', 'Team hackaton', 'Team section', '1533476638902', '1533476638902', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('20E10238-A790-4536-8A81-8E1B68CAADA7', '1533476701835', 'Test team @ 1533476701835', 'Team summary', 'Team hackaton', 'Team section', '1533476701835', '1533476701835', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('24F88A74-BD8F-4CE0-8BD4-1949AD0F4587', '1533476633304', 'Test team @ 1533476633304', 'Team summary', 'Team hackaton', 'Team section', '1533476633304', '1533476633304', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('26213688-2AAB-4ED9-9AEF-4F33E011D9CC', '1533476638946', 'Test team @ 1533476638946', 'Team summary', 'Team hackaton', 'Team section', '1533476638946', '1533476638946', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('2BE67742-B610-4272-A3C7-90B119CC708C', '1533476701963', 'Test team @ 1533476701963', 'Team summary', 'Team hackaton', 'Team section', '1533476701963', '1533476701963', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('33873BE0-42B6-48BC-8B4A-9ED5B63C8BAF', '1529503004307', 'Test', 'test', 'test', 'test', '1529503004300', '1529555774300', '[\"test\",\"muie\",\"milena\",\"popa\"]', 'test', '1', 'trett.dragos@yahoo.com,', 'teo.vecerdi@gmail.com', 1),
('34A4F3B1-AE29-437B-AE38-8832C4AABDF2', '1533476701793', 'Test team @ 1533476701793', 'Team summary', 'Team hackaton', 'Team section', '1533476701793', '1533476701793', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('38238D52-6ED6-4DF2-9A1D-DA5BF4948B05', '1529503004100', 'team test', 'lkjvbs,jkm', 'kdvbdkjb,f', 'skjv,fb dfhm', '1529503004300', '1529555774300', '[]', '', '1', '', 'trettdragos@yahoo.com', 1),
('3AADE04B-1E23-4EB2-84F6-C752384226BF', '1533476633096', 'Test team @ 1533476633096', 'Team summary', 'Team hackaton', 'Team section', '1533476633096', '1533476633096', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('3CBB90B5-4C37-48BE-9073-7A166FE9F87D', '1529691748386', 'Test team name aoleu', 'Niciun purpose v2.0', 'Timisoara CTF 2018', 'test', '1530392400000', '1530738000000', '[]', '', '1', '', 'teo.vecerdi@gmail.com', 1),
('428AB7F8-3153-423F-8496-6470AFCF5286', '1533476701953', 'Test team @ 1533476701953', 'Team summary', 'Team hackaton', 'Team section', '1533476701953', '1533476701953', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('42CD4F18-34AA-47AB-B589-1C52B216A65E', '1533476638977', 'Test team @ 1533476638977', 'Team summary', 'Team hackaton', 'Team section', '1533476638977', '1533476638977', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('4BFCBAB6-F05C-4EF7-8AD2-A3D67D1071C6', '1533476701906', 'Test team @ 1533476701906', 'Team summary', 'Team hackaton', 'Team section', '1533476701906', '1533476701906', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('4C6985B1-EE9D-43BE-A65F-B388DE2C94A0', '1533476633126', 'Test team @ 1533476633126', 'Team summary', 'Team hackaton', 'Team section', '1533476633126', '1533476633126', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('4CCCC252-1679-4C65-9CD4-FBC3C4C76B07', '1533476701852', 'Test team @ 1533476701852', 'Team summary', 'Team hackaton', 'Team section', '1533476701852', '1533476701852', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('4D8003B6-C887-4A44-B7B9-33434D303ECA', '1533476701878', 'Test team @ 1533476701878', 'Team summary', 'Team hackaton', 'Team section', '1533476701878', '1533476701878', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('50272591-4133-4450-AAC1-C73DE8675534', '1533476633056', 'Test team @ 1533476633056', 'Team summary', 'Team hackaton', 'Team section', '1533476633056', '1533476633056', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('5081DC9F-ACC4-4C7A-A133-77C635D12B04', '1533476638883', 'Test team @ 1533476638883', 'Team summary', 'Team hackaton', 'Team section', '1533476638883', '1533476638883', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('50CB2983-0262-4050-9D4D-B9DC984C0175', '1533476633135', 'Test team @ 1533476633135', 'Team summary', 'Team hackaton', 'Team section', '1533476633135', '1533476633135', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('543B77E2-8010-479D-B14F-ACC2BB916994', '1533476633065', 'Test team @ 1533476633065', 'Team summary', 'Team hackaton', 'Team section', '1533476633065', '1533476633065', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('590621BC-36C5-438C-A840-7B105505C663', '1533476701823', 'Test team @ 1533476701823', 'Team summary', 'Team hackaton', 'Team section', '1533476701823', '1533476701823', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('5ACE5F84-4080-42EC-A139-FE47ED9F5F8C', '1533476633037', 'Test team @ 1533476633037', 'Team summary', 'Team hackaton', 'Team section', '1533476633037', '1533476633037', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('5EDA1441-D601-4D0F-9E61-D2554528A6EF', '1533476638865', 'Test team @ 1533476638865', 'Team summary', 'Team hackaton', 'Team section', '1533476638865', '1533476638865', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('60392F46-6164-4EFA-A154-6F8F24DA268E', '1529503004000', 'testing notif', 'flskdhmbvflsdajfvb,hafsdblvj a,dfhvbalskf,vhablk,', 'jkwsdfvjbsdzfk,vjm', 'sdvfdfs', '1529503004300', '1529555774300', '[]', '', '1', 'trettdragos@yahoo.com, ', 'admin@trett.me', 0),
('64811249-4B76-4581-B898-42653B378A6E', '1533476701872', 'Test team @ 1533476701872', 'Team summary', 'Team hackaton', 'Team section', '1533476701872', '1533476701872', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('66261C4E-3223-4C4D-A356-C804B2A9DBC8', '1533476633089', 'Test team @ 1533476633089', 'Team summary', 'Team hackaton', 'Team section', '1533476633089', '1533476633089', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('6896D1C8-82CA-45ED-AA5D-39268045BAEE', '1533476633138', 'Test team @ 1533476633138', 'Team summary', 'Team hackaton', 'Team section', '1533476633138', '1533476633138', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('6BAB5CE8-CB9C-47B9-9C7B-D64978743723', '1533476638898', 'Test team @ 1533476638898', 'Team summary', 'Team hackaton', 'Team section', '1533476638898', '1533476638898', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('6D5CB4F5-28C5-43B6-9F67-5F4B274F79B1', '1533476701935', 'Test team @ 1533476701935', 'Team summary', 'Team hackaton', 'Team section', '1533476701935', '1533476701935', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('70992467-8838-43CF-8A05-1B52FA35988F', '1529503004200', 'Test Echipa info', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill', 'PolyHack', 'web', '1529503004300', '1529555774300', '[]', '', '1', 'trettdragos@yahoo.com, ', 'trettdragos@gmail.com', 1),
('7154781D-5C36-4282-AFA1-E603B3C17989', '1529503004700', 'FOUNDER TEOVECE', 'cacat', 'cacat', 'cacat', '1529403004300', '1529555774300', '[\"mobile\",\"in php\"]', '', '1', '', 'teo.vecerdi@gmail.com', 1),
('781DBA69-C37D-4223-BB60-ABBE3565BD26', '1533476701879', 'Test team @ 1533476701879', 'Team summary', 'Team hackaton', 'Team section', '1533476701879', '1533476701879', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('79EE1B35-373B-4F36-ACD4-D4FD4D2361A4', '1533476633011', 'Test team @ 1533476633011', 'Team summary', 'Team hackaton', 'Team section', '1533476633011', '1533476633011', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('7C5B654F-2840-4397-B58F-1350F876B5AF', '1533476633110', 'Test team @ 1533476633110', 'Team summary', 'Team hackaton', 'Team section', '1533476633110', '1533476633110', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('7DA14B20-700A-46CD-A249-22C8FDE0545B', '1533476633140', 'Test team @ 1533476633140', 'Team summary', 'Team hackaton', 'Team section', '1533476633140', '1533476633140', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('89CEE0B4-8101-4AE8-AF71-60390CEB1A25', '1533476638909', 'Test team @ 1533476638909', 'Team summary', 'Team hackaton', 'Team section', '1533476638909', '1533476638909', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('8BE6C636-9307-43BD-B4A7-B7D2C3B9411A', '1533476701919', 'Test team @ 1533476701919', 'Team summary', 'Team hackaton', 'Team section', '1533476701919', '1533476701919', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('9296DEAA-57FE-4AA7-80DB-2FB79560DBC0', '1533476701831', 'Test team @ 1533476701831', 'Team summary', 'Team hackaton', 'Team section', '1533476701831', '1533476701831', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('9321ACE8-A67B-4938-9B1A-8CD4D1700235', '1530713716813', 'Test team name', 'Test team purpose', 'Timisoara CTF', 'Qualifications', '1531083600000', '1532466000000', '[\"a\",\"c\",\"d\"]', 'https://github.com/trettdragos/TeamFinder', '1', '', 'teodor.vecerdi@gmail.com', 1),
('966EE065-F779-4C04-9F78-6799A6C7FB98', '1533476633062', 'Test team @ 1533476633062', 'Team summary', 'Team hackaton', 'Team section', '1533476633062', '1533476633062', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('9C6A9FCE-694F-49FE-8304-11EF8743A7E3', '1533476633129', 'Test team @ 1533476633129', 'Team summary', 'Team hackaton', 'Team section', '1533476633129', '1533476633129', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('9FC448DB-5042-4AE7-8DD5-4EA34D45F06A', '1533476633320', 'Test team @ 1533476633320', 'Team summary', 'Team hackaton', 'Team section', '1533476633320', '1533476633320', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('<!DOCTYPE HTML>\n<HTML LANG=\"EN\">\n  <', '1533476633039', 'Test team @ 1533476633039', 'Team summary', 'Team hackaton', 'Team section', '1533476633039', '1533476633039', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('AA06BE67-F83D-4F28-9DCD-5E0A90EFF04B', '1533476701981', 'Test team @ 1533476701981', 'Team summary', 'Team hackaton', 'Team section', '1533416400000', '1533416400000', '[\"Platform 1\",\"Platform 2\"]', 'Resource link', '0', 'teodor.vecerdi@gmail.com,', 'teo.vecerdi@gmail.com', 0),
('B6377E2E-9CD7-4F5C-9A06-2CAAFC5DAEE7', '1529503004299', 'testing active', 'ana are mere', 'timCTF', 'web', '1529503004300', '1529555774300', '[]', '', '1', '', 'trettdragos@yahoo.com', 1),
('B90E31AA-21B6-47A1-89CD-CB6569F3F39F', '1533476633042', 'Test team @ 1533476633042', 'Team summary', 'Team hackaton', 'Team section', '1533476633042', '1533476633042', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('BBC700BD-027C-4603-BBF1-7A8BCBF92288', '1533476701914', 'Test team @ 1533476701914', 'Team summary', 'Team hackaton', 'Team section', '1533476701914', '1533476701914', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('BD115E10-E212-424D-9A87-B28B4C8E2797', '1533476633435', 'Test team @ 1533476633435', 'Team summary', 'Team hackaton', 'Team section', '1533476633435', '1533476633435', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('BE432CF9-00AE-4982-A4EB-206AA6586139', '1533476701913', 'Test team @ 1533476701913', 'Team summary', 'Team hackaton', 'Team section', '1533476701913', '1533476701913', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('C24AA5AF-7B8E-45AC-8799-03143E44AFFE', '1533476633124', 'Test team @ 1533476633124', 'Team summary', 'Team hackaton', 'Team section', '1533476633124', '1533476633124', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('C2FD99D6-7E6E-4884-81D6-4C94DAC604E6', '1533476633309', 'Test team @ 1533476633309', 'Team summary', 'Team hackaton', 'Team section', '1533476633309', '1533476633309', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('C764E0FE-59F4-425E-8CED-918719C52A4B', '1533476633436', 'Test team @ 1533476633436', 'Team summary', 'Team hackaton', 'Team section', '1533476633436', '1533476633436', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('C8297CF9-045D-431A-B5FA-596CB500372F', '1533476633035', 'Test team @ 1533476633035', 'Team summary', 'Team hackaton', 'Team section', '1533476633035', '1533476633035', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('C92DFFDD-E98A-4A1A-8DA1-44D34E07AAA8', '1533476701968', 'Test team @ 1533476701968', 'Team summary', 'Team hackaton', 'Team section', '1533476701968', '1533476701968', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('CA5C211F-B1EC-4967-B11D-3619AE37AC72', '1533476633106', 'Test team @ 1533476633106', 'Team summary', 'Team hackaton', 'Team section', '1533476633106', '1533476633106', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('CCAC0C52-3E9F-4E32-B485-00AAADC702F0', '1533476701894', 'Test team @ 1533476701894', 'Team summary', 'Team hackaton', 'Team section', '1533476701894', '1533476701894', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('CD253C3A-F39A-4943-8844-D526C84984F8', '1533476633069', 'Test team @ 1533476633069', 'Team summary', 'Team hackaton', 'Team section', '1533476633069', '1533476633069', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('CEEACC01-68C5-46B1-ABDD-E3F9E7BBC50C', '1533476633025', 'Test team @ 1533476633025', 'Team summary', 'Team hackaton', 'Team section', '1533476633025', '1533476633025', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('CF390B33-91A1-4F3F-AC99-46B77DC35CC3', '1533476633099', 'Test team @ 1533476633099', 'Team summary', 'Team hackaton', 'Team section', '1533476633099', '1533476633099', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('D1B9CB74-BEC3-4F27-A3B1-FDBA924721E8', '1533476701811', 'Test team @ 1533476701811', 'Team summary', 'Team hackaton', 'Team section', '1533476701811', '1533476701811', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('D41B824B-9EEC-4B1B-BDD6-DF5427AC7173', '1533476701865', 'Test team @ 1533476701865', 'Team summary', 'Team hackaton', 'Team section', '1533476701865', '1533476701865', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('DD133986-A2DF-4F73-A418-D501959A0B58', '1529503004305', 'ghilimele', 'swkdvblfkd', 'bvsljfdbv', 'bvljskfb', '1529503004300', '1529555774300', '[]', '', '1', 'guest@trett.me, ', 'trettdragos@gmail.com', 0),
('DECD947D-A530-474D-9BDA-39EE9DAB3350', '1533476701929', 'Test team @ 1533476701929', 'Team summary', 'Team hackaton', 'Team section', '1533476701929', '1533476701929', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('DF0FE228-165A-42CD-987C-4C75AE7B2F9F', '1533476701809', 'Test team @ 1533476701809', 'Team summary', 'Team hackaton', 'Team section', '1533476701809', '1533476701809', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('E050FC46-2657-4EC5-810B-18EB42EFB518', '1533476633096', 'Test team @ 1533476633096', 'Team summary', 'Team hackaton', 'Team section', '1533476633096', '1533476633096', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('E460524D-371E-47AD-B5DC-070C44860762', '1533476701903', 'Test team @ 1533476701903', 'Team summary', 'Team hackaton', 'Team section', '1533476701903', '1533476701903', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('E4F1599F-29B5-44BA-A83E-2D7432E66573', '1533476701864', 'Test team @ 1533476701864', 'Team summary', 'Team hackaton', 'Team section', '1533476701864', '1533476701864', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('E9CCAD96-BDAC-48C8-9A71-C05CBF7F0C77', '1533476701966', 'Test team @ 1533476701966', 'Team summary', 'Team hackaton', 'Team section', '1533476701966', '1533476701966', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('F8AA2535-7896-4E26-A152-3A9A2EDB6685', '1533476633141', 'Test team @ 1533476633141', 'Team summary', 'Team hackaton', 'Team section', '1533476633141', '1533476633141', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1),
('FDD7240E-6535-48F7-8CB6-A3AD1A74C316', '1533476701951', 'Test team @ 1533476701951', 'Team summary', 'Team hackaton', 'Team section', '1533476701951', '1533476701951', '[\"Platform 1\", \"Platform 2\"]', 'Resource link', '0', '', 'teo.vecerdi@gmail.com', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
