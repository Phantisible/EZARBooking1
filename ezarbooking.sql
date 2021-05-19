-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2021 at 03:17 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ezarbooking`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accID` int(5) NOT NULL,
  `accUID` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'placeholderlogo.png',
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `contact` int(11) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `emailadd` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `accType` int(11) NOT NULL DEFAULT 0,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accID`, `accUID`, `image`, `fname`, `lname`, `gender`, `contact`, `birthdate`, `details`, `emailadd`, `password`, `accType`, `createdAt`) VALUES
(12, 'mSj3nzUZImzniobRALIcaOaI7pitTcAg', 'placeholderlogo.png', 'miami', 'lakers', 'undefined', NULL, NULL, NULL, 'ggo@yh.com', '32b36b7e0e07a3ed3a86', 0, '2021-05-08'),
(13, 'Ia1QU1lkzXbn7rEps5CDqovloLYkI10v', 'animegirl.jpg', 'maya', 'mai', 'Female', 920491029, '2021-03-16', 'no', 'miyu@yh.com', '59d11c4c2f46858eccbf', 0, '2021-05-08'),
(15, 'gONTsrxGIN7A8yE1rJNF41DDexYERmaK', 'placeholderlogo.png', 'ritsu', 'nunu', 'Male', 90319510, '2021-05-04', 'Maybe', 'ashi@yh.com', '794b57d1350b1a94b5d6', 1, '2021-05-08'),
(21, 'MEqNKoDw175ZR4JeCIxEP8IfXgJHVmG9', 'placeholderlogo.png', 'simea', 'loreine', 'Male', 95215215, '2021-05-05', 'Yes', 'nunu@yh.com', '6acb5d699d6a507a30a3', 0, '2021-05-08'),
(22, 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'animegirl.jpg', 'arnsk', 'plnks', 'Female', 912521059, '2021-05-06', 'no', 'a@yh.com', 'cd63fddbadec694a9be3', 1, '2021-05-08');

-- --------------------------------------------------------

--
-- Table structure for table `apartment`
--

CREATE TABLE `apartment` (
  `appID` int(4) NOT NULL,
  `accUID` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `baranggay` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `restriction` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `rating` float NOT NULL DEFAULT 0,
  `description` varchar(255) NOT NULL,
  `image1` varchar(255) NOT NULL DEFAULT 'defaultAppartmentImage.png',
  `image2` varchar(255) NOT NULL DEFAULT 'defaultAppartmentImage.png',
  `image3` varchar(255) NOT NULL DEFAULT 'defaultAppartmentImage.png',
  `image4` varchar(255) NOT NULL DEFAULT 'defaultAppartmentImage.png',
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `apartment`
--

INSERT INTO `apartment` (`appID`, `accUID`, `city`, `street`, `baranggay`, `type`, `capacity`, `restriction`, `price`, `rating`, `description`, `image1`, `image2`, `image3`, `image4`, `createdAt`) VALUES
(5, 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'Mandaue', 'Altinova', 'Timpolok', 'Shared', 2, 'None', 5000, 0, 'undefined', 'imgEZARDEVAPP.png', 'animegirl.jpg', 'undefined', 'undefined', '2021-05-08'),
(7, 'gONTsrxGIN7A8yE1rJNF41DDexYERmaK', 'Cebu', 'Maribago', 'Banana', 'Shared', 2, 'Females Only', 6000, 0, 'With Security and Bathroom', 'defaultAppartmentImage.png', 'defaultAppartmentImage.png', 'defaultAppartmentImage.png', 'defaultAppartmentImage.png', '2021-05-08'),
(10, 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'Mandaue', 'Basak', 'Gunob', 'Solo', 1, 'None', 500, 0, 'Nice for students', 'imgEZARDEVAPP.png', 'undefined', 'undefined', 'undefined', '2021-05-08');

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `forumID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'None',
  `accUID` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `text` varchar(100) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`forumID`, `name`, `type`, `accUID`, `image`, `text`, `createdAt`) VALUES
(1, 'awa awa', 'undefined', 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'undefined', 'fawfwafaw', '2021-05-08'),
(2, 'awa awa', 'findRoommate', 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'defaultAppartmetImage.png', 'awfawfawfwa', '2021-05-08'),
(3, 'fafafaf', 'findRoommate', 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'defaultAppartmetImage.png', 'afwaffaw', '2021-05-08'),
(4, 'Room Review on the horizon bleeps', 'review', 'Ia1QU1lkzXbn7rEps5CDqovloLYkI10v', 'animegirl.jpg', 'hello', '2021-05-08');

-- --------------------------------------------------------

--
-- Table structure for table `forumcomment`
--

CREATE TABLE `forumcomment` (
  `id` int(11) NOT NULL,
  `forumID` int(11) NOT NULL,
  `accUID` varchar(255) NOT NULL,
  `text` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forumcomment`
--

INSERT INTO `forumcomment` (`id`, `forumID`, `accUID`, `text`, `createdAt`) VALUES
(2, 4, 'Ia1QU1lkzXbn7rEps5CDqovloLYkI10v', 'Its bad as in bad', '2021-05-08 17:21:33'),
(5, 4, 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'somting somting', '2021-05-09 06:26:29'),
(6, 4, 'Js61u92fOg8OvCxHAT7rxeaqneasXeid', 'moron', '2021-05-09 06:30:19'),
(9, 4, 'Ia1QU1lkzXbn7rEps5CDqovloLYkI10v', 'wyd', '2021-05-09 07:31:33');

-- --------------------------------------------------------

--
-- Table structure for table `rentrequest`
--

CREATE TABLE `rentrequest` (
  `requestID` int(11) NOT NULL,
  `tenantUID` varchar(255) NOT NULL,
  `appID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rentrequest`
--

INSERT INTO `rentrequest` (`requestID`, `tenantUID`, `appID`) VALUES
(22, 'MEqNKoDw175ZR4JeCIxEP8IfXgJHVmG9', 7),
(24, 'Ia1QU1lkzXbn7rEps5CDqovloLYkI10v', 7),
(25, 'Ia1QU1lkzXbn7rEps5CDqovloLYkI10v', 5),
(27, 'MEqNKoDw175ZR4JeCIxEP8IfXgJHVmG9', 5);

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `id` int(11) NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`id`, `picture`) VALUES
(3, 'imgEZARDEVAPP.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accID`);

--
-- Indexes for table `apartment`
--
ALTER TABLE `apartment`
  ADD PRIMARY KEY (`appID`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`forumID`);

--
-- Indexes for table `forumcomment`
--
ALTER TABLE `forumcomment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rentrequest`
--
ALTER TABLE `rentrequest`
  ADD PRIMARY KEY (`requestID`);

--
-- Indexes for table `sample`
--
ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `accID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `apartment`
--
ALTER TABLE `apartment`
  MODIFY `appID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `forumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `forumcomment`
--
ALTER TABLE `forumcomment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `rentrequest`
--
ALTER TABLE `rentrequest`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `sample`
--
ALTER TABLE `sample`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
