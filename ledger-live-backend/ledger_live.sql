-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 15, 2026 at 06:53 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ledger_live`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_01_14_071812_create_oauth_auth_codes_table', 1),
(5, '2026_01_14_071813_create_oauth_access_tokens_table', 1),
(6, '2026_01_14_071814_create_oauth_refresh_tokens_table', 1),
(7, '2026_01_14_071815_create_oauth_clients_table', 1),
(8, '2026_01_14_071816_create_oauth_device_codes_table', 1),
(9, '2026_01_14_071817_create_oauth_personal_access_clients_table', 1),
(10, '2026_01_14_082700_add_role_to_users_table', 1),
(11, '2026_01_14_082702_create_wallets_table', 1),
(12, '2026_01_14_082706_create_transactions_table', 1),
(13, '2026_01_15_042700_add_name_to_wallets_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0163318a1a0df88e6eb60b2f5898fe232601e5fad5adf26ed95b4f56515731c2c1092da7320a2ad1', 8, '019bc02d-265d-7135-a5b6-6f2d53a611af', 'auth_token', '[]', 0, '2026-01-15 00:51:37', '2026-01-15 00:51:37', '2027-01-15 05:51:37'),
('2bd09be4b04deb114429e51c176bccf771c94126275b850fc1ce2743fadac78a0ef87ab089ac9cb3', 7, '019bc02d-265d-7135-a5b6-6f2d53a611af', 'auth_token', '[]', 0, '2026-01-15 00:49:53', '2026-01-15 00:49:53', '2027-01-15 05:49:53'),
('6cf8295a169dd4180829ca85bd346c30227b30210f1e4f35fcd9c94e52e51ec692875c3460a810db', 6, '019bc02d-265d-7135-a5b6-6f2d53a611af', 'auth_token', '[]', 0, '2026-01-15 00:48:14', '2026-01-15 00:48:14', '2027-01-15 05:48:14'),
('8aa9abf6fdda7103b3f6d4b5b3e8e675e5a43d89d570ba347f6e58a2975e1e1b8c3c2096fbb50bc8', 7, '019bc02d-265d-7135-a5b6-6f2d53a611af', 'auth_token', '[]', 0, '2026-01-15 00:49:10', '2026-01-15 00:49:10', '2027-01-15 05:49:10'),
('c9ba19de871285824da70c95922d1cc15915f37b777e0a2c73052522ec26dffe6797af6a7616ab65', 1, '019bc02d-265d-7135-a5b6-6f2d53a611af', 'auth_token', '[]', 0, '2026-01-15 00:43:19', '2026-01-15 00:43:19', '2027-01-15 05:43:19');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` char(36) NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` char(36) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
('019bc02d-265d-7135-a5b6-6f2d53a611af', NULL, 'Ledger Live Personal Access Client', '$2y$12$jMwmLrNsHgaob8gDMvEs2O4YxSnchyrWqmIc//oQszOJy5JYnf.om', 'users', '', 1, 0, 0, '2026-01-15 00:42:23', '2026-01-15 00:42:23');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_device_codes`
--

CREATE TABLE `oauth_device_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `user_code` char(8) NOT NULL,
  `scopes` text NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `user_approved_at` datetime DEFAULT NULL,
  `last_polled_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` char(80) NOT NULL,
  `access_token_id` char(80) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('credit','debit') NOT NULL,
  `amount` decimal(20,8) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `transaction_hash` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `balance_after` decimal(20,8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `wallet_id`, `type`, `amount`, `status`, `transaction_hash`, `description`, `balance_after`, `created_at`, `updated_at`) VALUES
(1, 1, 'credit', 36.79000000, 'confirmed', 'YXKWrBAej6bcGPZLwg9rF386XN75xupHpTE6emGrjGPZjqVNgq1XXaqDryKRe6tP', 'You received 36.79 BTC from Initial Deposit.', 36.79000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(2, 2, 'credit', 62.13000000, 'confirmed', 'yqFUA3os5obFrAQwLgKTUfXBVBorXeX4NAidaBXFrTxuRWj4yLExi4SfsrzVozCW', 'You received 62.13 ETH from Initial Deposit.', 62.13000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(3, 3, 'credit', 13.03000000, 'confirmed', 'ccafVdeZiOzpPeqmnFyXSu1x8va71cNNr512LH9Zl9zR9GpC17lNdqnpOOOh59PJ', 'You received 13.03 USDT from Initial Deposit.', 13.03000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(4, 4, 'credit', 33.26000000, 'confirmed', 'jhTJ6IFyhj0qyAqtk48jo7bljLCVA4kK630vcdI0RQXCenYc92Dyf0demoG8aSzb', 'You received 33.26 BNB from Initial Deposit.', 33.26000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(5, 5, 'credit', 12.58000000, 'confirmed', 'UYdbRVibZW7rMBzdi0fk8xuHXOghU29bPBchEfuaJM3Lk1rsKzsJTYofgkQCWlV6', 'You received 12.58 SOL from Initial Deposit.', 12.58000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(6, 6, 'credit', 4.34000000, 'confirmed', 'LMKptA9LSEnelSn2WrWxkSynAYS7OywH1d4OhE1XRfXNSUbbgx10zPQFOY28xNNa', 'You received 4.34 ADA from Initial Deposit.', 4.34000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(7, 7, 'credit', 26.84000000, 'confirmed', 'GJFccIF19jPZDeP4hpgukOuIX8VGdMD2Lf4s5bXqrDeP3cjAPvSTw5bQ4IcmSB2S', 'You received 26.84 BTC from Initial Deposit.', 26.84000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(8, 8, 'credit', 58.63000000, 'confirmed', '2QPtIZK9lIuXLtPiCYGyDbyVCrvVOFNKGzpzcDHoqGBbFNH69t1InLsyOQJN0v1h', 'You received 58.63 ETH from Initial Deposit.', 58.63000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(9, 9, 'credit', 56.38000000, 'confirmed', 'qijkCVYkNyBhPhdqVLxm8nkd5sVOsnE5LpUGyQkKfFSYtSv19BLn7kDGzHS0eHiy', 'You received 56.38 USDT from Initial Deposit.', 56.38000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(10, 10, 'credit', 59.19000000, 'confirmed', 'lXQLA5lUEONd7yeTfCVkwBJbW15gYcFLDNCnLcWDUuoEyVuwLzH0DTHa7U3T15A3', 'You received 59.19 BNB from Initial Deposit.', 59.19000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(11, 11, 'credit', 50.47000000, 'confirmed', '24YG6oKCIEPqn9YWIP1r1GczAWm33Ndszd4QxRtuMCuFLWSx8yirF9BUSERwWM2s', 'You received 50.47 SOL from Initial Deposit.', 50.47000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(12, 12, 'credit', 46.03000000, 'confirmed', '0oYz3Yl7I4dDTQKatFz4VrW2WUFSh5Ot83kqafi9Kbu4v7zZ07mVaVz00N9nkoYA', 'You received 46.03 ADA from Initial Deposit.', 46.03000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(13, 1, 'debit', 0.00100000, 'pending', 'lcDLLGcmO6909dJi17DvhPuqgpBQAhmhpB3LX1KCWz84lnZCe0NlO5g9hDxznysL', 'You sent 0.001 BTC. Your balance decreased because funds moved to another simulated wallet.', 36.78900000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(14, 7, 'credit', 0.00100000, 'pending', 'lcDLLGcmO6909dJi17DvhPuqgpBQAhmhpB3LX1KCWz84lnZCe0NlO5g9hDxznysL', 'You received 0.001 BTC. Your balance increased because funds were credited.', 26.84000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(15, 8, 'debit', 0.50000000, 'pending', 'LrNscccqIQdTvT4rQCM81CoI3QlZY4fdVe7pswX5oRWrNpgIa71w6A0OCTclj2IT', 'You sent 0.5 ETH. Your balance decreased because funds moved to another simulated wallet.', 58.13000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(16, 2, 'credit', 0.50000000, 'pending', 'LrNscccqIQdTvT4rQCM81CoI3QlZY4fdVe7pswX5oRWrNpgIa71w6A0OCTclj2IT', 'You received 0.5 ETH. Your balance increased because funds were credited.', 62.13000000, '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(17, 1, 'credit', 4.20000000, 'confirmed', 'J0hIRYonRceqFGihsv6Cpm4xOCppOZkQIyvn2Bt0eCsktKIXK2vpLzB7ezHxDQ4w', 'Historical Activity', 40.98900000, '2025-01-15 00:41:55', '2025-01-15 00:41:55'),
(18, 2, 'credit', 4.43000000, 'confirmed', 'JKw76323zg6hZvoiKfgVuMZMwHVXGh8cBNj2rHvakFMQpSrZjVOHYFuOPNhRSY0T', 'Historical Activity', 66.56000000, '2025-01-15 00:41:55', '2025-01-15 00:41:55'),
(19, 3, 'credit', 1.50000000, 'confirmed', 'YeOqgN1s9XLpIfhy0M8sKzMP3Z4zHCMjNvIEmD8P4FAprIyXkIofQuvO3rjxRpW4', 'Historical Activity', 14.53000000, '2025-01-15 00:41:55', '2025-01-15 00:41:55'),
(20, 5, 'credit', 3.62000000, 'confirmed', 'BmEpuvJwNAnO5PwE2PmGxAHsTkcMQTv09roXxORG4lRVlogEX55Hnd1K9l0v1lcf', 'Historical Activity', 16.20000000, '2025-01-15 00:41:55', '2025-01-15 00:41:55'),
(21, 1, 'credit', 1.47000000, 'confirmed', 'Vl3r98vUxBikiLV3n54lk1v3ySvpghxUvF8nGKzBlFn7jF3TTCnsHiWGbYOL2i7t', 'Historical Activity', 42.45900000, '2025-04-15 00:41:55', '2025-04-15 00:41:55'),
(22, 2, 'credit', 0.83000000, 'confirmed', 'dN37e6OfilzncP1f2DPW0Ilpj2rFe2zxvRoRDNPtOacccY0XXSYl0x1YiLN3cJR9', 'Historical Activity', 67.39000000, '2025-04-15 00:41:55', '2025-04-15 00:41:55'),
(23, 3, 'credit', 4.85000000, 'confirmed', 'wqojdwJckY8cGPMonQIAXpwr4OzkHmqpAZMmWk0ci0YVmflvpvnFHMAegQfOFp0Z', 'Historical Activity', 19.38000000, '2025-04-15 00:41:55', '2025-04-15 00:41:55'),
(24, 5, 'credit', 2.87000000, 'confirmed', 'mFp2lrxMT4SWH1VfOkSFQRiGybfEDJd4ZW9RFBx4QuZ2BC7ClvuXl3sgudI5ESk9', 'Historical Activity', 19.07000000, '2025-04-15 00:41:55', '2025-04-15 00:41:55'),
(25, 1, 'credit', 3.47000000, 'confirmed', 'B117P1U9e64gOLQPdPLFprkwXcUVIZiF0TNmkl57Slg0yfJT43V8MDFqj0IbJUKL', 'Historical Activity', 45.92900000, '2025-07-15 00:41:55', '2025-07-15 00:41:55'),
(26, 2, 'credit', 3.49000000, 'confirmed', '6Dy3ECRlK7IHE6zHKFnVkXN8EIAvCl1zE921Imav4dFpuFwhlhv439qxHbnplXnq', 'Historical Activity', 70.88000000, '2025-07-15 00:41:55', '2025-07-15 00:41:55'),
(27, 3, 'credit', 0.23000000, 'confirmed', '7HsAVGVgqTCQW98fBZJeCbQr5DXvLFbzOsfgnSt8D3ufG7Sr9LsAMgbYYes9Dm4s', 'Historical Activity', 19.61000000, '2025-07-15 00:41:55', '2025-07-15 00:41:55'),
(28, 5, 'credit', 4.24000000, 'confirmed', '9ITNuV80bqwZT6TuW3siz8G0xgiextS67Uyy7XMT3aGxqbga8k6NSZKFrNdFPy49', 'Historical Activity', 23.31000000, '2025-07-15 00:41:55', '2025-07-15 00:41:55'),
(29, 1, 'credit', 2.03000000, 'confirmed', '9xzkdpPHMa0EPDyltunEa3cxRM6ckGQYbmxrtdJlAYa2l5LZZgfh47XfzzRXOSdO', 'Historical Activity', 47.95900000, '2025-10-15 00:41:55', '2025-10-15 00:41:55'),
(30, 2, 'credit', 3.76000000, 'confirmed', '5PxksNK5cxfKEOEqutarpADEGwhzcP0oiqoYCJufiv2GkUxmApdSeZWef1UOVlkp', 'Historical Activity', 74.64000000, '2025-10-15 00:41:55', '2025-10-15 00:41:55'),
(31, 3, 'credit', 4.28000000, 'confirmed', 'FNBCs5DwWZpFc6uF1ySgs8AYtKmAga7nZsJXEoxdPEf9KWsmDqadU7A7pD690PnH', 'Historical Activity', 23.89000000, '2025-10-15 00:41:55', '2025-10-15 00:41:55'),
(32, 5, 'credit', 0.99000000, 'confirmed', 'bErkhBNQQ9RQNLy9Nm5GBjyc7wPZ5GHo6W3wnbo7kGDaO0EC3EOZAaR9BOnrOVBT', 'Historical Activity', 24.30000000, '2025-10-15 00:41:55', '2025-10-15 00:41:55'),
(33, 1, 'credit', 4.09000000, 'confirmed', 'nKZH9t8xwDaHgFDlLGsGQEKfoUQzOqZuPePtfRccbH2tqnoexu7KqSkpha4xNCDj', 'Historical Activity', 52.04900000, '2025-12-15 00:41:55', '2025-12-15 00:41:55'),
(34, 2, 'credit', 2.64000000, 'confirmed', 'PyddG4jGdsMxUoI1uAgeQPMLh1GLIiFGgcjKKspu9aWUP50Di1Zyih7n2Gkz1wft', 'Historical Activity', 77.28000000, '2025-12-15 00:41:55', '2025-12-15 00:41:55'),
(35, 3, 'credit', 2.86000000, 'confirmed', 'iSKtpZ0hoHW9eFlCYd5kYwzSqdWy5r3nYheoD7EdE1EPJMAxqnIYojhrp7MwFeOl', 'Historical Activity', 26.75000000, '2025-12-15 00:41:55', '2025-12-15 00:41:55'),
(36, 5, 'credit', 1.92000000, 'confirmed', 'TkZRSWCOAU7gxkyULnlzRqPGo1QwDbvlNng6BE6yzga1Bk1JeHor2pwU9up2lYkx', 'Historical Activity', 26.22000000, '2025-12-15 00:41:55', '2025-12-15 00:41:55'),
(37, 1, 'credit', 2.57000000, 'confirmed', 'Xwsokxpg7M9J2iHf1Gp0Drj2vZJ19Um0qOWfA6ruLTk5EceGJXNam6mEORRvaWSn', 'Historical Activity', 54.61900000, '2026-01-01 00:41:55', '2026-01-01 00:41:55'),
(38, 2, 'credit', 3.84000000, 'confirmed', 'Pbk0FpJF9OyGmuRA5fNvvy1PGOqo74dEh7bPacZlKnOO3Pl9U2VpyEB2idyXTO7e', 'Historical Activity', 81.12000000, '2026-01-01 00:41:55', '2026-01-01 00:41:55'),
(39, 3, 'credit', 2.02000000, 'confirmed', 'HtqXBmlV5ux1ZBpJLmFynW2gS9YVRpLwLU9m2YGtOeuystQAjssmSprJuti6d10S', 'Historical Activity', 28.77000000, '2026-01-01 00:41:55', '2026-01-01 00:41:55'),
(40, 5, 'credit', 3.33000000, 'confirmed', 'TlNmhZVtP5JK2Czn7yQgDzrkFI2boEIrHqgy0jkVDH4wSNz25JWqsaBIxH3amwwc', 'Historical Activity', 29.55000000, '2026-01-01 00:41:55', '2026-01-01 00:41:55'),
(41, 1, 'credit', 1.59000000, 'confirmed', 'JNEGw7iPa7FPTkENNkLzkjCXSlQSrZnIRlDCoaWvtPFOBMgJtItcg9dgP8drdLtV', 'Historical Activity', 56.20900000, '2026-01-08 00:41:55', '2026-01-08 00:41:55'),
(42, 2, 'credit', 2.65000000, 'confirmed', 'oyVPweE44se52dJR8j3zRa1wz0vzmooDSt8jfsTmjBU96ADUjQt3q6bnadbeaU1V', 'Historical Activity', 83.77000000, '2026-01-08 00:41:55', '2026-01-08 00:41:55'),
(43, 3, 'credit', 2.80000000, 'confirmed', 'vKdRlnYV4cWjX27FKpEBiYldKimABtjwborzyFbvqQR10gK9xwKV21du3n9YAfWq', 'Historical Activity', 31.57000000, '2026-01-08 00:41:55', '2026-01-08 00:41:55'),
(44, 5, 'credit', 3.64000000, 'confirmed', 'MMjTKC7rbv7acYnkgnCB9rpqejQcOfO0qeL8e2ZeZgXMhCIkIQGm0C7ilt4nM0pB', 'Historical Activity', 33.19000000, '2026-01-08 00:41:55', '2026-01-08 00:41:55'),
(45, 1, 'credit', 0.76000000, 'confirmed', 'lPmKrvw6Xs2ein8nVH7QvlG3UXQ6gib2pJJ03WqO0I5QYOR9L3pQNar5huPqREKP', 'Historical Activity', 56.96900000, '2026-01-12 00:41:55', '2026-01-12 00:41:55'),
(46, 2, 'credit', 1.60000000, 'confirmed', 'vUEF7Egr8rRluBKSe801J8WYR9rk4cJAComTVmHT2Pia34Z3GNzrJbKTjGJWTlOH', 'Historical Activity', 85.37000000, '2026-01-12 00:41:55', '2026-01-12 00:41:55'),
(47, 3, 'credit', 3.85000000, 'confirmed', 'xpLP0eTIXpeZlvbPuMEcOgHGRLxg7eSpf2yf5Ym8OytJSR11pHjVSAxl4h9OR8to', 'Historical Activity', 35.42000000, '2026-01-12 00:41:55', '2026-01-12 00:41:55'),
(48, 5, 'credit', 3.58000000, 'confirmed', 'npDgOrYDPdutVOk72bZZQ9QSrAI5fdNrCAvXGhdm3w1PWCM1CZZLDTJiykfTnTxY', 'Historical Activity', 36.77000000, '2026-01-12 00:41:55', '2026-01-12 00:41:55'),
(49, 1, 'credit', 1.76000000, 'confirmed', 'Ycrbxh0C5yEZZ1fNnbiXDe7wTr8YKjE7PVlHzT9kxFeARHQHue13Fsd3xZMQdjfe', 'Historical Activity', 58.72900000, '2026-01-14 00:41:55', '2026-01-14 00:41:55'),
(50, 2, 'credit', 2.70000000, 'confirmed', 'Xx3YGxWv0CMd4Zv8wQr5TwFiOFygsw04V8bCTTtOtWDEOjRiX9NoUiIu5YntXzIM', 'Historical Activity', 88.07000000, '2026-01-14 00:41:55', '2026-01-14 00:41:55'),
(51, 3, 'credit', 4.72000000, 'confirmed', 'lmSgRE0CsERyLy88s2dTsYWGhhTpaPHpBth9JN7XJJLcIsRNEGhL9hpRin1PNV94', 'Historical Activity', 40.14000000, '2026-01-14 00:41:55', '2026-01-14 00:41:55'),
(52, 5, 'credit', 3.48000000, 'confirmed', 'aYUgWMSyvDtrguAYV1XabYfq37f8trpOqJQNMRXNz2crNp2vofVInXJk7rOCPD62', 'Historical Activity', 40.25000000, '2026-01-14 00:41:55', '2026-01-14 00:41:55'),
(53, 1, 'credit', 1.79000000, 'confirmed', '78BznaTpAtmXZHGHybvtIOxBwXYlRg4kTSi3T7wh78yKztTrDcxneqWKIZE4OxEg', 'Historical Activity', 60.51900000, '2026-01-14 12:41:55', '2026-01-14 12:41:55'),
(54, 2, 'credit', 4.69000000, 'confirmed', 'A0HDYXopcL1kjf7IH1d3618sqsd9vjCtyl5hmk5DYjgMquMcEIrrQSPl0LZl2Y2h', 'Historical Activity', 92.76000000, '2026-01-14 12:41:55', '2026-01-14 12:41:55'),
(55, 3, 'credit', 4.50000000, 'confirmed', 'MSePnIfNfKT5Bh7AhnUQmZCu3viKbi9vhtOiG4wsjEfWeJuugfa8ROIrYhJqr1Ei', 'Historical Activity', 44.64000000, '2026-01-14 12:41:55', '2026-01-14 12:41:55'),
(56, 5, 'credit', 2.02000000, 'confirmed', '9rdUACRxx4sqDpeJpCktGZJvZWXP6Gq2wvDftcEd49vRLyOyWMscowoaDp98UoFa', 'Historical Activity', 42.27000000, '2026-01-14 12:41:55', '2026-01-14 12:41:55'),
(57, 1, 'credit', 1.88000000, 'confirmed', 'hWAWy3t9okGPopqoehMiSRa7BiiY8ZJV9KD9vQzm0g9PGYapkdgYy0K9f3Z5taPj', 'Historical Activity', 62.39900000, '2026-01-14 18:41:55', '2026-01-14 18:41:55'),
(58, 2, 'credit', 2.41000000, 'confirmed', '0c80Mj6zPYlEv3jF0svJATdSt7STTQ2ZjLxtakQZuhl7blEgM7I1kN0DpMo4b8pm', 'Historical Activity', 95.17000000, '2026-01-14 18:41:55', '2026-01-14 18:41:55'),
(59, 3, 'credit', 2.82000000, 'confirmed', 'O9p4S1QGtjYpVy3WVtOeQJjWf5GlWEzOF2T2eNY1zv415kjYTfsTxwPQJJVzm50F', 'Historical Activity', 47.46000000, '2026-01-14 18:41:55', '2026-01-14 18:41:55'),
(60, 5, 'credit', 3.46000000, 'confirmed', 'CP146bB33ACPpNrM602aXC4R0l3JC0aOqZGz1yu8wSsfYQPRDVvOIbH4teiJ4yp8', 'Historical Activity', 45.73000000, '2026-01-14 18:41:55', '2026-01-14 18:41:55'),
(61, 7, 'credit', 2.79000000, 'confirmed', '9Jaslha94wLFxWn5bJmlDnGgkFpGC3drs1ffU0Y46n0kRUH1m2l8IaWMCts87xSL', 'Historical Activity', 29.63000000, '2025-01-15 00:41:56', '2025-01-15 00:41:56'),
(62, 8, 'credit', 3.87000000, 'confirmed', 'qrZuDPil8n6dqmF2MZPNrEt08mfFetjSdp5KqGs4tX1Eq5rfUxdHZKfiy79F06K8', 'Historical Activity', 62.00000000, '2025-01-15 00:41:56', '2025-01-15 00:41:56'),
(63, 9, 'credit', 2.86000000, 'confirmed', '3iPvVeVOiYBALS7cGQm3Sfe2yqzBxp5BxaykjWTNbjFw2jo6jZNGby5FS6rvltvN', 'Historical Activity', 59.24000000, '2025-01-15 00:41:56', '2025-01-15 00:41:56'),
(64, 11, 'credit', 2.19000000, 'confirmed', 'idgnOX84aL1HqFCS7U4Vx8LfjjDAnx0pzDuLlhdTUuYR3Sm5wyV0Vl94uWN49Qqu', 'Historical Activity', 52.66000000, '2025-01-15 00:41:56', '2025-01-15 00:41:56'),
(65, 7, 'credit', 3.31000000, 'confirmed', 'gvaQf5XBuG73sLTaqShZBS45A7je0Brn712ie0GOnWtB13VMmlmhkfFa1v4Oo8Ry', 'Historical Activity', 32.94000000, '2025-04-15 00:41:56', '2025-04-15 00:41:56'),
(66, 8, 'credit', 4.89000000, 'confirmed', 'mjEUVZdyAU7PxDV9NXN8KaRMtYNr10B9VjUnMypMPKx8Z05xywDQWWF2Ci5NIwgz', 'Historical Activity', 66.89000000, '2025-04-15 00:41:56', '2025-04-15 00:41:56'),
(67, 9, 'credit', 4.31000000, 'confirmed', 'YnBs5HiSJpTRPGhn9gChu01flS6RYQmpfMu6cOYR1zVK9N1cRWRGKSJNQatxLtZW', 'Historical Activity', 63.55000000, '2025-04-15 00:41:56', '2025-04-15 00:41:56'),
(68, 11, 'credit', 1.44000000, 'confirmed', 'fhqVpGmfqHduWVfM3tgqGnANzYwVbqQbdBjlXmGzPnZLhp96ZjXqPEBYWZHHyjHx', 'Historical Activity', 54.10000000, '2025-04-15 00:41:56', '2025-04-15 00:41:56'),
(69, 7, 'credit', 1.98000000, 'confirmed', 'sf0geHcmOWJf3ZraTtt0lJXo7pj9S7C6JVoFnhJqXRowmUQe3D3QQ13NAKCyrrK7', 'Historical Activity', 34.92000000, '2025-07-15 00:41:56', '2025-07-15 00:41:56'),
(70, 8, 'credit', 3.85000000, 'confirmed', 'zixg0PkU02cXCKRoDEc0eshkEvn2iemlFr8LVeWO1V6GV0DbtnnKpH1uY2070Y8u', 'Historical Activity', 70.74000000, '2025-07-15 00:41:56', '2025-07-15 00:41:56'),
(71, 9, 'credit', 4.47000000, 'confirmed', 'o62GOKZAYHYXk9swpGKLEyjqszXpT3hNVy6RPRBdcnbt5gPTr55gyrNiRFrSv7oN', 'Historical Activity', 68.02000000, '2025-07-15 00:41:56', '2025-07-15 00:41:56'),
(72, 11, 'credit', 3.86000000, 'confirmed', 'dLH1L5EuEaSC9cLNBrrMnyk2d8XpXIiUmqBagWkTvWBWoIvUkSzvPBwvjnFBdV86', 'Historical Activity', 57.96000000, '2025-07-15 00:41:56', '2025-07-15 00:41:56'),
(73, 7, 'credit', 1.75000000, 'confirmed', 'JREvEZKu66sr8ZUof8bSyodBdCHwywdIteQirdUAsoTKYukAQrYlAugH0q94R5Wa', 'Historical Activity', 36.67000000, '2025-10-15 00:41:56', '2025-10-15 00:41:56'),
(74, 8, 'credit', 4.84000000, 'confirmed', 'Wg0xidB8NVtYAjQKH2dotRKCPssEsDI6TV2S8rEgBEvI15cvSBhFwVibhjfYPEOp', 'Historical Activity', 75.58000000, '2025-10-15 00:41:56', '2025-10-15 00:41:56'),
(75, 9, 'credit', 0.57000000, 'confirmed', 'gUaSinacw0XocDoQEwhxYzq8plnObYUsWNfO8cKhfoVdBUFgv0kBbU5yZPvC3yrN', 'Historical Activity', 68.59000000, '2025-10-15 00:41:56', '2025-10-15 00:41:56'),
(76, 11, 'credit', 4.60000000, 'confirmed', 'LWUMx2219ASjfve8gDkS9SbZkcVewIbvCrt5ZZnBJ089L1w9HfCcHwIcLxqQRMep', 'Historical Activity', 62.56000000, '2025-10-15 00:41:56', '2025-10-15 00:41:56'),
(77, 7, 'credit', 0.67000000, 'confirmed', 'EbY9F0hAv5gdtjqY9kILFdxXro6nrGekMOroOd3WYuCM4fBQmYHO7aZPyPiw6ZzW', 'Historical Activity', 37.34000000, '2025-12-15 00:41:56', '2025-12-15 00:41:56'),
(78, 8, 'credit', 4.14000000, 'confirmed', 'BKsendwzQ2e3fEVajxO95bYWISYoLGXeJm4JUVUxSFH6nhFdgy6RJGSmXVdlcSLN', 'Historical Activity', 79.72000000, '2025-12-15 00:41:56', '2025-12-15 00:41:56'),
(79, 9, 'credit', 1.40000000, 'confirmed', 'N24sf7c9WCewJusVKswLyLLHUtYA38lbWkuXMdP1rexbAossfKUkg95cOmySav7M', 'Historical Activity', 69.99000000, '2025-12-15 00:41:56', '2025-12-15 00:41:56'),
(80, 11, 'credit', 2.76000000, 'confirmed', '842iXvBVKCynBDNCD54pLhkacxnGq1lOnbMwK9i0J7ZDrFGCCJ0ruemd7XXvVHrg', 'Historical Activity', 65.32000000, '2025-12-15 00:41:56', '2025-12-15 00:41:56'),
(81, 7, 'credit', 0.89000000, 'confirmed', 'tfKFejDAPyx15RYu1Ougc2CBioYWDKuHkaFCuWbdYNoxwdf4usYZx67FzpA6xRJw', 'Historical Activity', 38.23000000, '2026-01-01 00:41:56', '2026-01-01 00:41:56'),
(82, 8, 'credit', 1.60000000, 'confirmed', 'b0M2tYNprc3ij4CMnTow8yX0t0lEr4XZGWChrCotv5VDb1a5bVfZZZdRbIt7bqrD', 'Historical Activity', 81.32000000, '2026-01-01 00:41:56', '2026-01-01 00:41:56'),
(83, 9, 'credit', 2.39000000, 'confirmed', 'Rh4YtrLYhABpBB7RWX3hv5cRC7zEjhccylTNdgSUYHRWymz3NJOau9ik3gnbX7GN', 'Historical Activity', 72.38000000, '2026-01-01 00:41:56', '2026-01-01 00:41:56'),
(84, 11, 'credit', 2.13000000, 'confirmed', 'ekx5JayFnIrcU8COpbdznNq7pMi0S4nhRTdpgYkdCsjVStjYeBZgWIix5sveJmap', 'Historical Activity', 67.45000000, '2026-01-01 00:41:56', '2026-01-01 00:41:56'),
(85, 7, 'credit', 4.41000000, 'confirmed', 'tiyKkOucUkEojcmGlxkmjwf2maR4kfxsRVmVymXhC9tRs5ONWjPdqAe6DWvajfpv', 'Historical Activity', 42.64000000, '2026-01-08 00:41:56', '2026-01-08 00:41:56'),
(86, 8, 'credit', 0.33000000, 'confirmed', 'hPYBawul3D7SGNxoS4Z9GSGCVfLvzNTU0UhkVvgItmQmhV4mxp7AGyVy7LGUlF1z', 'Historical Activity', 81.65000000, '2026-01-08 00:41:56', '2026-01-08 00:41:56'),
(87, 9, 'credit', 0.76000000, 'confirmed', 'QneXzXtchsTqqcIowHBw7BmWrk2dlTHeX6bhX4kBRlciyzNr5b4blNvOWHWKUtSN', 'Historical Activity', 73.14000000, '2026-01-08 00:41:56', '2026-01-08 00:41:56'),
(88, 11, 'credit', 4.71000000, 'confirmed', '6emWJkZoY2NTrJXrEDZYYmtS2LMBa2Ig6MdsJdPMiG0YiaBaQV2DDLFytT0Gwv2Z', 'Historical Activity', 72.16000000, '2026-01-08 00:41:56', '2026-01-08 00:41:56'),
(89, 7, 'credit', 3.10000000, 'confirmed', 'Cbwyt8B190sRi8UuPZNLZgqXoRwXkY42RNoTYvQ2oPtBrJ9f97vPOVkY0uOw7hEf', 'Historical Activity', 45.74000000, '2026-01-12 00:41:56', '2026-01-12 00:41:56'),
(90, 8, 'credit', 4.80000000, 'confirmed', 'BNYO9XhzoJJdfazfzTn08nF30zvnN9vKftPiCfoVtQH1kCb1l6KYjvm2GR56zJPb', 'Historical Activity', 86.45000000, '2026-01-12 00:41:56', '2026-01-12 00:41:56'),
(91, 9, 'credit', 4.74000000, 'confirmed', 'oEUm7cgHshAJoU7nYKMZl74cEy6lvpQ3Rhee9JcgJvvg5LuRSMKvmZGj0Y8iuatx', 'Historical Activity', 77.88000000, '2026-01-12 00:41:56', '2026-01-12 00:41:56'),
(92, 11, 'credit', 2.75000000, 'confirmed', 'eyQzNf8WQCHaFyHWtUIOQZ1clZcJjdBUtoErg5U6IhMswaGz6JNQOnQgTEawWG6X', 'Historical Activity', 74.91000000, '2026-01-12 00:41:56', '2026-01-12 00:41:56'),
(93, 7, 'credit', 4.96000000, 'confirmed', 'hJtAh5QdHxi6TSWS3dFLbdb318kceQMGaH6jwbPR59aWXzeYUXuxlcFlrIXgXTyf', 'Historical Activity', 50.70000000, '2026-01-14 00:41:56', '2026-01-14 00:41:56'),
(94, 8, 'credit', 0.19000000, 'confirmed', 'tL3wrh6jsy6LdgTDveBtgtmxFo2sR0aq3ABiqMR6qNVQqN6VtfPfdzKupiQXH1De', 'Historical Activity', 86.64000000, '2026-01-14 00:41:56', '2026-01-14 00:41:56'),
(95, 9, 'credit', 3.99000000, 'confirmed', 'abTzTVuimPHSQ6I3XyeDaiQZcSUEwVHHTRZJp9bltly4Ejdv0BweDWyyxOqsgKfH', 'Historical Activity', 81.87000000, '2026-01-14 00:41:56', '2026-01-14 00:41:56'),
(96, 11, 'credit', 0.79000000, 'confirmed', 'iFBq7lyXfHwfLANZBzquWEKiO7aUXrv2cwhWY5xqnqTy1cCMoRZDtKr30cc8t6MP', 'Historical Activity', 75.70000000, '2026-01-14 00:41:56', '2026-01-14 00:41:56'),
(97, 7, 'credit', 3.93000000, 'confirmed', '60KkbKxeZLRHVY2wzVBUSqABgSs7TBgxbeIVUMiE9s1Mu9ajGkqHoWulIbv13y6S', 'Historical Activity', 54.63000000, '2026-01-14 12:41:56', '2026-01-14 12:41:56'),
(98, 8, 'credit', 1.91000000, 'confirmed', 'N7xgRJyQUUSxWXMC5Yp906fogTWyvPh1YnLZR1j5DH3SrH4UgtBVeB9B6xSMaAQ3', 'Historical Activity', 88.55000000, '2026-01-14 12:41:56', '2026-01-14 12:41:56'),
(99, 9, 'credit', 3.94000000, 'confirmed', 'e1gcTqSRthgVKIDNakbPA196gpASxRm91kSuKPqf9rhjJeKDGEwMpPFBcsB42G8P', 'Historical Activity', 85.81000000, '2026-01-14 12:41:56', '2026-01-14 12:41:56'),
(100, 11, 'credit', 1.67000000, 'confirmed', 'PnZ77H24BqUUcu2xdHijMKizlYrEy0XGBUIfJPmvWLrJULWIOFsM10Hu0FvklOpX', 'Historical Activity', 77.37000000, '2026-01-14 12:41:56', '2026-01-14 12:41:56'),
(101, 7, 'credit', 4.79000000, 'confirmed', 'W16w0QxtbOHB1YD7gyOhHsaeYdOQyPyz2H189x2YzINzvcr2TcInx3OFGzlf4kG0', 'Historical Activity', 59.42000000, '2026-01-14 18:41:56', '2026-01-14 18:41:56'),
(102, 8, 'credit', 4.59000000, 'confirmed', 'YmmX5WlKgzk82lgzYeaZ6NwjF3uiEJs3hejVwvQH93bfVqiLogtL18U4C36Tu3TW', 'Historical Activity', 93.14000000, '2026-01-14 18:41:56', '2026-01-14 18:41:56'),
(103, 9, 'credit', 0.97000000, 'confirmed', 'XWKs1crsjnoZNivV4VZeOThIRX2Pmi1WoLXQezcqmMzQHUkKOax0oIrRwFi9Qi9j', 'Historical Activity', 86.78000000, '2026-01-14 18:41:56', '2026-01-14 18:41:56'),
(104, 11, 'credit', 1.04000000, 'confirmed', 'WUr1oTaUG1VjOPlY2QSvacQswvTHjp1DUp9GxPaRCkD1COXGftFAq3cCGMhUDPZp', 'Historical Activity', 78.41000000, '2026-01-14 18:41:56', '2026-01-14 18:41:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$12$Pq2.aqWzO54Tp3Uf1mNT9O/HgqxgAJaeWMmOG09i3vqaqxP3TWKJ6', NULL, '2026-01-15 00:41:55', '2026-01-15 00:41:55', 'admin'),
(2, 'Demo User', 'demo@example.com', NULL, '$2y$12$IHv9dQ3O5HP9ouy2bmWJVebEn68lMzySczkH5rOLs7.r0yFNhest6', NULL, '2026-01-15 00:41:55', '2026-01-15 00:41:55', 'user'),
(3, 'Ducimus sequi qui a', 'xuxynyg@mailinator.com', NULL, '$2y$12$9GKys1OdTJWTsjpuqfd/F.6CxiE87ZwWo5WPTA1j4t5BgXdZGPio6', NULL, '2026-01-15 00:42:37', '2026-01-15 00:42:37', 'student'),
(4, 'test', 'test@gmail.com', NULL, '$2y$12$fpn5li4EEmmnWOyUdPc7xuOXkXQv4lJcj9qv5EpaSfhp0ucu5wjNi', NULL, '2026-01-15 00:44:25', '2026-01-15 00:44:25', 'student'),
(5, 'Test User', 'test@example.com', NULL, '$2y$12$u1F9nZi.v1Q9Ira.jzNCGO1J4UNLvihgNozp8VoyQ1LZd6OIEjjxG', NULL, '2026-01-15 00:45:31', '2026-01-15 00:45:31', 'student'),
(6, 'Test Registration', 'testreg@example.com', NULL, '$2y$12$.LGM0eUzuZP1zJy6k27CYulFtE5NC.GkJ/RBLbFmnjmZfa.lqXsjm', NULL, '2026-01-15 00:48:14', '2026-01-15 00:48:14', 'student'),
(7, 'Final Test User', 'finaltest@example.com', NULL, '$2y$12$Fc1/3ist/V7N6Zdvyl..t.htr6p3owl6DvHHNWO6K7PYc5M9uToZ2', NULL, '2026-01-15 00:49:10', '2026-01-15 00:50:54', 'student'),
(8, 'test', 'zohiabyasin@gmail.com', NULL, '$2y$12$8ENt7THrWYyO2mIXXGcWr.5GR9.zNUjFht/Cj3fEGKgVZ5Zn7C0G2', NULL, '2026-01-15 00:51:37', '2026-01-15 00:51:37', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `wallet_type` varchar(255) NOT NULL,
  `wallet_address` varchar(255) NOT NULL,
  `balance` decimal(20,8) NOT NULL DEFAULT 0.00000000,
  `simulation_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`simulation_meta`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `user_id`, `name`, `wallet_type`, `wallet_address`, `balance`, `simulation_meta`, `created_at`, `updated_at`) VALUES
(1, 1, 'BTC Wallet', 'BTC', '1foj9wkn5o3wGIbfICkLF1KOMxhp4GeYTCx', 62.39900000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(2, 1, 'ETH Wallet', 'ETH', '0xTaA48hZKBhIqYFGvrq02tIplX8IDG6Irwa', 95.17000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(3, 1, 'USDT Wallet', 'USDT', 'T6oBnCinEDzSH3QIO7DRbFK0HVzbZ1lUb0h', 47.46000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(4, 1, 'BNB Wallet', 'BNB', 'bnbLH0glCqoWVO9xO2Hk2dgJka2vfvcOiwIl1', 33.26000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(5, 1, 'SOL Wallet', 'SOL', 'Sol1g7zEqVD3qo37cq50REOWLk6ZTiNKZuWsB', 45.73000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(6, 1, 'ADA Wallet', 'ADA', 'addrme8uzyXE8OEgBtPGxerTWQQJPWRgSBAOsp', 4.34000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(7, 2, 'BTC Wallet', 'BTC', '1cigUfBIP2YYmD3AqKiZGc8WO3WSoUwxXH0', 59.42000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(8, 2, 'ETH Wallet', 'ETH', '0xCBq7AdgwDGDvHMwGa5oSY77MZqH6oyKmik', 93.14000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(9, 2, 'USDT Wallet', 'USDT', 'TcbURifknRnTVoxWZOmP8OMBw3RR0ONapgX', 86.78000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(10, 2, 'BNB Wallet', 'BNB', 'bnbj38J7lEfA9KRGPN6GhGWVQEIY2gXwJ2DSw', 59.19000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(11, 2, 'SOL Wallet', 'SOL', 'Sols2NYlzLf6KGcKyRS2KKtKyWWsIdRNoai0H', 78.41000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:56'),
(12, 2, 'ADA Wallet', 'ADA', 'addr2NSorMlT3zHtxLWpp6SXoXNs3TvfcYUst2', 46.03000000, '\"{\\\"is_simulated\\\":true}\"', '2026-01-15 00:41:55', '2026-01-15 00:41:55'),
(13, 6, NULL, 'BTC', '768a75d1-ef6f-478f-840a-3315fa674558', 0.00000000, NULL, '2026-01-15 00:48:14', '2026-01-15 00:48:14'),
(14, 6, NULL, 'ETH', 'fb93a969-614a-4778-b9f8-b880114fd0a6', 0.00000000, NULL, '2026-01-15 00:48:14', '2026-01-15 00:48:14'),
(15, 6, NULL, 'USDT', 'fd04bcad-9317-477a-8b72-bf6340e117be', 0.00000000, NULL, '2026-01-15 00:48:14', '2026-01-15 00:48:14'),
(16, 6, NULL, 'BNB', '40c1481b-9efd-4b02-be25-c4bd0b9c78df', 0.00000000, NULL, '2026-01-15 00:48:14', '2026-01-15 00:48:14'),
(17, 6, NULL, 'SOL', '7c3d836c-b7fd-474c-b2cd-d76da877c38c', 0.00000000, NULL, '2026-01-15 00:48:14', '2026-01-15 00:48:14'),
(18, 6, NULL, 'ADA', '3dea9478-c67b-4b4f-8ef5-07fc66d297fa', 0.00000000, NULL, '2026-01-15 00:48:14', '2026-01-15 00:48:14'),
(19, 7, NULL, 'BTC', 'ec02245d-c744-427c-b0d3-0db361eb37fe', 0.00000000, NULL, '2026-01-15 00:49:10', '2026-01-15 00:49:10'),
(20, 7, NULL, 'ETH', '079f91ed-6c29-4b8e-a711-05dd8c51cf41', 0.00000000, NULL, '2026-01-15 00:49:10', '2026-01-15 00:49:10'),
(21, 7, NULL, 'USDT', 'ae811beb-caba-4ba3-a3af-d7ccf1e55977', 0.00000000, NULL, '2026-01-15 00:49:10', '2026-01-15 00:49:10'),
(22, 7, NULL, 'BNB', '54e9f573-9cdf-4f72-8a1b-50ccfb77c76e', 0.00000000, NULL, '2026-01-15 00:49:10', '2026-01-15 00:49:10'),
(23, 7, NULL, 'SOL', '26d17cdb-c503-4f36-9c55-6c30426c1265', 0.00000000, NULL, '2026-01-15 00:49:10', '2026-01-15 00:49:10'),
(24, 7, NULL, 'ADA', '7572a67e-0859-4174-b7ac-adbf5461ac85', 0.00000000, NULL, '2026-01-15 00:49:10', '2026-01-15 00:49:10'),
(25, 8, NULL, 'BTC', '5ae44f69-e3ce-4950-b501-cd76395d7f07', 0.00000000, NULL, '2026-01-15 00:51:37', '2026-01-15 00:51:37'),
(26, 8, NULL, 'ETH', '1dfe98e4-3606-4a60-8d88-01fb776dd40c', 0.00000000, NULL, '2026-01-15 00:51:37', '2026-01-15 00:51:37'),
(27, 8, NULL, 'USDT', 'f42f5b1b-e03b-4cb6-81af-9e969e9d4f5c', 0.00000000, NULL, '2026-01-15 00:51:37', '2026-01-15 00:51:37'),
(28, 8, NULL, 'BNB', 'd20b3ee6-b954-4286-904c-a9e0fa710f3e', 0.00000000, NULL, '2026-01-15 00:51:37', '2026-01-15 00:51:37'),
(29, 8, NULL, 'SOL', 'cb5513ab-1674-4832-9c3d-1bf3684a3e70', 0.00000000, NULL, '2026-01-15 00:51:37', '2026-01-15 00:51:37'),
(30, 8, NULL, 'ADA', 'e343b533-2ae8-46a7-989c-1d8af057cc25', 0.00000000, NULL, '2026-01-15 00:51:37', '2026-01-15 00:51:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_device_codes`
--
ALTER TABLE `oauth_device_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `oauth_device_codes_user_code_unique` (`user_code`),
  ADD KEY `oauth_device_codes_user_id_index` (`user_id`),
  ADD KEY `oauth_device_codes_client_id_index` (`client_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_wallet_id_foreign` (`wallet_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wallets_wallet_address_unique` (`wallet_address`),
  ADD KEY `wallets_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
