-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2018 at 10:05 PM
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
  `ID` int(11) NOT NULL,
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
(12, 'Teodor Vecerdi', 'teo.vecerdi@gmail.com', '$2b$10$TFuLU9I/PrqIxgoYFLuQWOhYPLKJPPRzJ4p3trc8PxtjRTp1/LFjy', '{\"GITHUB\":\"https://www.github.com/TeodorVecerdi\",\"LINKEDIN\":\"https://www.linkedin.com/in/teodor-vecerdi-97b153135/\",\"SKILLS\":[\"PHP♥♥\",\"Web Backend in Python\",\"Web Backend in Node\",\"Javascript\",\"C++\"],\"ABOUT\":\"Web Developer | Backend\",\"PROFILE_PICTURE\":\"\"}', '1', '[]'),
(13, 'Trett ', 'admin@trett.me', '$2b$10$oq1/EAEcTHitlstCvZ2B.uObg02Nc9ykvEMMmbHXF6M7..I4Im8Oq', '{ 	\"GITHUB\": \"\", 	\"LINKEDIN\": \"\", 	\"SKILLS\":[], 	\"ABOUT\": \"TEST ABOUT\", 	\"PROFILE_PICTURE\": \"\" }', '1', '[{\"user\":\"trettdragos@yahoo.com\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"testing notif\",\"id\":\"trettdragosyahoocomtestingnotif\"},{\"user\":\"trettdragos@yahoo.com\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"testing notif\",\"id\":\"trettdragosyahoocomtestingnotif\"}]'),
(14, 'Trett', 'trettdragos@yahoo.com', '$2b$10$0WD6v6gmdYXlLF.3xyNrs.wqQUQAoAyqL1Boq1fgSFKkDLGfRquFu', '{\"GITHUB\":\"kjmfw svjds\",\"LINKEDIN\":\"skjfv,bdf,\",\"SKILLS\":[],\"ABOUT\":\"I like big booties and I can not lie\",\"PROFILE_PICTURE\":\"\"}', '1', '[{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"project\",\"name\":\"iptest2\",\"id\":\"admintrettmeiptest2\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `ID` int(11) NOT NULL,
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

INSERT INTO `projects` (`ID`, `NAME`, `SUMMARY`, `COMMITMENT`, `PLATFORMS`, `PLATFORM_DETAILS`, `RESOURCE_LINK`, `STAGE`, `BUDGET`, `FUNDING`, `NATIONAL`, `FOUNDER`, `COLLABORATORS`, `ACTIVE`) VALUES
(1, 'This is a Project', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Contractual', '{\"Android\":true,\"iOS\":true,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '', 'Ideea Stage', '$0-$1,000', '0', 'Romania', 'trettdragos@yahoo.com', 'guest@trett.me, ', 1),
(2, 'Testing', 'ADJFvhalsdjhfvmcasdljv,had', 'Contractual', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":true,\"webBack\":true}', 'kFSJFgliaks,fvkajsdh', '', 'Ideea Stage', '$0-$1,000', '1', 'Romania', 'trettdragos@yahoo.com', 'trettdragos@gmail.com, ', 1),
(3, 'Has No Country', 'dfkbvdfkjvbkdfbv', 'Contractual', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', '', '', 'Ideea Stage', '$0-$1,000', '0', '', 'trettdragos@yahoo.com', 'trettdragos@gmail.com, ', 1),
(4, 'test from other pc', 'fasdgvasgWSRGargargaergaer', 'Contractual', '{\"Android\":true,\"iOS\":true,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', 'wegfvsagadfga', '', 'Live-version available', '$1,000-$5,000', '1', 'Romania', 'trettdragos@gmail.com', 'trettdragos@yahoo.com, ', 1),
(5, 'RANDOM PROJECT NAME', 'Has lorem singulis ea. Amet utroque luptatum ius te. Usu wisi vitae ad. Ex labitur maiestatis pri. Accumsan vituperata vel an, perfecto hendrerit vis eu, mei atqui assum epicuri in.\n\nMolestie invenire his ea, vis ad rebum saepe interesset? Liber patrioque nec at, qui interesset vituperatoribus at, ea consul invenire maluisset his? Ad sumo admodum volutpat has, vero movet intellegebat sed at. Et delenit mediocritatem est, alii sumo inciderint mei at? Exerci consetetur pri ne, mundi dissentias in nam! Ne iisque adversarium eum, ei mea tota mazim.', 'Contractual', '{\"Android\":\"true\",\"iOS\":\"true\",\"Desktop\":\"true\",\"WebFront\":\"true\",\"webBack\":\"true\"}', 'PHP IS REQUIRED', 'https://www.github.com/TeodorVecerdi/', 'Ideea Stage', '$0-$1,000', 'true', '', 'teo.vecerdi@gmail.com', '', 1),
(7, 'active project', 'skbvks', 'Contractual', '{\"Android\":\"false\",\"iOS\":\"true\",\"Desktop\":\"false\",\"WebFront\":\"false\",\"webBack\":\"false\"}', '', '', 'Ideea Stage', '$0-$1,000', 'false', 'Romania', 'trettdragos@yahoo.com', '', 1),
(8, 'Ip Test', 'ksvjbxdfkfxdjkmvbdxj,m', 'Contractual', '{\"Android\":\"false\",\"iOS\":\"false\",\"Desktop\":\"false\",\"WebFront\":\"false\",\"webBack\":\"false\"}', 'csdvd', '', 'Ideea Stage', '$0-$1,000', 'false', '', 'trettdragos@yahoo.com', '', 1),
(9, 'iptest2', 'ana are mere', 'Contractual', '{\"Android\":\"true\",\"iOS\":\"false\",\"Desktop\":\"false\",\"WebFront\":\"false\",\"webBack\":\"false\"}', '', '', 'Ideea Stage', '$0-$1,000', 'true', 'Romania', 'trettdragos@yahoo.com', 'admin@trett.me, ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `ID` int(11) NOT NULL,
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

INSERT INTO `teams` (`ID`, `NAME`, `SUMMARY`, `HACKATON`, `SECTION`, `START_DATE`, `END_DATE`, `PLATFORMS`, `RESOURCE_LINK`, `NR_MEMBERS`, `POSTS`, `LEADER`, `ACTIVE`) VALUES
(1, 'This is a team', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'TmHack', 'Mobile', '16/05/2018', '17/05/2018', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":true,\"webBack\":true}', '', '1', 'trettdragos@yahoo.com, trettdragos@gmail.com, ', 'guest@trett.me', 0),
(2, 'team test', 'lkjvbs,jkm', 'kdvbdkjb,f', 'skjv,fb dfhm', '16/05/2018', '25/05/2018', '{\"Android\":true,\"iOS\":true,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', '', '1', '', 'trettdragos@yahoo.com', 1),
(3, 'ghilimele', 'swkdvblfkd', 'bvsljfdbv', 'bvljskfb', '24/05/2018', '24/05/2018', '{\"Android\":false,\"iOS\":true,\"Desktop\":true,\"WebFront\":true,\"webBack\":false}', '', '1', 'guest@trett.me, ', 'trettdragos@gmail.com', 0),
(4, 'Test Echipa info', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill', 'PolyHack', 'web', '24/05/2018', '26/05/2018', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":true,\"webBack\":true}', '', '1', 'trettdragos@yahoo.com, ', 'trettdragos@gmail.com', 1),
(5, 'testing notif', 'flskdhmbvflsdajfvb,hafsdblvj a,dfhvbalskf,vhablk,', 'jkwsdfvjbsdzfk,vjm', 'sdvfdfs', '28/05/2018', '30/05/2018', '{\"Android\":\"true\",\"iOS\":\"true\",\"Desktop\":\"false\",\"WebFront\":\"false\",\"webBack\":\"false\"}', '', '1', 'trettdragos@yahoo.com, ', 'admin@trett.me', 0),
(6, 'another notif', 'skvbdfxkjq', 'b', 'js,vbdf', '27/06/2018', '28/06/2018', '{\"Android\":\"true\",\"iOS\":\"false\",\"Desktop\":\"false\",\"WebFront\":\"false\",\"webBack\":\"false\"}', '', '1', 'admin@trett.me, ', 'trettdragos@yahoo.com', 1),
(7, 'testing active', 'ana are mere', 'timCTF', 'web', '27/06/2018', '29/06/2018', '{\"Android\":\"true\",\"iOS\":\"false\",\"Desktop\":\"false\",\"WebFront\":\"false\",\"webBack\":\"false\"}', '', '1', '', 'trettdragos@yahoo.com', 1),
(8, 'Test', 'test', 'test', 'test', '26/06/2018', '27/06/2018', '{\"Android\":\"true\",\"iOS\":\"true\",\"Desktop\":\"true\",\"WebFront\":\"false\",\"webBack\":\"false\"}', 'test', '1', '', 'teo.vecerdi@gmail.com', 1);

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

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
