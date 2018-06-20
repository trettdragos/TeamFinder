-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2018 at 04:13 PM
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
CREATE TABLE `accounts` (
  `ID` char(36) NOT NULL,
  `USERNAME` text NOT NULL,
  `EMAIL` text NOT NULL,
  `PASSWORD` varchar(61) NOT NULL,
  `PROFILE` longtext NOT NULL,
  `CONFIRMED` text NOT NULL,
  `NOTIFICATION` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `PROFILE`, `CONFIRMED`, `NOTIFICATION`) VALUES
('8CCB2690-68A2-491C-A726-A83312E49B55', 'Teodor Vecerdi', 'teo.vecerdi@gmail.com', '$2b$10$TFuLU9I/PrqIxgoYFLuQWOhYPLKJPPRzJ4p3trc8PxtjRTp1/LFjy', '{\"GITHUB\":\"https://www.github.com/TeodorVecerdi\",\"LINKEDIN\":\"https://www.linkedin.com/in/teodor-vecerdi-97b153135/\",\"SKILLS\":[\"php\",\"css\",\"html\",\"pseudocode\"],\"ABOUT\":\"Web Developer | Backend\",\"PROFILE_PICTURE\":\"\"}', '1', '[{\"user\":\"trett.dragos@yahoo.com\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"Test\",\"id\":\"muie\"}]'),
('96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett', 'trettdragos@yahoo.com', '$2b$10$0WD6v6gmdYXlLF.3xyNrs.wqQUQAoAyqL1Boq1fgSFKkDLGfRquFu', '{\"GITHUB\":\"kjmfw svjds\",\"LINKEDIN\":\"skjfv,bdf,\",\"SKILLS\":[],\"ABOUT\":\"I like big booties and I can not lie\",\"PROFILE_PICTURE\":\"\"}', '1', '[{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"project\",\"name\":\"iptest2\",\"id\":\"admintrettmeiptest2\"}]'),
('C18C4CFB-9F40-41F1-A570-B4B57CC46EA3', 'Trett ', 'admin@trett.me', '$2b$10$oq1/EAEcTHitlstCvZ2B.uObg02Nc9ykvEMMmbHXF6M7..I4Im8Oq', '{ 	\"GITHUB\": \"\", 	\"LINKEDIN\": \"\", 	\"SKILLS\":[], 	\"ABOUT\": \"TEST ABOUT\", 	\"PROFILE_PICTURE\": \"\" }', '1', '[{\"user\":\"trettdragos@yahoo.com\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"testing notif\",\"id\":\"trettdragosyahoocomtestingnotif\"},{\"user\":\"trettdragos@yahoo.com\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"testing notif\",\"id\":\"trettdragosyahoocomtestingnotif\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
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
  `ACTIVE` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ID`, `TIMESTAMP`, `NAME`, `SUMMARY`, `COMMITMENT`, `PLATFORMS`, `PLATFORM_DETAILS`, `RESOURCE_LINK`, `STAGE`, `BUDGET`, `FUNDING`, `NATIONAL`, `FOUNDER`, `COLLABORATORS`, `ACTIVE`) VALUES
('0F8A557E-0A17-4828-AF22-5F8D4F0119DD', '1529503004300', 'Has No Country', 'dfkbvdfkjvbkdfbv', 'Contractual', '[]', '', '', 'Ideea Stage', '$0-$1,000', 'false', '', 'trettdragos@yahoo.com', 'trettdragos@gmail.com, ', 1),
('199E1B65-13C8-4A85-AC41-09ECDE15C693', '1529503004720', 'iptest2', 'ana are mere', 'Contractual', '[]', '', '', 'Ideea Stage', '$0-$1,000', 'true', 'Romania', 'trettdragos@yahoo.com', 'admin@trett.me, ', 1),
('28CE1D51-A3DE-4D0F-BFD9-3CDE45FF29CA', '1529503004501', 'test from other pc', 'fasdgvasgWSRGargargaergaer', 'Contractual', '[]', 'wegfvsagadfga', '', 'Live-version available', '$1,000-$5,000', 'true', 'Romania', 'trettdragos@gmail.com', 'trettdragos@yahoo.com, ', 1),
('29C806CE-6B57-4CD6-BEFA-66108367C0F5', '1529503004701', 'active project', 'skbvks', 'Contractual', '[]', '', '', 'Ideea Stage', '$0-$1,000', 'false', 'Romania', 'trettdragos@yahoo.com', '', 1),
('4F30AB03-8D41-483E-BA1C-11F82B63E93F', '1529503004700', 'Testing', 'ADJFvhalsdjhfvmcasdljv,had', 'Contractual', '[]', 'kFSJFgliaks,fvkajsdh', '', 'Ideea Stage', '$0-$1,000', 'true', 'Romania', 'trettdragos@yahoo.com', 'trettdragos@gmail.com,teo.vecerdi@gmail.com,', 1),
('51F58C76-AEFD-4F47-BD05-1591467891A0', '1529503004720', 'Pula in cur', 'summary la project', 'Contractual', '[\"muie\",\"milena\",\"popa\",\"backend\"]', 'details on specific skills', '', 'Ideea Stage', '$0-$1,000', 'true', '', 'teo.vecerdi@gmail.com', '', 1),
('56607D81-BF95-489D-B262-FFCE99879BFC', '1529503004600', 'Ip Test', 'ksvjbxdfkfxdjkmvbdxj,m', 'Contractual', '[]', 'csdvd', '', 'Ideea Stage', '$0-$1,000', 'false', '', 'trettdragos@yahoo.com', '', 1),
('626B4997-6C36-4925-AEF9-FEE2F2B6E75C', '1529503004503', 'This is a Project', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Contractual', '[]', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '', 'Ideea Stage', '$0-$1,000', 'false', 'Romania', 'trettdragos@yahoo.com', 'guest@trett.me,teo.vecerdi@gmail.com,', 1),
('BA8C2515-3467-4F83-BB93-3D5B4C79A41D', '1529503004730', 'PROJECT VECE OWNER SMECHER', 'blabla', 'Contractual', '[\"nuj fra inca\"]', '<strong>pseudocode required !!!</strong>', '', 'Ideea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1),
('BC2608D0-6D9C-46C3-B5D6-63DF5B3F788B', '1529503004701', 'RANDOM PROJECT NAME', 'Has lorem singulis ea. Amet utroque luptatum ius te. Usu wisi vitae ad. Ex labitur maiestatis pri. Accumsan vituperata vel an, perfecto hendrerit vis eu, mei atqui assum epicuri in.\n\nMolestie invenire his ea, vis ad rebum saepe interesset? Liber patrioque nec at, qui interesset vituperatoribus at, ea consul invenire maluisset his? Ad sumo admodum volutpat has, vero movet intellegebat sed at. Et delenit mediocritatem est, alii sumo inciderint mei at? Exerci consetetur pri ne, mundi dissentias in nam! Ne iisque adversarium eum, ei mea tota mazim.', 'Contractual', '[\"muieeeee\"]', 'PHP IS REQUIRED', 'https://www.github.com/TeodorVecerdi/', 'Ideea Stage', '$0-$1,000', 'true', '', 'teo.vecerdi@gmail.com', 'jNUXlZWOO0,', 1),
('D23D77A9-A204-4DDC-9989-2F3F9C8736C9', '1529503859109', 'MANELE NOI PROJECT MIX 2018', 'MANELE NOI PROJECT MIX 2018', 'Contractual', '[\"MANELE.php\",\"<span style=\\\"color:red\\\">MANELE</span>\"]', '', '', 'Ideea Stage', '$0-$1,000', 'false', '', 'teo.vecerdi@gmail.com', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
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
  `ACTIVE` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`ID`, `TIMESTAMP`, `NAME`, `SUMMARY`, `HACKATON`, `SECTION`, `START_DATE`, `END_DATE`, `PLATFORMS`, `RESOURCE_LINK`, `NR_MEMBERS`, `POSTS`, `LEADER`, `ACTIVE`) VALUES
('0C736319-D123-40B9-8C08-D3166A4AF73B', '1529503004300', 'another notif', 'skvbdfxkjq', 'b', 'js,vbdf', '27/06/2018', '28/06/2018', '[]', '', '1', 'admin@trett.me, ', 'trettdragos@yahoo.com', 1),
('10B3ACF0-DC42-4CDF-B821-6A021687FBF7', '1529503004301', 'This is a team', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'TmHack', 'Mobile', '16/05/2018', '17/05/2018', '[]', '', '1', 'trettdragos@yahoo.com, trettdragos@gmail.com, ', 'guest@trett.me', 0),
('33873BE0-42B6-48BC-8B4A-9ED5B63C8BAF', '1529503004307', 'Test', 'test', 'test', 'test', '26/06/2018', '27/06/2018', '[\"test\",\"muie\",\"milena\",\"popa\"]', 'test', '1', 'trett.dragos@yahoo.com,', 'teo.vecerdi@gmail.com', 1),
('38238D52-6ED6-4DF2-9A1D-DA5BF4948B05', '1529503004100', 'team test', 'lkjvbs,jkm', 'kdvbdkjb,f', 'skjv,fb dfhm', '16/05/2018', '25/05/2018', '[]', '', '1', '', 'trettdragos@yahoo.com', 1),
('60392F46-6164-4EFA-A154-6F8F24DA268E', '1529503004000', 'testing notif', 'flskdhmbvflsdajfvb,hafsdblvj a,dfhvbalskf,vhablk,', 'jkwsdfvjbsdzfk,vjm', 'sdvfdfs', '28/05/2018', '30/05/2018', '[]', '', '1', 'trettdragos@yahoo.com, ', 'admin@trett.me', 0),
('70992467-8838-43CF-8A05-1B52FA35988F', '1529503004200', 'Test Echipa info', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill', 'PolyHack', 'web', '24/05/2018', '26/05/2018', '[]', '', '1', 'trettdragos@yahoo.com, ', 'trettdragos@gmail.com', 1),
('7154781D-5C36-4282-AFA1-E603B3C17989', '1529503004700', 'FOUNDER TEOVECE', 'cacat', 'cacat', 'cacat', '17/06/2018', '17/06/2018', '[\"mobile\",\"in php\"]', '', '1', '', 'teo.vecerdi@gmail.com', 1),
('B6377E2E-9CD7-4F5C-9A06-2CAAFC5DAEE7', '1529503004299', 'testing active', 'ana are mere', 'timCTF', 'web', '27/06/2018', '29/06/2018', '[]', '', '1', '', 'trettdragos@yahoo.com', 1),
('DD133986-A2DF-4F73-A418-D501959A0B58', '1529503004305', 'ghilimele', 'swkdvblfkd', 'bvsljfdbv', 'bvljskfb', '24/05/2018', '24/05/2018', '[]', '', '1', 'guest@trett.me, ', 'trettdragos@gmail.com', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
