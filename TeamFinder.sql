-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2018 at 02:34 PM
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

CREATE TABLE `accounts` (
  `ID` int(11) NOT NULL,
  `USERNAME` text NOT NULL,
  `EMAIL` text NOT NULL,
  `PASSWORD` varchar(61) NOT NULL,
  `LINKEDIN` text NOT NULL,
  `GITHUB` text NOT NULL,
  `SKILLS` text NOT NULL,
  `CONFIRMED` text NOT NULL,
  `NOTIFICATION` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `LINKEDIN`, `GITHUB`, `SKILLS`, `CONFIRMED`, `NOTIFICATION`) VALUES
(12, 'Test', 'teo.vecerdi@gmail.com', '$2b$10$Uj.f9mVXXtiES4DNQWxWM.n3SDyXEMkmOp7IYUi6DyoOovniFb8D.', '', '', '{\"webBackEnd\":\"false\",\"webFrontEnd\":\"false\",\"androidBackEnd\":\"false\",\"androidFrontEnd\":\"false\",\"game\":\"false\",\"design\":\"false\",\"embeded\":\"false\",\"security\":\"false\",\"otherName\":\"\"}', '1', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `ID` int(11) NOT NULL,
  `NAME` text NOT NULL,
  `SUMMARY` text NOT NULL,
  `COMMITMENT` text NOT NULL,
  `PLATFORMS` text NOT NULL,
  `PLATFORM_DETAILS` text NOT NULL,
  `STAGE` text NOT NULL,
  `BUDGET` text NOT NULL,
  `FUNDING` text NOT NULL,
  `NATIONAL` text NOT NULL,
  `FOUNDER` text NOT NULL,
  `COLLABORATORS` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`ID`, `NAME`, `SUMMARY`, `COMMITMENT`, `PLATFORMS`, `PLATFORM_DETAILS`, `STAGE`, `BUDGET`, `FUNDING`, `NATIONAL`, `FOUNDER`, `COLLABORATORS`) VALUES
(1, 'This is a Project', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Contractual', '{\"Android\":true,\"iOS\":true,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Ideea Stage', '$0-$1,000', '0', 'Romania', 'trettdragos@yahoo.com', 'guest@trett.me, '),
(2, 'Testing', 'ADJFvhalsdjhfvmcasdljv,had', 'Contractual', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":true,\"webBack\":true}', 'kFSJFgliaks,fvkajsdh', 'Ideea Stage', '$0-$1,000', '1', 'Romania', 'trettdragos@yahoo.com', 'trettdragos@gmail.com, '),
(3, 'Has No Country', 'dfkbvdfkjvbkdfbv', 'Contractual', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', '', 'Ideea Stage', '$0-$1,000', '0', '', 'trettdragos@yahoo.com', 'trettdragos@gmail.com, '),
(4, 'test from other pc', 'fasdgvasgWSRGargargaergaer', 'Contractual', '{\"Android\":true,\"iOS\":true,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', 'wegfvsagadfga', 'Live-version available', '$1,000-$5,000', '1', 'Romania', 'trettdragos@gmail.com', 'trettdragos@yahoo.com, '),
(5, 'RANDOM PROJECT NAME', 'Has lorem singulis ea. Amet utroque luptatum ius te. Usu wisi vitae ad. Ex labitur maiestatis pri. Accumsan vituperata vel an, perfecto hendrerit vis eu, mei atqui assum epicuri in.\n\nMolestie invenire his ea, vis ad rebum saepe interesset? Liber patrioque nec at, qui interesset vituperatoribus at, ea consul invenire maluisset his? Ad sumo admodum volutpat has, vero movet intellegebat sed at. Et delenit mediocritatem est, alii sumo inciderint mei at? Exerci consetetur pri ne, mundi dissentias in nam! Ne iisque adversarium eum, ei mea tota mazim.', 'Full-time', '{\"Android\":\"true\",\"iOS\":\"true\",\"Desktop\":\"true\",\"WebFront\":\"true\",\"webBack\":\"true\"}', 'PHP IS REQUIRED', 'Prototype Already Build', '$100,000+', 'true', '', 'teo.vecerdi@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `ID` int(11) NOT NULL,
  `NAME` text NOT NULL,
  `SUMMARY` text NOT NULL,
  `HACKATON` text NOT NULL,
  `SECTION` text NOT NULL,
  `START_DATE` text NOT NULL,
  `END_DATE` text NOT NULL,
  `PLATFORMS` text NOT NULL,
  `NR_MEMBERS` text NOT NULL,
  `POSTS` text NOT NULL,
  `LEADER` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`ID`, `NAME`, `SUMMARY`, `HACKATON`, `SECTION`, `START_DATE`, `END_DATE`, `PLATFORMS`, `NR_MEMBERS`, `POSTS`, `LEADER`) VALUES
(1, 'This is a team', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'TmHack', 'Mobile', '16/05/2018', '17/05/2018', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":true,\"webBack\":true}', '1', 'trettdragos@yahoo.com, trettdragos@gmail.com, ', 'guest@trett.me'),
(2, 'team test', 'lkjvbs,jkm', 'kdvbdkjb,f', 'skjv,fb dfhm', '16/05/2018', '25/05/2018', '{\"Android\":true,\"iOS\":true,\"Desktop\":false,\"WebFront\":false,\"webBack\":false}', '1', '', 'trettdragos@yahoo.com'),
(3, 'ghilimele', 'swkdvblfkd', 'bvsljfdbv', 'bvljskfb', '24/05/2018', '24/05/2018', '{\"Android\":false,\"iOS\":true,\"Desktop\":true,\"WebFront\":true,\"webBack\":false}', '1', 'guest@trett.me, ', 'trettdragos@gmail.com'),
(4, 'Test Echipa info', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill', 'PolyHack', 'web', '24/05/2018', '26/05/2018', '{\"Android\":false,\"iOS\":false,\"Desktop\":false,\"WebFront\":true,\"webBack\":true}', '1', 'trettdragos@yahoo.com, ', 'trettdragos@gmail.com');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
