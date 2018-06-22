-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 22 Iun 2018 la 20:32
-- Versiune server: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TeamFinder`
--

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `group_messages`
--

CREATE TABLE `group_messages` (
  `id` int(11) NOT NULL,
  `from_uuid` char(36) NOT NULL,
  `from_name` text NOT NULL,
  `group_uuid` char(36) NOT NULL,
  `message` text NOT NULL,
  `timestamp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `group_messages`
--

INSERT INTO `group_messages` (`id`, `from_uuid`, `from_name`, `group_uuid`, `message`, `timestamp`) VALUES
(3, '0', 'Trett Dragos', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'test 2', '1529672843810'),
(4, '0', 'Trett Dragos', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'test mata', '1529672877121'),
(5, '0', 'Trett Dragos', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'shit', '1529673337787'),
(6, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett', '10B3ACF0-DC42-4CDF-B821-6A021687FBF7', 'fuck me', '1529673359658'),
(7, '0', 'Trett Dragos', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'shit', '1529674353467'),
(8, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'test2', '1529674388561'),
(9, '96FA97C7-FADD-4EB1-997F-68FB02C64AA2', 'Trett', '4F30AB03-8D41-483E-BA1C-11F82B63E93F', 'shit', '1529679605239');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `group_messages`
--
ALTER TABLE `group_messages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `group_messages`
--
ALTER TABLE `group_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
