-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2019 at 12:52 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slot_booking_bmtc`
--

-- --------------------------------------------------------

--
-- Table structure for table `bmtc_bus`
--

CREATE TABLE `bmtc_bus` (
  `bus_id` int(128) NOT NULL,
  `bus_num` varchar(128) NOT NULL,
  `bus_time` time(6) NOT NULL,
  `bus_class` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bmtc_bus`
--

INSERT INTO `bmtc_bus` (`bus_id`, `bus_num`, `bus_time`, `bus_class`) VALUES
(1, '500-D', '07:30:00.000000', 'VOLVO A/C'),
(2, '500-DE', '08:30:00.000000', 'VOLVO A/C'),
(3, '500-M', '07:00:00.000000', 'VAYU VAJRA'),
(4, '304-NA', '00:00:00.000000', ''),
(5, '304-P', '00:00:00.000000', ''),
(6, '304-X', '00:00:00.000000', ''),
(7, '305', '00:00:00.000000', ''),
(8, '305-A', '00:00:00.000000', ''),
(9, '305-D', '07:30:00.000000', ''),
(10, '305-H', '00:00:00.000000', ''),
(11, '305-M', '00:00:00.000000', ''),
(12, '305-V', '00:00:00.000000', '');

-- --------------------------------------------------------

--
-- Table structure for table `bmtc_bus_trip_locn_map`
--

CREATE TABLE `bmtc_bus_trip_locn_map` (
  `map_id` int(128) NOT NULL,
  `bus_id` int(128) NOT NULL,
  `trip_id` int(128) NOT NULL,
  `loc_id` int(128) NOT NULL,
  `from_loc` int(128) NOT NULL,
  `to_loc` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bmtc_bus_trip_locn_map`
--

INSERT INTO `bmtc_bus_trip_locn_map` (`map_id`, `bus_id`, `trip_id`, `loc_id`, `from_loc`, `to_loc`) VALUES
(1, 1, 1, 1, 1, 15),
(2, 1, 1, 2, 1, 15),
(3, 1, 1, 3, 1, 15),
(4, 1, 1, 4, 1, 15),
(5, 1, 1, 5, 1, 15),
(6, 1, 1, 6, 1, 15),
(7, 1, 1, 7, 1, 15),
(8, 1, 1, 8, 1, 15),
(9, 1, 1, 9, 1, 15),
(10, 1, 1, 10, 1, 15),
(11, 1, 1, 11, 1, 15),
(12, 1, 1, 12, 1, 15),
(13, 1, 1, 13, 1, 15),
(14, 1, 1, 14, 1, 15),
(15, 1, 1, 15, 1, 15),
(16, 2, 2, 15, 15, 1),
(17, 3, 2, 14, 15, 1),
(18, 2, 2, 13, 15, 1),
(19, 3, 2, 12, 15, 1),
(20, 3, 2, 11, 15, 1),
(21, 2, 2, 10, 15, 1),
(22, 3, 2, 9, 15, 1),
(23, 2, 2, 8, 15, 1),
(24, 2, 2, 7, 15, 1),
(25, 2, 2, 6, 15, 1),
(26, 3, 2, 5, 15, 1),
(27, 2, 2, 4, 15, 1),
(28, 2, 2, 3, 15, 1),
(29, 3, 2, 2, 15, 1),
(30, 2, 2, 1, 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bmtc_location`
--

CREATE TABLE `bmtc_location` (
  `loc_id` int(128) NOT NULL,
  `loc_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bmtc_location`
--

INSERT INTO `bmtc_location` (`loc_id`, `loc_name`) VALUES
(1, 'Hebbala Bridge'),
(2, 'Kempapura'),
(3, 'Veeranna Palya '),
(4, 'Manyatha Tech Park'),
(5, 'Nagavara Junction'),
(6, 'Hbr Layout'),
(7, 'Hennuru Junction'),
(8, 'Kalyananagara Bus Stand'),
(9, 'Kalyananagara 80 Feet Road'),
(10, 'Babusab Palya '),
(11, 'Horamavu Petrol Bunk '),
(12, 'Vijaya Bank Colony '),
(13, 'Jn of B Channasandra'),
(14, 'Kasturi Nagara'),
(15, 'Tin Factory');

-- --------------------------------------------------------

--
-- Table structure for table `bmtc_seat_book`
--

CREATE TABLE `bmtc_seat_book` (
  `seat_id` int(128) NOT NULL,
  `bus_id` int(128) NOT NULL,
  `trip_id` int(128) NOT NULL,
  `from_loc` int(128) NOT NULL,
  `to_loc` int(128) NOT NULL,
  `book_status` int(128) NOT NULL,
  `seat_num` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bmtc_seat_book`
--

INSERT INTO `bmtc_seat_book` (`seat_id`, `bus_id`, `trip_id`, `from_loc`, `to_loc`, `book_status`, `seat_num`) VALUES
(1, 2, 2, 15, 1, 1, 1),
(2, 2, 2, 15, 1, 1, 2),
(3, 2, 2, 15, 1, 1, 3),
(4, 2, 2, 15, 1, 1, 4),
(5, 1, 1, 2, 3, 1, 2),
(6, 1, 1, 2, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bmtc_trip`
--

CREATE TABLE `bmtc_trip` (
  `trip_id` int(128) NOT NULL,
  `trips` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bmtc_trip`
--

INSERT INTO `bmtc_trip` (`trip_id`, `trips`) VALUES
(1, 'Trip 1'),
(2, 'Trip 2');

-- --------------------------------------------------------

--
-- Table structure for table `bmtc_userlogin`
--

CREATE TABLE `bmtc_userlogin` (
  `id` int(128) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `mobile` varchar(128) NOT NULL,
  `photo` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bmtc_userlogin`
--

INSERT INTO `bmtc_userlogin` (`id`, `username`, `password`, `name`, `mobile`, `photo`) VALUES
(1, 'admin', 'admin', 'admin', '9874563210', ''),
(2, 't', 't', 'test', '9638527410', ''),
(3, 'akki@gmail.com', 'Akki', 'akshay', '9876578965', ''),
(4, 'a', 'a', 'amar', '9665563698', ''),
(5, '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bmtc_bus`
--
ALTER TABLE `bmtc_bus`
  ADD PRIMARY KEY (`bus_id`);

--
-- Indexes for table `bmtc_bus_trip_locn_map`
--
ALTER TABLE `bmtc_bus_trip_locn_map`
  ADD PRIMARY KEY (`map_id`);

--
-- Indexes for table `bmtc_location`
--
ALTER TABLE `bmtc_location`
  ADD PRIMARY KEY (`loc_id`);

--
-- Indexes for table `bmtc_seat_book`
--
ALTER TABLE `bmtc_seat_book`
  ADD PRIMARY KEY (`seat_id`);

--
-- Indexes for table `bmtc_trip`
--
ALTER TABLE `bmtc_trip`
  ADD PRIMARY KEY (`trip_id`);

--
-- Indexes for table `bmtc_userlogin`
--
ALTER TABLE `bmtc_userlogin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bmtc_bus`
--
ALTER TABLE `bmtc_bus`
  MODIFY `bus_id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `bmtc_bus_trip_locn_map`
--
ALTER TABLE `bmtc_bus_trip_locn_map`
  MODIFY `map_id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `bmtc_location`
--
ALTER TABLE `bmtc_location`
  MODIFY `loc_id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `bmtc_seat_book`
--
ALTER TABLE `bmtc_seat_book`
  MODIFY `seat_id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `bmtc_trip`
--
ALTER TABLE `bmtc_trip`
  MODIFY `trip_id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `bmtc_userlogin`
--
ALTER TABLE `bmtc_userlogin`
  MODIFY `id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
