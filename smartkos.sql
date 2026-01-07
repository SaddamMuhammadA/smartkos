/*
SQLyog Community v13.3.1 (64 bit)
MySQL - 8.4.3 : Database - smartkos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`smartkos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `smartkos`;

/*Table structure for table `admin_invites` */

DROP TABLE IF EXISTS `admin_invites`;

CREATE TABLE `admin_invites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('SuperAdmin','Admin') COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `accepted_at` datetime DEFAULT NULL,
  `invited_by` bigint unsigned NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `email` (`email`),
  KEY `invited_by` (`invited_by`),
  CONSTRAINT `admin_invites_ibfk_1` FOREIGN KEY (`invited_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `admin_invites` */

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id_customer` int NOT NULL AUTO_INCREMENT,
  `nama_customer` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `no_telp` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `foto_ktp` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `customer` */

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `connection` text COLLATE utf8mb4_general_ci NOT NULL,
  `queue` text COLLATE utf8mb4_general_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `jadwal_kamar` */

DROP TABLE IF EXISTS `jadwal_kamar`;

CREATE TABLE `jadwal_kamar` (
  `id_jadwal` int NOT NULL AUTO_INCREMENT,
  `id_kamar` int NOT NULL,
  `id_customer` int NOT NULL,
  `id_pricing` int DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `total_harga` decimal(12,2) DEFAULT '0.00',
  `deposit` decimal(12,2) DEFAULT '0.00',
  `status_sewa` enum('Aktif','Selesai','Dibatalkan') COLLATE utf8mb4_general_ci DEFAULT 'Aktif',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_jadwal`),
  KEY `id_kamar` (`id_kamar`),
  KEY `id_customer` (`id_customer`),
  KEY `id_pricing` (`id_pricing`),
  CONSTRAINT `jadwal_kamar_ibfk_1` FOREIGN KEY (`id_kamar`) REFERENCES `kamar` (`id_kamar`),
  CONSTRAINT `jadwal_kamar_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE,
  CONSTRAINT `jadwal_kamar_ibfk_3` FOREIGN KEY (`id_pricing`) REFERENCES `pricing` (`id_pricing`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jadwal_kamar` */

/*Table structure for table `jadwal_kamar_kendaraan` */

DROP TABLE IF EXISTS `jadwal_kamar_kendaraan`;

CREATE TABLE `jadwal_kamar_kendaraan` (
  `id_relasi` int NOT NULL AUTO_INCREMENT,
  `id_jadwal` int NOT NULL,
  `id_kendaraan` int NOT NULL,
  `jumlah` int DEFAULT '1',
  `biaya_tambahan` decimal(12,2) DEFAULT '0.00',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_relasi`),
  KEY `id_jadwal` (`id_jadwal`),
  KEY `id_kendaraan` (`id_kendaraan`),
  CONSTRAINT `jadwal_kamar_kendaraan_ibfk_1` FOREIGN KEY (`id_jadwal`) REFERENCES `jadwal_kamar` (`id_jadwal`) ON DELETE CASCADE,
  CONSTRAINT `jadwal_kamar_kendaraan_ibfk_2` FOREIGN KEY (`id_kendaraan`) REFERENCES `parkiran` (`id_kendaraan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jadwal_kamar_kendaraan` */

/*Table structure for table `jenis_kamar` */

DROP TABLE IF EXISTS `jenis_kamar`;

CREATE TABLE `jenis_kamar` (
  `id_jenis_kamar` int NOT NULL AUTO_INCREMENT,
  `id_kos` int DEFAULT NULL,
  `nama_jenis_kamar` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_jenis_kamar`),
  KEY `id_kos` (`id_kos`),
  CONSTRAINT `id_kos` FOREIGN KEY (`id_kos`) REFERENCES `master_kos` (`id_kos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jenis_kamar` */

/*Table structure for table `kamar` */

DROP TABLE IF EXISTS `kamar`;

CREATE TABLE `kamar` (
  `id_kamar` int NOT NULL AUTO_INCREMENT,
  `id_kos` int DEFAULT NULL,
  `id_jenis_kamar` int DEFAULT NULL,
  `kode_kamar` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_kamar` enum('Tersedia','Terisi','Perawatan') COLLATE utf8mb4_general_ci DEFAULT 'Tersedia',
  `catatan` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_kamar`),
  KEY `id_kos` (`id_kos`),
  KEY `id_jenis_kamar` (`id_jenis_kamar`),
  CONSTRAINT `kamar_ibfk_1` FOREIGN KEY (`id_kos`) REFERENCES `master_kos` (`id_kos`) ON DELETE SET NULL,
  CONSTRAINT `kamar_ibfk_2` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar` (`id_jenis_kamar`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `kamar` */

/*Table structure for table `master_kos` */

DROP TABLE IF EXISTS `master_kos`;

CREATE TABLE `master_kos` (
  `id_kos` int NOT NULL AUTO_INCREMENT,
  `nama_kos` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alamat_kos` text COLLATE utf8mb4_general_ci,
  `jenis_kos` enum('Putra','Putri','Campur') COLLATE utf8mb4_general_ci DEFAULT 'Campur',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_kos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `master_kos` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_reset_tokens_table',1),
(3,'2019_08_19_000000_create_failed_jobs_table',1),
(4,'2019_12_14_000001_create_personal_access_tokens_table',1);

/*Table structure for table `parkiran` */

DROP TABLE IF EXISTS `parkiran`;

CREATE TABLE `parkiran` (
  `id_kendaraan` int NOT NULL AUTO_INCREMENT,
  `id_kos` int NOT NULL,
  `jenis_kendaraan` enum('Mobil','Motor') COLLATE utf8mb4_general_ci NOT NULL,
  `biaya_tambahan` decimal(12,2) NOT NULL,
  `kapasitas` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_kendaraan`),
  KEY `idkos` (`id_kos`),
  CONSTRAINT `idkos` FOREIGN KEY (`id_kos`) REFERENCES `master_kos` (`id_kos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `parkiran` */

/*Table structure for table `password_reset_tokens` */

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `password_reset_tokens` */

/*Table structure for table `pengguna` */

DROP TABLE IF EXISTS `pengguna`;

CREATE TABLE `pengguna` (
  `id_pengguna` int NOT NULL AUTO_INCREMENT,
  `nama_pengguna` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('Manager','Staff','Penjaga') COLLATE utf8mb4_general_ci DEFAULT 'Staff',
  `hak_akses` enum('super_admin','admin','penjaga') COLLATE utf8mb4_general_ci DEFAULT 'admin',
  `id_kos` int DEFAULT NULL,
  `status` enum('Aktif','Nonaktif') COLLATE utf8mb4_general_ci DEFAULT 'Aktif',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pengguna`),
  UNIQUE KEY `username` (`username`),
  KEY `id_kos` (`id_kos`),
  CONSTRAINT `pengguna_ibfk_1` FOREIGN KEY (`id_kos`) REFERENCES `master_kos` (`id_kos`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pengguna` */

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_general_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `personal_access_tokens_tokenable_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `personal_access_tokens` */

/*Table structure for table `pricing` */

DROP TABLE IF EXISTS `pricing`;

CREATE TABLE `pricing` (
  `id_pricing` int NOT NULL AUTO_INCREMENT,
  `id_kos` int NOT NULL,
  `id_jenis_kamar` int NOT NULL,
  `lama_tinggal` enum('Harian','Mingguan','Bulanan','Tahunan') COLLATE utf8mb4_general_ci NOT NULL,
  `harga` decimal(12,2) NOT NULL,
  `deskripsi` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pricing`),
  KEY `id_jenis_kamar` (`id_jenis_kamar`),
  KEY `pricing_ibfk_2` (`id_kos`),
  CONSTRAINT `pricing_ibfk_1` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar` (`id_jenis_kamar`) ON DELETE CASCADE,
  CONSTRAINT `pricing_ibfk_2` FOREIGN KEY (`id_kos`) REFERENCES `master_kos` (`id_kos`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pricing` */

/*Table structure for table `promo_kamar` */

DROP TABLE IF EXISTS `promo_kamar`;

CREATE TABLE `promo_kamar` (
  `id_promo` int NOT NULL AUTO_INCREMENT,
  `id_kos` int NOT NULL,
  `id_jenis_kamar` int NOT NULL,
  `id_pricing` int NOT NULL,
  `nama_promo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `tipe_promo` enum('Diskon_Persen','Diskon_Nominal','Harga_Spesial') COLLATE utf8mb4_general_ci NOT NULL,
  `nilai_promo` decimal(12,2) NOT NULL COMMENT 'persen / nominal / harga final',
  `keterangan` text COLLATE utf8mb4_general_ci,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `status` enum('Aktif','Nonaktif') COLLATE utf8mb4_general_ci DEFAULT 'Aktif',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_promo`),
  KEY `idx_kos` (`id_kos`),
  KEY `idx_jenis_kamar` (`id_pricing`),
  KEY `promo_kamar_ibfk_2` (`id_jenis_kamar`),
  CONSTRAINT `promo_kamar_ibfk_1` FOREIGN KEY (`id_kos`) REFERENCES `master_kos` (`id_kos`) ON DELETE CASCADE,
  CONSTRAINT `promo_kamar_ibfk_2` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar` (`id_jenis_kamar`) ON DELETE CASCADE,
  CONSTRAINT `promo_kamar_ibfk_3` FOREIGN KEY (`id_pricing`) REFERENCES `pricing` (`id_pricing`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `promo_kamar` */

/*Table structure for table `tagihan` */

DROP TABLE IF EXISTS `tagihan`;

CREATE TABLE `tagihan` (
  `id_tagihan` int NOT NULL AUTO_INCREMENT,
  `id_jadwal` int NOT NULL,
  `total_harga` decimal(12,2) NOT NULL,
  `total_parkir` decimal(12,2) DEFAULT '0.00',
  `deposit_diterapkan` decimal(12,2) DEFAULT '0.00',
  `total_tagihan` decimal(12,2) GENERATED ALWAYS AS (((`total_harga` + `total_parkir`) - `deposit_diterapkan`)) STORED,
  `jumlah_bayar` decimal(12,2) DEFAULT '0.00',
  `selisih` decimal(12,2) GENERATED ALWAYS AS ((`jumlah_bayar` - `total_tagihan`)) STORED,
  `bukti_bayar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_pembayaran` enum('Belum Lunas','Lunas','Lebih Bayar') COLLATE utf8mb4_general_ci DEFAULT 'Belum Lunas',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tagihan`),
  KEY `id_jadwal` (`id_jadwal`),
  CONSTRAINT `tagihan_ibfk_1` FOREIGN KEY (`id_jadwal`) REFERENCES `jadwal_kamar` (`id_jadwal`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tagihan` */

/*Table structure for table `transaksi_log` */

DROP TABLE IF EXISTS `transaksi_log`;

CREATE TABLE `transaksi_log` (
  `id_log` int NOT NULL AUTO_INCREMENT,
  `id_tagihan` int DEFAULT NULL,
  `aksi` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `keterangan` text COLLATE utf8mb4_general_ci,
  `dibuat_oleh` int DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_log`),
  KEY `id_tagihan` (`id_tagihan`),
  CONSTRAINT `transaksi_log_ibfk_1` FOREIGN KEY (`id_tagihan`) REFERENCES `tagihan` (`id_tagihan`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `transaksi_log` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('MasterAdmin','SuperAdmin','Admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Admin',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
