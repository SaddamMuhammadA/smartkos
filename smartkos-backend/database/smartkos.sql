/*
SQLyog Community v13.3.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - smartkos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`smartkos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `smartkos`;

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL AUTO_INCREMENT,
  `nama_customer` varchar(100) NOT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `foto_ktp` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `customer` */

/*Table structure for table `jadwal_kamar` */

DROP TABLE IF EXISTS `jadwal_kamar`;

CREATE TABLE `jadwal_kamar` (
  `id_jadwal` int(11) NOT NULL AUTO_INCREMENT,
  `id_kamar` int(5) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `id_pricing` int(5) DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `total_harga` decimal(12,2) DEFAULT 0.00,
  `deposit` decimal(12,2) DEFAULT 0.00,
  `status_sewa` enum('Aktif','Selesai','Dibatalkan') DEFAULT 'Aktif',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
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
  `id_relasi` int(11) NOT NULL AUTO_INCREMENT,
  `id_jadwal` int(11) NOT NULL,
  `id_kendaraan` int(5) NOT NULL,
  `jumlah` int(3) DEFAULT 1,
  `biaya_tambahan` decimal(12,2) DEFAULT 0.00,
  `created_at` datetime DEFAULT current_timestamp(),
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
  `id_jenis_kamar` int(11) NOT NULL AUTO_INCREMENT,
  `nama_jenis_kamar` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_jenis_kamar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jenis_kamar` */

/*Table structure for table `kamar` */

DROP TABLE IF EXISTS `kamar`;

CREATE TABLE `kamar` (
  `id_kamar` int(5) NOT NULL AUTO_INCREMENT,
  `id_kos` int(5) DEFAULT NULL,
  `id_jenis_kamar` int(11) DEFAULT NULL,
  `kode_kamar` varchar(10) DEFAULT NULL,
  `status_kamar` enum('Tersedia','Terisi','Perawatan') DEFAULT 'Tersedia',
  `catatan` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_kamar`),
  KEY `id_kos` (`id_kos`),
  KEY `id_jenis_kamar` (`id_jenis_kamar`),
  CONSTRAINT `kamar_ibfk_1` FOREIGN KEY (`id_kos`) REFERENCES `kos` (`id_kos`) ON DELETE SET NULL,
  CONSTRAINT `kamar_ibfk_2` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar` (`id_jenis_kamar`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `kamar` */

/*Table structure for table `kos` */

DROP TABLE IF EXISTS `kos`;

CREATE TABLE `kos` (
  `id_kos` int(5) NOT NULL AUTO_INCREMENT,
  `nama_kos` varchar(100) DEFAULT NULL,
  `alamat_kos` text DEFAULT NULL,
  `jenis_kos` enum('Putra','Putri','Campur') DEFAULT 'Campur',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_kos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `kos` */

/*Table structure for table `parkiran` */

DROP TABLE IF EXISTS `parkiran`;

CREATE TABLE `parkiran` (
  `id_kendaraan` int(5) NOT NULL AUTO_INCREMENT,
  `jenis_kendaraan` enum('Mobil','Motor') NOT NULL,
  `biaya_tambahan` decimal(12,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_kendaraan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `parkiran` */

/*Table structure for table `pengguna` */

DROP TABLE IF EXISTS `pengguna`;

CREATE TABLE `pengguna` (
  `id_pengguna` int(11) NOT NULL AUTO_INCREMENT,
  `nama_pengguna` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Manager','Staff','Penjaga') DEFAULT 'Staff',
  `hak_akses` enum('super_admin','admin','penjaga') DEFAULT 'admin',
  `id_kos` int(5) DEFAULT NULL,
  `status` enum('Aktif','Nonaktif') DEFAULT 'Aktif',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_pengguna`),
  UNIQUE KEY `username` (`username`),
  KEY `id_kos` (`id_kos`),
  CONSTRAINT `pengguna_ibfk_1` FOREIGN KEY (`id_kos`) REFERENCES `kos` (`id_kos`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pengguna` */

/*Table structure for table `pricing` */

DROP TABLE IF EXISTS `pricing`;

CREATE TABLE `pricing` (
  `id_pricing` int(5) NOT NULL AUTO_INCREMENT,
  `id_jenis_kamar` int(11) NOT NULL,
  `lama_tinggal` enum('Harian','Mingguan','Bulanan','Tahunan') NOT NULL,
  `harga` decimal(12,2) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_pricing`),
  KEY `id_jenis_kamar` (`id_jenis_kamar`),
  CONSTRAINT `pricing_ibfk_1` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar` (`id_jenis_kamar`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pricing` */

/*Table structure for table `tagihan` */

DROP TABLE IF EXISTS `tagihan`;

CREATE TABLE `tagihan` (
  `id_tagihan` int(11) NOT NULL AUTO_INCREMENT,
  `id_jadwal` int(11) NOT NULL,
  `total_harga` decimal(12,2) NOT NULL,
  `total_parkir` decimal(12,2) DEFAULT 0.00,
  `deposit_diterapkan` decimal(12,2) DEFAULT 0.00,
  `total_tagihan` decimal(12,2) GENERATED ALWAYS AS (`total_harga` + `total_parkir` - `deposit_diterapkan`) STORED,
  `jumlah_bayar` decimal(12,2) DEFAULT 0.00,
  `selisih` decimal(12,2) GENERATED ALWAYS AS (`jumlah_bayar` - `total_tagihan`) STORED,
  `bukti_bayar` varchar(255) DEFAULT NULL,
  `status_pembayaran` enum('Belum Lunas','Lunas','Lebih Bayar') DEFAULT 'Belum Lunas',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_tagihan`),
  KEY `id_jadwal` (`id_jadwal`),
  CONSTRAINT `tagihan_ibfk_1` FOREIGN KEY (`id_jadwal`) REFERENCES `jadwal_kamar` (`id_jadwal`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tagihan` */

/*Table structure for table `transaksi_log` */

DROP TABLE IF EXISTS `transaksi_log`;

CREATE TABLE `transaksi_log` (
  `id_log` int(11) NOT NULL AUTO_INCREMENT,
  `id_tagihan` int(11) DEFAULT NULL,
  `aksi` varchar(100) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `dibuat_oleh` int(11) DEFAULT NULL,
  `dibuat_pada` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_log`),
  KEY `id_tagihan` (`id_tagihan`),
  CONSTRAINT `transaksi_log_ibfk_1` FOREIGN KEY (`id_tagihan`) REFERENCES `tagihan` (`id_tagihan`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `transaksi_log` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
