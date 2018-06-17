-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2018 at 02:36 PM
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
(14, 'Trett', 'trettdragos@yahoo.com', '$2b$10$0WD6v6gmdYXlLF.3xyNrs.wqQUQAoAyqL1Boq1fgSFKkDLGfRquFu', '{ 	\"GITHUB\": \"kjmfw svjds\", 	\"LINKEDIN\": \"\", 	\"SKILLS\": [], 	\"ABOUT\": \"\", 	\"PROFILE_PICTURE\": \"\" }', '1', '[{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"},{\"user\":\"admin@trett.me\",\"vis\":\"true\",\"type\":\"team\",\"name\":\"another notif\",\"id\":\"admintrettmeanothernotif\"}]'),
(18, 'Teodor Vecerdi', 'teodor.vecerdi@gmail.com', '$2b$10$n023sngtU0q47x/FPBYWdOjTPULlclSA3NUesn6XAs8t.c3JOndjy', '{\"GITHUB\":\"https://www.github.com\",\"LINKEDIN\":\"https://www.linkedin.com\",\"SKILLS\":[\"php\",\"e\",\"cancer\",\"♥\"],\"ABOUT\":\"Test about\",\"PROFILE_PICTURE\":\"\"}', '1', '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
